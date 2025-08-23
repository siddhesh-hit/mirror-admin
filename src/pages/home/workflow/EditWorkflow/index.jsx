import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { getApiById, putApi } from "services/axios";
import { Form } from "react-bootstrap";
import { paths } from "services/paths";
import TransparentLoader from "components/common/TransparentLoader";

const EditWorkflow = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitted, setSubmit] = useState(false);

  const configRoutes = {
    Create: "updatePost",
    Update: "updatePut",
    Delete: "updateDel",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, _] = useSearchParams();

  const action = searchParams.get("action");

  const fetchData = async () => {
    await getApiById("pending", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setStatus(e.target.name);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    data.status = status;
    await putApi(`pending/${configRoutes[action]}`, id, data)
      .then((res) => {
        if (res.data.success) {
          // toast.success("Updated pending");
          toast.success(`Status ${status}!`);
          setTimeout(() => {
            navigate(paths.viewAllWorkflow);
          }, 1100);
        }
      })
      .catch((err) => console.log(err));

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.viewAllWorkflow} className="addpagess">
            <img src={back} style={{ width: "25px" }} alt="add" />
            Go back
          </Link>
          <h4 className="page-title">• Edit Workflow</h4>
          <div className="card card-info">
            <div className="row mb-4 mt-4">
              {data && (
                <div className="col-lg-9 border_names">
                  <form className="form-horizontal">
                    <div className="card-body">
                      <div className="formada">
                        <div className="form-group row">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-4 col-form-label"
                          >
                            Edit Status :
                          </label>
                          <div className="col-sm-8">
                            <div className="d-flex align-items-center">
                              <Form.Check
                                type="radio"
                                id="approveRadio"
                                name="Accepted"
                                checked={status === "Accepted"}
                                onChange={handleChange}
                              />
                              <label style={{ margin: 0 }} htmlFor="approveRadio">
                                Approve
                              </label>
                            </div>

                            <div className="d-flex align-items-center">
                              <Form.Check
                                type="radio"
                                id="rejectRadio"
                                name="Rejected"
                                checked={status === "Rejected"}
                                onChange={handleChange}
                              />
                              <label style={{ margin: 0 }} htmlFor="rejectRadio">
                                Reject
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <button className="submit123 mt-4" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <TransparentLoader isVisible={isSubmitted} />
    </React.Fragment>
  );
};

export default EditWorkflow;
