import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { API } from "lib/api";
import { getApiById, putApi } from "services/axiosInterceptors";

const ViewWorkflowContactUs = () => {
  const [data, setData] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [status, setStatus] = useState("");
  const configRoutes = {
    Create: "updatePost",
    Update: "updatePut",
    Delete: "updateDel",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("&")[0].split("=")[1];
  const action = location?.search?.split("&")[1]?.split("=")[1];
  const history = location?.search?.split("&")[2]?.split("=")[1];

  const fetchData = async () => {
    try {
      const baseRoute = history === "true" ? "reset" : "pending";

      const res = await getApiById(baseRoute, id);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
          toast.success(`Status ${status}!`);
          setTimeout(() => {
            navigate(`/ViewAllWorkflow`);
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
    <>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link
            to={
              history === "true"
                ? "/ViewWorkflowHistory"
                : history === "false"
                  ? "/ViewWorkflowHistory"
                  : "/ViewAllWorkflow"
            }
            className="addpagess"
          >
            <img src={back} style={{ width: "25px" }} alt="back" />
            Go back
          </Link>
          <h4 className="page-title">• View Session Calendar</h4>
          <div className="card card-info">
            <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Fax Number</th>
                  <th>Legislature No</th>
                </tr>
              </thead>
              <tbody>
                {data?.data_object && (
                  <tr>
                    <td>{1}</td>
                    <td>
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: data?.data_object?.english?.address,
                        }}
                      ></h4>
                    </td>
                    <td>
                      <h4>{data?.data_object?.english?.email}</h4>
                    </td>
                    <td>
                      <h4>{data?.data_object?.english?.fax}</h4>
                    </td>
                    <td>
                      <h4>{data?.data_object?.english?.telephone}</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {history ? (
            <></>
          ) : (
            <div className="card card-info">
              <div className="row mb-4 mt-4">
                {data?.data_object && (
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
                                <label
                                  style={{ margin: 0 }}
                                  htmlFor="approveRadio"
                                >
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
                                <label
                                  style={{ margin: 0 }}
                                  htmlFor="rejectRadio"
                                >
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
          )}
        </div>
      </div>
    </>
  );
};

export default ViewWorkflowContactUs;
