import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "assets/add.svg";

import { API } from "lib/api";
import { useDataFetchingForBothApis } from "lib/useDataFetchingForBothApis";
import Loading from "components/common/Loader";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewVidhanMandal = () => {
  const { data, loading, error } = useDataFetchingForBothApis("mandal");
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addVidhanMandal} className="addpagess">
          <img src={add} alt="add" />
          Add Vidhan Mandal
        </Link>

        <h4 className="page-title">• View Vidhan Mandal</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>English Title</th>
                    <th>Marathi Title</th>
                    <th className="heighttab">Description</th>
                    <th className="heighttab">वर्णन</th>
                    <th>Document</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.english &&
                    data.marathi &&
                    data.english.about_us.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>View the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <a
                              href={
                                API.baseUrl +
                                data.mandal_image[index].image.destination +
                                "/" +
                                data.mandal_image[index].image.filename
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </a>
                          </OverlayTrigger>
                        </td>
                        <td>
                          {/* Display title for English */}
                          <h4>{item.title}</h4>
                        </td>
                        <td>
                          {/* Display title for Marathi */}
                          <h4>{data.marathi.about_us[index].title}</h4>
                        </td>
                        <td className="scrolltabss">
                          {/* Display description for English */}
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></span>
                          </p>
                        </td>
                        <td className="scrolltabss">
                          {/* Display description for Marathi */}
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  data.marathi.about_us[index].description,
                              }}
                            ></span>
                          </p>
                        </td>
                        <td>
                          {/* Display file name for Marathi */}
                          <a
                            href={
                              API.baseUrl +
                              data.mandal_image[index].documents.destination +
                              "/" +
                              data.mandal_image[index].documents.filename
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
                          <br />
                          <span>
                            {data.mandal_image[index].documents?.filename}
                          </span>
                        </td>
                        <td>
                          <Link to={`${removeTailingId(paths.editVidhanMandal)}/${data._id}`}>
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

export default ViewVidhanMandal;
