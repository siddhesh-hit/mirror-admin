import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiById, putApi } from "services/axiosInterceptors";

const EditLibraryDoc = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const [serverData, setServerData] = useState({
    english: {
      description: "",
    },
    marathi: {
      description: "",
    },
    banner: {},
  });

  const location = useLocation();

  const fetchData = async () => {
    const id = location.search.split("=")[1];
    await getApiById("library", id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setServerData((prev) => ({
          ...prev,
          english: {
            description: res.data.data.english.description,
          },
          marathi: {
            description: res.data.data.marathi.description,
          },
          banner: res.data.data.banner,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [field, subField] = name.split("_");

    console.log(name, value, files);

    if (!files) {
      setServerData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setServerData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    formData.append("english", JSON.stringify(serverData.english));
    formData.append("marathi", JSON.stringify(serverData.marathi));

    formData.append("banner", serverData.banner);

    // console.log(formData);

    await putApi("library", data._id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Library docs updated Successfully");
          setTimeout(() => {
            navigate("/ViewLibrary");
          }, 1100);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(serverData, "data here");

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Edit Library Documents</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit PDF :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          title={
                            serverData.banner.filename ||
                            serverData.banner.name ||
                            "Please choose a file"
                          }
                          name="banner"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label className="custom-file-label" for="customFile">
                          Documents -{" "}
                          {serverData.banner.filename || serverData.banner.name}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-5" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLibraryDoc;
