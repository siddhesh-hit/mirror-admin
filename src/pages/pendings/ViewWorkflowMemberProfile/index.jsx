import { useEffect, useState } from "react";
import back from "assets/back.svg";

import { useNavigate, Link, useSearchParams, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { getApiById, putApi } from "services/axios";
import { formatEnUsDate } from "lib/dateEnUsFormat";
import { paths } from "services/paths";
import PDFViewer from "components/common/PDFViewer";

const ViewWorkflowMemberProfile = () => {
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
  const history = searchParams.get("history");

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

        if (typeof res.data.data.data_object.basic_info.district === "string") {
          const district = await handleFetchIds(
            res.data.data.data_object.basic_info.district,
            "district"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.basic_info.district = district;
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

        if (typeof res.data.data.data_object.basic_info.assembly_number === "string") {
          const assembly = await handleFetchIds(
            res.data.data.data_object.basic_info.assembly_number,
            "assembly"
          );

          setData((prev) => {
            const newObj = { ...prev };
            newObj.data_object.basic_info.assembly_number = assembly;
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

      case "assembly": {
        const { data } = await getApiById("assembly", id);
        return data.data;
      }

      case "district": {
        const { data } = await getApiById("district", id);
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
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="custom-tabs-one-jeevan-parichay-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-jeevan-parichay"
                    role="tab"
                    aria-controls="custom-tabs-one-jeevan-parichay"
                    aria-selected="false"
                  >
                    Jeevan Parichay
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
                      {data?.data_object && data?.data_object.basic_info && data?.data_object.basic_info.profile && (
                        <img
                          style={{ width: "-webkit-fill-available" }}
                          src={
                            process.env.REACT_APP_IMG_URL +
                            data?.data_object?.basic_info?.profile?.destination +
                            "/" +
                            data?.data_object?.basic_info?.profile?.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}
                      <h4 className="membername">
                        {data?.data_object && data?.data_object.basic_info && data?.data_object?.basic_info?.surname + " " + data?.data_object?.basic_info?.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      <div className="ssss">
                        {data?.data_object && data?.data_object.basic_info && (
                          <div>
                            <p>
                              <b>House :</b>{" "}
                              {data?.data_object?.basic_info?.house ? data?.data_object?.basic_info?.house : "N/A"}
                            </p>
                            <p>
                              <b>Assembly :</b>{" "}
                              {data?.data_object?.basic_info?.assembly_number?.assembly_name ? data?.data_object?.basic_info?.assembly_number?.assembly_name : "N/A"}
                            </p>
                            <p>
                              <b>Gender :</b>{" "}
                              {data?.data_object.basic_info.gender?.marathi?.gender ? data?.data_object.basic_info.gender?.marathi?.gender : "N/A"}
                            </p>
                            <p>
                              <b>Party :</b>{" "}
                              {data?.data_object?.basic_info?.party?.marathi?.party_name ? data?.data_object?.basic_info?.party?.marathi?.party_name : "N/A"}
                            </p>
                            <p>
                              <b>District :</b>{" "}
                              {data?.data_object?.basic_info?.district?.marathi?.district ? data?.data_object?.basic_info?.district?.marathi?.district : "N/A"}
                            </p>
                            <p>
                              <b>Constituency :</b>
                              {
                                data?.data_object?.basic_info?.constituency?.council?.constituency_name !== ""
                                  ? data?.data_object?.basic_info?.constituency?.council?.constituency_name
                                  : data?.data_object?.basic_info?.constituency?.assembly?.constituency_name
                                    ? data?.data_object?.basic_info?.constituency?.assembly?.constituency_name
                                    : "N/A"
                              }
                            </p>
                            <p>
                              <b>Constituency From :</b>
                              {data?.data_object?.basic_info?.constituency_from ? formatEnUsDate(data?.data_object?.basic_info?.constituency_from) : "N/A"}
                            </p>
                            <p>
                              <b>Constituency To :</b>
                              {data?.data_object?.basic_info?.constituency_to ? formatEnUsDate(data?.data_object?.basic_info?.constituency_to) : "N/A"}
                            </p>
                            <p>
                              <b>Date of Birth :</b>
                              {data?.data_object?.basic_info?.date_of_birth ? formatEnUsDate(data?.data_object?.basic_info?.date_of_birth) : "N/A"}
                            </p>
                            <p>
                              <b>Place of Birth :</b>
                              {data?.data_object?.basic_info?.place_of_birth ? data?.data_object.basic_info.place_of_birth : "N/A"}
                            </p>
                            <p>
                              <b>Educational Qualification :</b>
                              {data?.data_object?.basic_info?.education ? data?.data_object.basic_info.education : "N/A"}
                            </p>
                            <p>
                              <b>Known Languages :</b>
                              {data?.data_object?.basic_info?.language ? data?.data_object?.basic_info?.language : "N/A"}
                            </p>
                            <p>
                              <b>Marital Status :</b>
                              {data?.data_object?.basic_info?.marital_status ? data?.data_object?.basic_info?.marital_status : "N/A"}
                            </p>
                            <p>
                              <b>Children :</b>{" "}
                              {data?.data_object?.basic_info?.children ? data?.data_object?.basic_info?.children : "N/A"}
                            </p>
                            <p>
                              <b>Business :</b>{" "}
                              {data?.data_object?.basic_info?.business ? data?.data_object?.basic_info?.business : "N/A"}
                            </p>
                            <p>
                              <b>Hobby :</b>{" "}
                              {data?.data_object?.basic_info?.hobby ? data?.data_object?.basic_info?.hobby : "N/A"}
                            </p>
                            <p>
                              <b>Foreign Migration :</b>
                              {data?.data_object?.basic_info?.foreign_migration ? data?.data_object?.basic_info?.foreign_migration : "N/A"}
                            </p>
                            <p>
                              <b>Address :</b>{" "}
                              {data?.data_object?.basic_info?.address ? data?.data_object?.basic_info?.address : "N/A"}
                            </p>
                            <p>
                              <b>Address 1:</b>{" "}
                              {data?.data_object?.basic_info?.address1 ? data?.data_object?.basic_info?.address1 : "N/A"}
                            </p>
                            <p>
                              <b>Mobile Number :</b>
                              {data?.data_object?.basic_info?.mobile_number ? data?.data_object?.basic_info?.mobile_number : "N/A"}
                            </p>
                            <p>
                              <b>Email Address :</b>
                              {data?.data_object.basic_info.email ? data?.data_object.basic_info.email : "N/A"}
                            </p>
                            <p>
                              <b>Other Information :</b>
                              {
                                data?.data_object?.basic_info?.other_info
                                  ? <span
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        data?.data_object.basic_info?.other_info,
                                    }}
                                  />
                                  : "N/A"
                              }
                            </p>
                            <p>
                              <b>Awards :</b>
                              {
                                data?.data_object?.basic_info?.awards
                                  ? <span
                                    dangerouslySetInnerHTML={{
                                      __html: data?.data_object?.basic_info?.awards,
                                    }}
                                  />
                                  : "N/A"
                              }
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
                      {data?.data_object && data?.data_object.basic_info && data?.data_object.basic_info.profile && (
                        <img
                          style={{ width: "-webkit-fill-available" }}
                          src={
                            process.env.REACT_APP_IMG_URL +
                            data?.data_object?.basic_info?.profile?.destination +
                            "/" +
                            data?.data_object?.basic_info?.profile?.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}

                      <h4 className="membername">
                        {data?.data_object && data?.data_object.basic_info && data?.data_object?.basic_info?.surname + " " + data?.data_object?.basic_info?.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      {data?.data_object && data?.data_object.political_journey && data?.data_object.political_journey.length > 0 ? (
                        <ul className="timeline timeline-split">
                          {data?.data_object?.political_journey?.map(
                            (item, index) => (
                              <li className="timeline-item" key={index}>
                                <div className="timeline-marker" />
                                <div className="timeline-content">
                                  <h3 className="timeline-title">
                                    {formatEnUsDate(item?.date)}
                                  </h3>
                                  <p>Title : {item.title}</p>
                                  <p>
                                    Presiding Officer : {item?.presiding?.name || "-"}
                                  </p>
                                  <p>
                                    Legislative Position :
                                    {item?.legislative_position?.name || "-"}
                                  </p>
                                  <p>Designation : {item?.designation?.name || "-"}</p>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <div className="col-12">
                          <h4>No political journey found</h4>
                        </div>
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
                  {data?.data_object && data?.data_object.election_data && data?.data_object.election_data.member_election_result.length > 0 ? (
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
                              {data?.data_object?.election_data?.total_electorate ? data?.data_object?.election_data?.total_electorate : "-"}
                            </h3>
                          </div>
                          <div className="col-lg-5">
                            <h3>
                              • Total valid voting :{" "}
                              {
                                data?.data_object?.election_data
                                  ?.total_valid_voting ? data?.data_object?.election_data?.total_valid_voting : "-"
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
                                  <h4>{item?.candidate_name || "-"}</h4>
                                </td>
                                <td>
                                  <h4>{item?.votes ? item?.votes : "-"}</h4>
                                </td>
                                <td>
                                  <h4>{item?.party?.marathi?.party_name || "-"}</h4>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div className="col-12">
                      <h4>No election data found</h4>
                    </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="custom-tabs-one-jeevan-parichay"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-jeevan-parichay-tab"
                >
                  <div className="row">
                    <div className="col-12">
                      <PDFViewer
                        pdfUrl={process.env.REACT_APP_IMG_URL + data?.data_object?.jeevan_parichay?.destination + "/" + data?.data_object?.jeevan_parichay?.filename}
                        height="600px"
                        showToolbar={true}
                        showDownloadLink={true}
                        className="border rounded"
                      />
                    </div>
                  </div>
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
