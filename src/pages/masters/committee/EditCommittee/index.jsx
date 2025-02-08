import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";

import back from "assets/back.svg";
import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const EditCommittee = () => {
  const [Name, setName] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const pathnameArray = location.pathname?.split("/");
  const id = location.pathname?.split("/")[pathnameArray.length - 1];

  const fetchData = async () => {
    await getApiById("committee", id)
      .then((res) => setName(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    await putApi("committee", id, Name)
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Updated committee");
          setTimeout(() => {
            navigate(paths.viewCommittee);
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
        <Link to={paths.viewCommittee} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Committee</h4>
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
                        *Edit Committee Name :
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
                          placeholder="Enter committee Name"
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

export default EditCommittee;
