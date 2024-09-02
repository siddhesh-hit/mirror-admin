import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "assets/add.svg";

import { API } from "lib/api";
import { useDataFetchingForBothApis } from "lib/useDataFetchingForBothApis";
import Loading from "components/common/Loader";

const ViewLegislativeAssembly = () => {
  const { data, loading, error } = useDataFetchingForBothApis("sabha");
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddLegislativeAssembly" className="addpagess">
          <img src={add} alt="add" />
          Add Legislative Assembly
        </Link>
        <h4 className="page-title">• View Legislative Assembly</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Image</th>
                    <th style={{ width: "30%" }}>Description</th>
                    <th style={{ width: "30%" }}>वर्णन</th>
                    <th style={{ width: "20%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.english && data.marathi && (
                    <tr>
                      <td>
                        <a
                          href={
                            API.baseUrl +
                            data.banner_image.destination +
                            "/" +
                            data.banner_image.filename
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
                      {/* <td>
                        <h4>Legislative Council</h4>
                      </td> */}
                      <td className="scrolltabss">
                        {/* Display description for English */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.english.description,
                            }}
                          ></span>
                        </p>
                      </td>
                      <td className="scrolltabss">
                        {/* Display description for Marathi */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.marathi.description,
                            }}
                          ></span>
                        </p>
                      </td>
                      <td>
                        {/* Display edit link */}
                        <Link to={`/EditLegislativeAssembly?id=${data._id}`}>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Edit the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <i className="fa fa-edit"></i>
                          </OverlayTrigger>
                        </Link>
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
        <h4 className="page-title">• View Important Publications</h4>
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
                    <th style={{ width: "20%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.publication && data.publication.length > 0 ? (
                    <>
                      {data.publication.map((item, index) => (
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
                                <i className="fa fa-eye" aria-hidden="true"></i>
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
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </a>
                          </td>
                          <td>
                            <p>{item.marathi.name}</p>
                          </td>
                          <td>
                            <Link
                              to={`/EditLegislativeAssembly?id=${data._id}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-edit"></i>
                              </OverlayTrigger>
                            </Link>
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
        <h4 className="page-title">• View Structure</h4>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.english?.structure && data?.marathi?.structure && (
                    <tr>
                      <td>
                        <a
                          href={
                            API.baseUrl +
                            data.structure_profile.destination +
                            "/" +
                            data.structure_profile.filename
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
                        <p>{data.english.structure.name}</p>
                      </td>
                      <td>
                        <p>{data.marathi.structure.name}</p>
                      </td>
                      <td>
                        <p>{data.english.structure.type}</p>
                      </td>
                      <td>
                        <p>{data.marathi.structure.type}</p>
                      </td>
                      <td>
                        <p>{data.english.structure.term_limit}</p>
                      </td>
                      <td>
                        <p>{data.marathi.structure.term_limit}</p>
                      </td>
                      <td>
                        <p>{data.english.structure.seats}</p>
                      </td>
                      <td>
                        <p>{data.marathi.structure.seats}</p>
                      </td>
                      <td>
                        {/* Display edit link */}
                        <Link to={`/EditLegislativeAssembly?id=${data._id}`}>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Edit the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <i className="fa fa-edit"></i>
                          </OverlayTrigger>
                        </Link>
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
        <h4 className="page-title">• View Assembly Profile</h4>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.legislative_council &&
                    data.legislative_council.map((item, index) => (
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
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </a>
                        </td>
                        <td>
                          <h4>
                            {
                              data.english.legislative_council[index]
                                .council_name
                            }
                          </h4>
                        </td>
                        <td>
                          <h4>
                            {
                              data.marathi.legislative_council[index]
                                .council_name
                            }
                          </h4>
                        </td>
                        <td className="scrolltabss">
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  data.english.legislative_council[index]
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
                                  data.marathi.legislative_council[index]
                                    .council_description,
                              }}
                            ></span>
                          </p>
                        </td>
                        <td>
                          <Link to={`/EditLegislativeAssembly?id=${data._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Edit the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-edit"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLegislativeAssembly;
