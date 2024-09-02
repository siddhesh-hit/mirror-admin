import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";

import back from "assets/back.svg";

import { formatEnUsDate } from "lib/dateEnUsFormat";
import { getApiById, putApi } from "services/axiosInterceptors";

const ViewWorkflowMantriMandal = () => {
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

        if (typeof res.data.data.data_object.assembly_number === "string") {
          const assembly = await handleFetchIds(
            res.data.data.data_object.assembly_number,
            "assembly"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.assembly_number = assembly;
            return newObj;
          });
        }

        if (typeof res.data.data.data_object.member_name === "string") {
          const member = await handleFetchIds(
            res.data.data.data_object.member_name,
            "member"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.member_name = member;
            return newObj;
          });
        }

        res.data.data.data_object.ministry_type.length > 0 &&
          res.data.data.data_object.ministry_type.forEach(
            async (ministry, index) => {
              if (typeof ministry === "string") {
                const ministryVal = await handleFetchIds(ministry, "ministry");

                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.ministry_type[index] = ministryVal;
                  return newObj;
                });
              }
            }
          );

        res.data.data.data_object.designation.length > 0 &&
          res.data.data.data_object.designation.forEach(
            async (designation, index) => {
              if (typeof designation === "string") {
                const designationVal = await handleFetchIds(
                  designation,
                  "designation"
                );

                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.designation[index] = designationVal;
                  return newObj;
                });
              }
            }
          );

        res.data.data.data_object.presiding.length > 0 &&
          res.data.data.data_object.presiding.forEach(
            async (presiding, index) => {
              if (typeof presiding === "string") {
                const presidingVal = await handleFetchIds(presiding, "officer");

                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.presiding[index] = presidingVal;
                  return newObj;
                });
              }
            }
          );

        res.data.data.data_object.legislative_position.length > 0 &&
          res.data.data.data_object.legislative_position.forEach(
            async (position, index) => {
              if (typeof position === "string") {
                const positionVal = await handleFetchIds(position, "position");

                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.legislative_position[index] = positionVal;
                  return newObj;
                });
              }
            }
          );
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

  const handleFetchIds = async (id, api) => {
    switch (api) {
      case "member": {
        const { data } = await getApiById("member", id);
        return data.data;
      }

      case "assembly": {
        const { data } = await getApiById("assembly", id);
        return data.data;
      }

      case "ministry": {
        const { data } = await getApiById("ministry", id);
        return data.data;
      }

      case "officer": {
        const { data } = await getApiById("officer", id);
        return data.data;
      }

      case "position": {
        const { data } = await getApiById("position", id);
        return data.data;
      }

      case "designation": {
        const { data } = await getApiById("designation", id);
        return data.data;
      }
    }
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

          <h4 className="page-title">• View Mantri Mandal</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Assembly Number</th>
                      <th>Member Name</th>
                      <th>Ministry Type</th>
                      <th>Designation</th>
                      <th>Designation Year</th>
                      <th>Presiding Officer</th>
                      <th>Presiding Officer Year</th>
                      <th>Legislative Position</th>
                      <th>Legislative Position Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object && (
                      <tr>
                        <td>
                          <h4>
                            {data?.data_object?.assembly_number?.assembly_name}
                          </h4>
                        </td>
                        <td>
                          <p>
                            {data?.data_object?.member_name?.basic_info?.name}
                          </p>
                        </td>
                        <td>
                          <p>
                            {data?.data_object?.ministry_type?.map(
                              (item, index, array) => (
                                <span key={index}>
                                  {item.ministry_name}
                                  {index === array.length - 1 ? "" : ", "}
                                </span>
                              )
                            )}
                          </p>
                        </td>
                        <td>
                          <p>
                            {data?.data_object?.designation?.map(
                              (item, index, array) => (
                                <span key={index}>
                                  {item.name}
                                  {index === array.length - 1 ? "" : ", "}
                                </span>
                              )
                            )}
                          </p>
                        </td>
                        <td>
                          <p>
                            {"From " +
                              formatEnUsDate(data?.data_object?.des_from) +
                              " To " +
                              formatEnUsDate(data?.data_object?.des_to)}
                          </p>
                        </td>
                        <td>
                          <p>
                            {data?.data_object?.presiding?.map(
                              (item, index, array) => (
                                <span key={index}>
                                  {item.name}
                                  {index === array.length - 1 ? "" : ", "}
                                </span>
                              )
                            )}
                          </p>
                        </td>
                        <td>
                          <p>
                            {"From " +
                              formatEnUsDate(data?.data_object?.pres_from) +
                              " To " +
                              formatEnUsDate(data?.data_object?.pres_to)}
                          </p>
                        </td>
                        <td>
                          <p>
                            {data?.data_object?.legislative_position?.map(
                              (item, index, array) => (
                                <span key={index}>
                                  {item.name}
                                  {index === array.length - 1 ? "" : ", "}
                                </span>
                              )
                            )}
                          </p>
                        </td>
                        <td>
                          <p>
                            {"From " +
                              formatEnUsDate(data?.data_object?.lp_from) +
                              " To " +
                              formatEnUsDate(data?.data_object?.lp_to)}
                          </p>
                        </td>
                      </tr>
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

export default ViewWorkflowMantriMandal;
