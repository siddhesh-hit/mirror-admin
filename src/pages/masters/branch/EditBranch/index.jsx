import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";

import back from "assets/back.svg";
import { getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditBranch = () => {
  const [Name, setName] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("branch", id)
      .then((res) => setName(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    await putApi("branch", id, Name)
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Updated branch");
          setTimeout(() => {
            navigate(paths.viewBranch);
          }, 1100);
        } else {
          console.log("error", res);
        }
      })
      .catch((err) => {
        console.log(err);
        // if(err.response && err.response.data && err.response.data.message){
        //   toast.error(err.response.data.message);
        // }
      });

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewBranch} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Branch</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal border_names">
                <div className="card-body">
                  <div className="formada">
                    <div className="form-group row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Edit branch Full Name :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="name"
                          value={Name.name}
                          onChange={(e) =>
                            setName((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="form-control mb-3"
                          placeholder="Enter branch Full Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-4" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBranch;
