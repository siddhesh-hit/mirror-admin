import { useEffect, useState } from "react";
import back from "assets/back.svg";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { API } from "lib/api";
import { getApiById, putApi } from "services/axiosInterceptors";
import { formatEnUsDate } from "lib/dateEnUsFormat";
import { paths } from "services/paths";

const ViewWorkflowMemberProfile = () => {
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

        if (typeof res.data.data.data_object.basic_info.party === "string") {
          const party = await handleFetchIds(
            res.data.data.data_object.basic_info.party,
            "party"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.basic_info.party = party;
            return newObj;
          });
        }

        if (
          typeof res.data.data.data_object.basic_info.constituency === "string"
        ) {
          const constituency = await handleFetchIds(
            res.data.data.data_object.basic_info.constituency,
            "constituency"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.basic_info.constituency = constituency;
            return newObj;
          });
        }

        if (typeof res.data.data.data_object.basic_info.gender === "string") {
          const gender = await handleFetchIds(
            res.data.data.data_object.basic_info.gender,
            "gender"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.basic_info.gender = gender;
            return newObj;
          });
        }

        res.data.data?.data_object.political_journey.length > 0 &&
          res.data.data?.data_object.political_journey.forEach(
            async (item, index) => {
              let { presiding, legislative_position, designation } = item;

              if (typeof presiding === "string") {
                const presidingv = await handleFetchIds(presiding, "officer");
                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.political_journey[index].presiding =
                    presidingv;

                  return newObj;
                });
              }

              if (typeof legislative_position === "string") {
                const positionv = await handleFetchIds(
                  legislative_position,
                  "position"
                );
                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.political_journey[
                    index
                  ].legislative_position = positionv;

                  return newObj;
                });
              }

              if (typeof designation === "string") {
                const designationv = await handleFetchIds(
                  designation,
                  "designation"
                );
                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.political_journey[index].designation =
                    designationv;

                  return newObj;
                });
              }
            }
          );

        if (
          typeof res.data.data?.data_object?.election_data?.constituency ===
          "string"
        ) {
          const constituency = await handleFetchIds(
            res.data.data.data_object?.election_data?.constituency,
            "constituency"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.election_data.constituency = constituency;
            return newObj;
          });
        }

        res.data.data?.data_object?.election_data?.member_election_result
          .length > 0 &&
          res.data.data?.data_object?.election_data?.member_election_result.forEach(
            async (item, index) => {
              const { party } = item;
              if (typeof party === "string") {
                const partyV = await handleFetchIds(party, "party");

                setData((prev) => {
                  const newObj = { ...prev };
                  newObj.data_object.election_data.member_election_result[
                    index
                  ].party = partyV;
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
            navigate(paths.viewAllWorkflow);
          }, 1100);
        }
      })
      .catch((err) => console.log(err));

    setSubmit(false);
  };

  const handleFetchIds = async (id, api) => {
    switch (api) {
      case "party": {
        const { data } = await getApiById("party", id);
        return data.data;
      }

      case "constituency": {
        const { data } = await getApiById("constituency", id);
        return data.data;
      }

      case "gender": {
        const { data } = await getApiById("gender", id);
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

  console.log(data);

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

          <h4 className="page-title">• Legislative Member Profile</h4>
          <div className="card card-info">
            <div className="viewmemberprofile">
              <ul
                className="nav nav-tabs"
                id="custom-tabs-one-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="custom-tabs-one-home-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-home"
                    role="tab"
                    aria-controls="custom-tabs-one-home"
                    aria-selected="true"
                  >
                    Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="custom-tabs-one-profile-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-profile"
                    role="tab"
                    aria-controls="custom-tabs-one-profile"
                    aria-selected="false"
                  >
                    Political Journey
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="custom-tabs-one-election-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-election"
                    role="tab"
                    aria-controls="custom-tabs-one-election"
                    aria-selected="false"
                  >
                    Election Data
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="custom-tabs-one-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="custom-tabs-one-home"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-home-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 text-center">
                      {data?.data_object && data?.data_object.basic_info && (
                        <img
                          src={
                            API.baseUrl +
                            data?.data_object.basic_info.profile.destination +
                            "/" +
                            data?.data_object.basic_info.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}
                      <h4 className="membername">
                        {data?.data_object &&
                          data?.data_object.basic_info &&
                          data?.data_object.basic_info.surname +
                          " " +
                          data?.data_object.basic_info.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      <div className="ssss">
                        {data?.data_object && data?.data_object.basic_info && (
                          <div>
                            <p>
                              <b>Date of Birth :</b>
                              {formatEnUsDate(
                                data?.data_object?.basic_info?.date_of_birth
                              )}
                            </p>
                            <p>
                              <b>Place of Birth :</b>
                              {data?.data_object.basic_info.place_of_birth}
                            </p>
                            <p>
                              <b>Educational Qualification :</b>
                              {data?.data_object.basic_info.education}
                            </p>
                            <p>
                              <b>Known Languages :</b>
                              {data?.data_object.basic_info.language}
                            </p>
                            <p>
                              <b>Marital Status :</b>
                              {data?.data_object.basic_info.marital_status}
                            </p>
                            <p>
                              <b>Children :</b>{" "}
                              {data?.data_object.basic_info.children}
                            </p>
                            <p>
                              <b>Business :</b>{" "}
                              {data?.data_object.basic_info.business}
                            </p>
                            <p>
                              <b>Party :</b>{" "}
                              {
                                data?.data_object.basic_info.party?.marathi
                                  ?.party_name
                              }
                            </p>
                            <p>
                              <b>Constituency :</b>
                              {data?.data_object?.basic_info?.constituency
                                ?.council?.constituency_name !== ""
                                ? data?.data_object?.basic_info?.constituency
                                  ?.council?.constituency_name
                                : data?.data_object?.basic_info?.constituency
                                  ?.assembly?.constituency_name}
                            </p>
                            <p>
                              <b>Hobby :</b>{" "}
                              {data?.data_object.basic_info.hobby}
                            </p>
                            <p>
                              <b>Foreign Migration :</b>
                              {data?.data_object.basic_info.foreign_migration}
                            </p>
                            <p>
                              <b>Gender :</b>{" "}
                              {
                                data?.data_object.basic_info.gender?.marathi
                                  ?.gender
                              }
                            </p>
                            <p>
                              <b>Address :</b>{" "}
                              {data?.data_object.basic_info.address}
                            </p>
                            <p>
                              <b>Address 1:</b>{" "}
                              {data?.data_object.basic_info.address1}
                            </p>
                            <p>
                              <b>Mobile Number :</b>
                              {data?.data_object.basic_info.mobile_number}
                            </p>
                            <p>
                              <b>Email Address :</b>
                              {data?.data_object.basic_info.email}
                            </p>
                            <p>
                              <b>Other Information :</b>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html:
                                    data?.data_object.basic_info?.other_info,
                                }}
                              ></span>
                            </p>
                            <p>
                              <b>Awards :</b>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: data?.data_object.basic_info?.awards,
                                }}
                              ></span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="custom-tabs-one-profile"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-profile-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 text-center">
                      {data?.data_object && data?.data_object.basic_info && (
                        <img
                          src={
                            API.baseUrl +
                            data?.data_object.basic_info.profile.destination +
                            "/" +
                            data?.data_object.basic_info.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}

                      <h4 className="membername">
                        {data?.data_object &&
                          data?.data_object.basic_info &&
                          data?.data_object.basic_info.surname +
                          " " +
                          data?.data_object.basic_info.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      {data?.data_object &&
                        data?.data_object.political_journey && (
                          <ul className="timeline timeline-split">
                            {data?.data_object.political_journey.map(
                              (item, index) => (
                                <li className="timeline-item" key={index}>
                                  <div className="timeline-marker" />
                                  <div className="timeline-content">
                                    <h3 className="timeline-title">
                                      {formatEnUsDate(item.date)}
                                    </h3>
                                    <p>Title : {item.title}</p>
                                    <p>
                                      Presiding Officer : {item?.presiding?.name}
                                    </p>
                                    <p>
                                      Legislative Position :
                                      {item?.legislative_position?.name}
                                    </p>
                                    <p>Designation : {item?.designation?.name}</p>
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="custom-tabs-one-election"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-election-tab"
                >
                  {data?.data_object && data?.data_object.election_data && (
                    <>
                      <div className="col-lg-12">
                        <h4 className="eclecresult">Election Result</h4>
                        <h3 className="gondiaa">
                          {data?.data_object?.election_data?.constituency
                            ?.council?.constituency_name !== ""
                            ? data?.data_object?.election_data?.constituency
                              ?.council?.constituency_name
                            : data?.data_object?.election_data?.constituency
                              ?.assembly?.constituency_name}
                        </h3>
                        <div className="row votes_abcdss">
                          <div className="col-lg-5">
                            <h3>
                              • Total Electorate :
                              {data?.data_object.election_data.total_electorate}
                            </h3>
                          </div>
                          <div className="col-lg-5">
                            <h3>
                              • Total valid voting :{" "}
                              {
                                data?.data_object.election_data
                                  .total_valid_voting
                              }
                            </h3>
                          </div>
                        </div>
                      </div>
                      <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Candidate Name</th>
                            <th>Votes</th>
                            <th>Party</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.data_object.election_data.member_election_result.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>
                                  <h4>{index + 1}</h4>
                                </td>
                                <td>
                                  <h4>{item.candidate_name}</h4>
                                </td>
                                <td>
                                  <h4>{item.votes}</h4>
                                </td>
                                <td>
                                  <h4>{item.party?.marathi?.party_name}</h4>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
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

export default ViewWorkflowMemberProfile;
