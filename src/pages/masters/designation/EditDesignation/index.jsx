import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditDesignation = () => {
  const [data, setData] = useState({});
  const [isToggled, setIsToggled] = useState(true);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("designation", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await putApi("designation", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success(`Designation updated.`);
          setTimeout(() => {
            navigate(paths.viewDesignation);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewDesignation}>
            <img src={back} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Edit Designation</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Designation :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="name"
                            defaultValue={data?.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Designation"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDesignation;
