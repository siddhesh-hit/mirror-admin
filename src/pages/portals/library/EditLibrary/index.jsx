import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";
import { getApiById, putApi } from "services/axiosInterceptors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditLibrary = () => {
  const [data, setData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const [serverData, setServerData] = useState({});

  const location = useLocation();

  const fetchData = async () => {
    const id = location.search.split("=")[1];
    await getApiById("library", id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setServerData(res.data.data);
        setIsToggled(res.data.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [field, subField] = name.split("_");
    const maxAllowedSize = 2.5 * 1024 * 1024;

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
      if (files) {
        if (
          files[0]?.type.startsWith("image/png") ||
          files[0]?.type.startsWith("image/jpeg") ||
          files[0]?.type.startsWith("image/jpg")
        ) {
          if (files[0].size > maxAllowedSize) {
            alert("Upload the file of size less than 2MB.");
          } else {
            setServerData((prev) => ({
              ...prev,
              [name]: files[0],
            }));
          }
        } else {
          alert("Only upload JPEG/JPG/PNG format assets");
        }
      }
    }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setServerData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    formData.append("english", JSON.stringify(serverData.english));
    formData.append("marathi", JSON.stringify(serverData.marathi));
    formData.append("file", JSON.stringify(serverData.banner));
    let banner = serverData.banner;
    formData.append("banner", banner);
    formData.append("isActive", serverData.isActive);
    formData.append("isUpdated", true);

    // console.log(formData);

    await putApi("library", data._id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Library updated Successfully");
          setTimeout(() => {
            navigate(`/ViewLibrary?id=${data._id}`);
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

  const handleEditorChange = (event, value, name) => {
    const [field, subField] = name.split("_");
    setServerData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value.getData(),
      },
    }));
  };

  // console.log(serverData)

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllLibrary" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Library</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal border_names">
                {serverData && serverData.marathi && serverData.english && (
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Banner :
                      </label>
                      <div className="col-sm-9">
                        <div className="custom-file">
                          <input
                            type="file"
                            name="banner"
                            title={
                              serverData.banner.filename ||
                              serverData.banner.name ||
                              "Please choose a file"
                            }
                            accept="image/png, image/jpeg, image.jpg"
                            onChange={handleChange}
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            assets -{" "}
                            {serverData.banner.filename ||
                              serverData.banner.name}
                          </label>
                        </div>
                        <p className="photo_disclaimer">
                          {" "}
                          *Only upload JPEG/JPG/PNG format assets
                        </p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Description :
                      </label>
                      <div className="col-sm-9">
                        <CKEditor
                          editor={ClassicEditor}
                          data={serverData.english.description}
                          name="english_description"
                          onChange={(event, editor) =>
                            handleEditorChange(
                              event,
                              editor,
                              "english_description"
                            )
                          }
                        />
                        <CKEditor
                          editor={ClassicEditor}
                          data={serverData.marathi.description}
                          name="marathi_description"
                          onChange={(event, editor) =>
                            handleEditorChange(
                              event,
                              editor,
                              "marathi_description"
                            )
                          }
                        />
                        {/* <textarea
                          name="english_description"
                          defaultValue={serverData.english.description}
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter description"
                        />
                        <textarea
                          name="marathi_description"
                          defaultValue={serverData.marathi.description}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="वर्णन प्रविष्ट करा"
                        /> */}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="card-body">
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Edit Status :
                  </label>
                  <div className="col-sm-8">
                    <div
                      className={`toggle-button ${isToggled ? "active" : ""}`}
                      onClick={handleToggle}
                    >
                      <div className={`slider ${isToggled ? "active" : ""}`} />
                      <div className="button-text">
                        {isToggled ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default EditLibrary;
