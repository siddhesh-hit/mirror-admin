import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { API } from "lib/api";
import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewWorkflowSessionCalendar = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [sessionField, setField] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

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

  useEffect(() => {
    const handleSessionFetch = async (id) => {
      await getApiById("sessionField", id)
        .then((res) => {
          if (res.data.success) {
            setField(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (typeof data?.data_object?.session !== "object") {
      data?.data_object?.session &&
        handleSessionFetch(data?.data_object?.session);
    }
  }, [data?.data_object?.session]);

  console.log(data?.data_object?.documents);

  return (
    <>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link
            to={
              history === "true"
                ? paths.viewWorkflowHistory
                : history === "false"
                  ? paths.viewWorkflowHistory
                  : paths.viewAllWorkflow
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
                  <th>Session</th>
                  <th>Topic Name</th>
                  <th>Houses</th>
                  <th>Year</th>
                  <th>From Date</th>
                  <th>To Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.data_object && (
                  <tr>
                    <td>{1}</td>
                    <td>
                      <p>
                        {typeof data?.data_object?.session === "object"
                          ? data?.data_object?.session?.marathi?.name
                          : sessionField?.marathi?.name}
                      </p>
                    </td>
                    <td>
                      <p>{data?.data_object?.topic_name}</p>
                    </td>
                    <td>
                      <p>{data?.data_object?.houses}</p>
                    </td>
                    <td>
                      <p>{new Date(data?.data_object?.year).getFullYear()}</p>
                    </td>
                    <td>
                      <p>
                        {
                          new Date(data?.data_object?.from_date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                    </td>
                    <td>
                      <p>
                        {
                          new Date(data?.data_object?.to_date)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <table className="table table-striped table-bordered mb-0 view_vidhan_mandal mt-5">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>View</th>
                  <th>Title</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.data_object?.documents.map((doc, docInd) => {
                  return (
                    <tr key={docInd}>
                      <td style={{ padding: "5px" }}>
                        <span>{docInd + 1}</span>
                      </td>

                      <td style={{ padding: "5px" }}>
                        <a
                          key={docInd}
                          href={
                            API.baseUrl +
                            doc?.document?.destination +
                            "/" +
                            doc?.document?.filename
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>View PDF</Tooltip>
                            )}
                            placement="top"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </OverlayTrigger>
                        </a>
                      </td>
                      <td style={{ padding: "5px" }}>
                        <span>{doc?.title}</span>
                      </td>
                      <td style={{ padding: "5px" }}>
                        {new Date(doc?.date).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
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

export default ViewWorkflowSessionCalendar;
