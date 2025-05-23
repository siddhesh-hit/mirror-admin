import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { getApiById } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewInterest = () => {
  const [data, setData] = useState({});

  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("interest", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• View Interest Access</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Query (Marathi)</th>
                    <th>User</th>
                    <th>Description</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.query && data.userId && (
                    <>
                      <tr>
                        <td>{data.query.english.navigation}</td>
                        <td>{data.query.marathi.navigation}</td>
                        <td>{data.userId.full_name}</td>
                        <td>{data.description}</td>
                        <td>
                          <Link to={`${removeTailingId(paths.editInterest)}/${data._id}`}>
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
                    </>
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

export default ViewInterest;
