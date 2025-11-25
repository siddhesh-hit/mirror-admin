
import { useDataFetchingForBothApis } from "hooks/useDataFetchingForBothApis";
import Loading from "components/common/Loader";
import { formatEnUsDate } from "lib/dateEnUsFormat";
import PDFViewer from "components/common/PDFViewer";

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
                      {data && data?.basic_info && (
                        <img
                          style={{ width: "100%" }}
                          src={
                            process.env.REACT_APP_IMG_URL +
                            data?.basic_info?.profile?.destination +
                            "/" +
                            data?.basic_info?.profile?.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}
                      <h4 className="membername">
                        {data && data?.basic_info && data?.basic_info?.surname + " " + data?.basic_info?.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      <div className="ssss">
                        {data && data?.basic_info && (
                          <div>
                            <p>
                              <b>House :</b>{" "}
                              {data?.basic_info?.house ? data?.basic_info?.house : "N/A"}
                            </p>
                            <p>
                              <b>Assembly :</b>{" "}
                              {data?.basic_info?.assembly_number?.assembly_name ? data?.basic_info?.assembly_number?.assembly_name : "N/A"}
                            </p>
                            <p>
                              <b>Gender :</b>{" "}
                              {data?.basic_info.gender?.marathi?.gender ? data?.basic_info.gender?.marathi?.gender : "N/A"}
                            </p>
                            <p>
                              <b>Party :</b>{" "}
                              {data?.basic_info?.party?.marathi?.party_name ? data?.basic_info?.party?.marathi?.party_name : "N/A"}
                            </p>
                            <p>
                              <b>District :</b>{" "}
                              {data?.basic_info?.district?.marathi?.district ? data?.basic_info?.district?.marathi?.district : "N/A"}
                            </p>
                            <p>
                              <b>Constituency :</b>
                              {
                                data?.basic_info?.constituency?.council?.constituency_name !== ""
                                  ? data?.basic_info?.constituency?.council?.constituency_name
                                  : data?.basic_info?.constituency?.assembly?.constituency_name
                                    ? data?.basic_info?.constituency?.assembly?.constituency_name
                                    : "N/A"
                              }
                            </p>
                            <p>
                              <b>Constituency From :</b>
                              {data?.basic_info?.constituency_from ? formatEnUsDate(data?.basic_info?.constituency_from) : "N/A"}
                            </p>
                            <p>
                              <b>Constituency To :</b>
                              {data?.basic_info?.constituency_to ? formatEnUsDate(data?.basic_info?.constituency_to) : "N/A"}
                            </p>
                            <p>
                              <b>Date of Birth :</b>
                              {data?.basic_info?.date_of_birth ? formatEnUsDate(data?.basic_info?.date_of_birth) : "N/A"}
                            </p>
                            <p>
                              <b>Place of Birth :</b>
                              {data?.basic_info?.place_of_birth ? data?.basic_info.place_of_birth : "N/A"}
                            </p>
                            <p>
                              <b>Educational Qualification :</b>
                              {data?.basic_info?.education ? data?.basic_info.education : "N/A"}
                            </p>
                            <p>
                              <b>Known Languages :</b>
                              {data?.basic_info?.language ? data?.basic_info?.language : "N/A"}
                            </p>
                            <p>
                              <b>Marital Status :</b>
                              {data?.basic_info?.marital_status ? data?.basic_info?.marital_status : "N/A"}
                            </p>
                            <p>
                              <b>Children :</b>{" "}
                              {data?.basic_info?.children ? data?.basic_info?.children : "N/A"}
                            </p>
                            <p>
                              <b>Business :</b>{" "}
                              {data?.basic_info?.business ? data?.basic_info?.business : "N/A"}
                            </p>
                            <p>
                              <b>Hobby :</b>{" "}
                              {data?.basic_info?.hobby ? data?.basic_info?.hobby : "N/A"}
                            </p>
                            <p>
                              <b>Foreign Migration :</b>
                              {data?.basic_info?.foreign_migration ? data?.basic_info?.foreign_migration : "N/A"}
                            </p>
                            <p>
                              <b>Address :</b>{" "}
                              {data?.basic_info?.address ? data?.basic_info?.address : "N/A"}
                            </p>
                            <p>
                              <b>Address 1:</b>{" "}
                              {data?.basic_info?.address1 ? data?.basic_info?.address1 : "N/A"}
                            </p>
                            <p>
                              <b>Mobile Number :</b>
                              {data?.basic_info?.mobile_number ? data?.basic_info?.mobile_number : "N/A"}
                            </p>
                            <p>
                              <b>Email Address :</b>
                              {data?.basic_info.email ? data?.basic_info.email : "N/A"}
                            </p>
                            <p>
                              <b>Other Information :</b>
                              {
                                data?.basic_info?.other_info
                                  ? <span
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        data?.basic_info?.other_info,
                                    }}
                                  />
                                  : "N/A"
                              }
                            </p>
                            <p>
                              <b>Awards :</b>
                              {
                                data?.basic_info?.awards
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
                      {data && data?.basic_info && (
                        <img
                          style={{ width: "100%" }}
                          src={
                            process.env.REACT_APP_IMG_URL +
                            data?.basic_info?.profile.destination +
                            "/" +
                            data?.basic_info?.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}

                      <h4 className="membername">
                        {data && data?.basic_info && data?.basic_info?.surname + " " + data?.basic_info?.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      {data && data?.political_journey && data?.political_journey.length > 0 && (
                        <ul className="timeline timeline-split">
                          {data?.political_journey?.map((item, index) => (
                            <li className="timeline-item" key={index}>
                              <div className="timeline-marker" />
                              <div className="timeline-content">
                                <h3 className="timeline-title">
                                  {formatEnUsDate(item?.date)}
                                </h3>
                                <p>Title : {item?.title}</p>
                                <p>Presiding Officer : {item?.presiding?.name || '-'}</p>
                                <p>
                                  Legislative Position :
                                  {item?.legislative_position?.name || '-'}
                                </p>
                                <p>Designation : {item?.designation?.name || '-'}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}

                      {data && data?.political_journey && data?.political_journey.length === 0 && (
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
                  {data && data?.election_data && (
                    <>
                      <div className="col-lg-12">
                        <h4 className="eclecresult">Election Result</h4>
                        <h3 className="gondiaa">
                          {data?.election_data?.constituency
                            ? data?.election_data?.constituency?.council
                              ?.constituency_name !== ""
                              ? data?.election_data?.constituency.council
                                .constituency_name
                              : data?.election_data?.constituency.assembly
                                .constituency_name
                            : "N/A"
                          }
                        </h3>
                        <div className="row votes_abcdss">
                          <div className="col-lg-5">
                            <h3>
                              • Total Electorate :
                              {data?.election_data?.total_electorate ? data?.election_data?.total_electorate : "N/A"}
                            </h3>
                          </div>
                          <div className="col-lg-5">
                            <h3>
                              • Total valid voting :{" "}
                              {data?.election_data?.total_valid_voting ? data?.election_data?.total_valid_voting : "N/A"}
                            </h3>
                          </div>
                        </div>
                      </div>
                      {data?.election_data?.member_election_result && data?.election_data?.member_election_result.length > 0 && <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Candidate Name</th>
                            <th>Votes</th>
                            <th>Party</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.election_data?.member_election_result.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>
                                  <h4>{index + 1}</h4>
                                </td>
                                <td>
                                  <h4>{item.candidate_name ? item.candidate_name : "N/A"}</h4>
                                </td>
                                <td>
                                  <h4>{item.votes ? item.votes : "N/A"}</h4>
                                </td>
                                <td>
                                  <h4>{item?.party?.marathi?.party_name ? item?.party?.marathi?.party_name : "N/A"}</h4>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>}
                    </>
                  )}

                  {data && data?.election_data && data?.election_data?.member_election_result?.length === 0 && (
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
                    {data && data?.jeevan_parichay && data?.jeevan_parichay?.filename && data?.jeevan_parichay?.destination ? (
                      <div className="col-12">
                        <PDFViewer
                          pdfUrl={process.env.REACT_APP_IMG_URL + data?.jeevan_parichay?.destination + "/" + data?.jeevan_parichay?.filename}
                          height="600px"
                          showToolbar={true}
                          showDownloadLink={true}
                          className="border rounded"
                        />
                      </div>
                    ) : (
                      <div className="col-12">
                        <h4>No jeevan parichay found</h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default ViewMemberProfile;
