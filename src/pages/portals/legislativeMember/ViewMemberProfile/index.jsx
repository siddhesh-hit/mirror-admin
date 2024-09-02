import { API } from "lib/api";
import { useDataFetchingForBothApis } from "lib/useDataFetchingForBothApis";
import Loading from "components/common/Loader";
import { formatEnUsDate } from "lib/dateEnUsFormat";

const ViewMemberProfile = () => {
  const { data, loading } = useDataFetchingForBothApis("member");
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
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
                    Legislative Journey
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
                      {data && data.basic_info && (
                        <img
                          style={{ width: "100%" }}
                          src={
                            API.baseUrl +
                            data.basic_info.profile.destination +
                            "/" +
                            data.basic_info.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}
                      <h4 className="membername">
                        {data &&
                          data.basic_info &&
                          data.basic_info.surname + " " + data.basic_info.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      <div className="ssss">
                        {data && data.basic_info && (
                          <div>
                            <p>
                              <b>Date of Birth :</b>
                              {formatEnUsDate(data.basic_info.date_of_birth)}
                            </p>
                            <p>
                              <b>Place of Birth :</b>
                              {data.basic_info.place_of_birth}
                            </p>
                            <p>
                              <b>Educational Qualification :</b>
                              {data.basic_info.education}
                            </p>
                            <p>
                              <b>Known Languages :</b>
                              {data.basic_info.language}
                            </p>
                            <p>
                              <b>Marital Status :</b>
                              {data.basic_info.marital_status}
                            </p>
                            <p>
                              <b>Children :</b> {data.basic_info.children}
                            </p>
                            <p>
                              <b>Business :</b> {data.basic_info.business}
                            </p>
                            <p>
                              <b>Party :</b>
                              {data.basic_info.party.marathi.party_name}
                            </p>
                            <p>
                              <b>Constituency :</b>
                              {data?.basic_info?.constituency
                                ? data.basic_info.constituency.council
                                  .constituency_name !== ""
                                  ? data.basic_info.constituency.council
                                    .constituency_name
                                  : data.basic_info.constituency.assembly
                                    .constituency_name
                                : ""}
                            </p>
                            <p>
                              <b>Hobby :</b> {data.basic_info.hobby}
                            </p>
                            <p>
                              <b>Foreign Migration :</b>
                              {data.basic_info.foreign_migration}
                            </p>
                            <p>
                              <b>Gender :</b>{" "}
                              {data.basic_info.gender.english.gender}
                            </p>
                            <p>
                              <b>Address :</b> {data.basic_info.address}
                            </p>
                            <p>
                              <b>Mobile Number :</b>
                              {data.basic_info.mobile_number}
                            </p>
                            <p>
                              <b>Email Address :</b>
                              {data.basic_info.email}
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
                      {data && data.basic_info && (
                        <img
                          style={{ width: "100%" }}
                          src={
                            API.baseUrl +
                            data.basic_info.profile.destination +
                            "/" +
                            data.basic_info.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}

                      <h4 className="membername">
                        {data &&
                          data.basic_info &&
                          data.basic_info.surname + " " + data.basic_info.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      {data && data.political_journey && (
                        <ul className="timeline timeline-split">
                          {data.political_journey.map((item, index) => (
                            <li className="timeline-item" key={index}>
                              <div className="timeline-marker" />
                              <div className="timeline-content">
                                <h3 className="timeline-title">
                                  {formatEnUsDate(item.date)}
                                </h3>
                                <p>Title : {item.title}</p>
                                <p>Presiding Officer : {item.presiding.name}</p>
                                <p>
                                  Legislative Position :
                                  {item.legislative_position.name}
                                </p>
                                <p>Designation : {item.designation.name}</p>
                              </div>
                            </li>
                          ))}
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
                  {data && data.election_data && (
                    <>
                      <div className="col-lg-12">
                        <h4 className="eclecresult">Election Result</h4>
                        <h3 className="gondiaa">
                          {data?.election_data?.constituency
                            ? data?.election_data?.constituency?.council
                              ?.constituency_name !== ""
                              ? data.election_data.constituency.council
                                .constituency_name
                              : data.election_data.constituency.assembly
                                .constituency_name
                            : ""}
                        </h3>
                        <div className="row votes_abcdss">
                          <div className="col-lg-5">
                            <h3>
                              • Total Electorate :
                              {data.election_data.total_electorate}
                            </h3>
                          </div>
                          <div className="col-lg-5">
                            <h3>
                              • Total valid voting :{" "}
                              {data.election_data.total_valid_voting}
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
                          {data.election_data.member_election_result.map(
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
                                  <h4>{item?.party?.marathi?.party_name}</h4>
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
        </div>
      </div>
    </div>
  );
};

export default ViewMemberProfile;
