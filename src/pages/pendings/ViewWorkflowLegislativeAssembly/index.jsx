import { useEffect, useState } from "react";
import back from "assets/back.svg";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { API } from "lib/api";
import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewWorkflowLegislativeAssembly = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
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
          <h4 className="page-title">• View Workflow Legislative Council</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>Image</th>
                      <th style={{ width: "30%" }}>Description</th>
                      <th style={{ width: "30%" }}>वर्णन</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object?.english &&
                      data?.data_object?.marathi && (
                        <tr>
                          <td>
                            <a
                              href={
                                API.baseUrl +
                                data?.data_object?.banner_image.destination +
                                "/" +
                                data?.data_object?.banner_image.filename
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </a>
                          </td>
                          <td className="scrolltabss">
                            <p>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html:
                                    data?.data_object?.english.description,
                                }}
                              ></span>
                            </p>
                          </td>
                          <td className="scrolltabss">
                            <p>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html:
                                    data?.data_object?.marathi.description,
                                }}
                              ></span>
                            </p>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="contentofpages">
          <h4 className="page-title">• View Workflow Important Publications</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>English Document</th>
                      <th style={{ width: "40%" }}>Title</th>
                      <th style={{ width: "10%" }}>Marathi Document</th>
                      <th style={{ width: "40%" }}>शीर्षक</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object?.publication &&
                      data?.data_object?.publication.length > 0 ? (
                      <>
                        {data?.data_object?.publication.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <a
                                href={
                                  API.baseUrl +
                                  item.english.document.destination +
                                  "/" +
                                  item.english.document.filename
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </a>
                            </td>
                            <td>
                              <p>{item.english.name}</p>
                            </td>
                            <td>
                              <a
                                href={
                                  API.baseUrl +
                                  item.marathi.document.destination +
                                  "/" +
                                  item.marathi.document.filename
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </a>
                            </td>
                            <td>
                              <p>{item.marathi.name}</p>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="contentofpages">
          <h4 className="page-title">• View Workflow Structure</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Council Name</th>
                      <th>कौन्सिलचे नाव</th>
                      <th>Type</th>
                      <th>प्रकार</th>
                      <th>Term Limit</th>
                      <th>मुदत मर्यादा</th>
                      <th>Seat</th>
                      <th>आसन</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object?.english?.structure &&
                      data?.data_object?.marathi?.structure && (
                        <tr>
                          <td>
                            <a
                              href={
                                API.baseUrl +
                                data?.data_object.structure_profile
                                  .destination +
                                "/" +
                                data?.data_object.structure_profile.filename
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </a>
                          </td>
                          <td>
                            <p>{data?.data_object?.english.structure.name}</p>
                          </td>
                          <td>
                            <p>{data?.data_object?.marathi.structure.name}</p>
                          </td>
                          <td>
                            <p>{data?.data_object?.english.structure.type}</p>
                          </td>
                          <td>
                            <p>{data?.data_object?.marathi.structure.type}</p>
                          </td>
                          <td>
                            <p>
                              {data?.data_object?.english.structure.term_limit}
                            </p>
                          </td>
                          <td>
                            <p>
                              {data?.data_object?.marathi.structure.term_limit}
                            </p>
                          </td>
                          <td>
                            <p>{data?.data_object?.english.structure.seats}</p>
                          </td>
                          <td>
                            <p>{data?.data_object?.marathi.structure.seats}</p>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="contentofpages">
          <h4 className="page-title">• View Workflow Council Profile</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>English Name</th>
                      <th>Marathi Name</th>
                      <th className="heighttab">Description</th>
                      <th className="heighttab">वर्णन</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object?.legislative_council &&
                      data?.data_object?.legislative_council.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>
                              <a
                                href={
                                  API.baseUrl +
                                  item.council_profile.destination +
                                  "/" +
                                  item.council_profile.filename
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </a>
                            </td>
                            <td>
                              <h4>
                                {
                                  data?.data_object?.english
                                    .legislative_council[index].council_name
                                }
                              </h4>
                            </td>
                            <td>
                              <h4>
                                {
                                  data?.data_object?.marathi
                                    .legislative_council[index].council_name
                                }
                              </h4>
                            </td>
                            <td className="scrolltabss">
                              <p>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      data?.data_object?.english
                                        .legislative_council[index]
                                        .council_description,
                                  }}
                                ></span>
                              </p>
                            </td>
                            <td className="scrolltabss">
                              <p>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      data?.data_object?.marathi
                                        .legislative_council[index]
                                        .council_description,
                                  }}
                                ></span>
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
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

export default ViewWorkflowLegislativeAssembly;
