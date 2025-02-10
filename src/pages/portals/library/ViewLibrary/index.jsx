import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import back from "assets/back.svg";

import { useDataFetchingForBothApis } from "lib/useDataFetchingForBothApis";
import Loading from "components/common/Loader";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewLibrary = () => {
  const { data, loading, error } = useDataFetchingForBothApis("library");

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllLibrary} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• View Library</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Image</th>
                    <th className="heighttab" style={{ width: "35%" }}>
                      Description
                    </th>
                    <th className="heighttab" style={{ width: "35%" }}>
                      वर्णन
                    </th>
                    <th style={{ width: "15%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.english && data?.marathi ? (
                    <tr>
                      <td>
                        <a
                          href={
                            process.env.REACT_APP_IMG_URL +
                            data.banner.destination +
                            "/" +
                            data.banner.filename
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
                        {/* Display description for English */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{ __html: data.english.description, }}
                          />
                        </p>
                      </td>
                      <td className="scrolltabss">
                        {/* Display description for Marathi */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{ __html: data.marathi.description, }}
                          />
                        </p>
                      </td>
                      <td>
                        {/* Display edit link */}
                        <Link to={`${removeTailingId(paths.editLibrary)}/${data._id}`}>
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
                  ) : (
                    <> </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="contentofpages">
        <Link to={paths.viewAllLibrary} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• View Library Documents</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Image</th>
                    <th className="heighttab" style={{ width: "35%" }}>
                      Description
                    </th>
                    <th className="heighttab" style={{ width: "35%" }}>
                      वर्णन
                    </th>
                    <th style={{ width: "15%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.english && data?.marathi ? (
                    <tr>
                      <td>
                        <a
                          href={
                            process.env.REACT_APP_IMG_URL +
                            data.banner.destination +
                            "/" +
                            data.banner.filename
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
                        <Link to={`${removeTailingId(paths.editLibraryDoc)}`}>
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
                  ) : (
                    <> </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLibrary;
