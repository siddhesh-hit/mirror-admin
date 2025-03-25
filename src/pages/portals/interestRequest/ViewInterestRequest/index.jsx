import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { getApi } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";
import Paginate from "components/common/Pagination";
import { toast } from "react-toastify";

const ViewInterestRequest = () => {
  const [data, setData] = useState({
    interest: {
      data: [],
      count: 0,
      page: 0
    },
    request: {
      data: [],
      count: 0,
      page: 0
    },
  });

  const fetchInterest = async () => {
    const res = await getApi(`interest?perPage=${data.interest.page}&perLimit=${10}`);
    if (res.data.success) {
      setData((prev) => ({
        ...prev,
        interest: {
          ...prev.interest,
          data: res.data.data,
          count: res.data.count
        },
      }))
    } else {
      toast.error("Failed to fetch interest!")
    }
  };

  const fetchRequest = async () => {
    const res = await getApi(`request?perPage=${data.request.page}&perLimit=${10}`);
    if (res.data.success) {
      setData((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          data: res.data.data,
          count: res.data.count
        },
      }))
    } else {
      toast.error("Failed to fetch request!")
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [data.request.page]);

  useEffect(() => {
    fetchInterest()
  }, [data.interest.page])

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
                    <th>View</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.interest.count > 0 && (
                    data.interest.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.query.english.navigation}</td>
                        <td>{item.query.marathi.navigation}</td>
                        <td>{item?.userId?.full_name}</td>
                        <td>
                          <Link to={`${removeTailingId(paths.viewInterest)}/${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>View the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-eye"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                        <td>
                          <Link to={`${removeTailingId(paths.editInterest)}/${item._id}`}>
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
                    ))
                  )}
                </tbody>
              </table>
              {data.interest.count > 0 && (
                <Paginate
                  totalCount={data.interest.count}
                  perPage={10}
                  handlePageChange={(cp) =>
                    setData((prev) => ({
                      ...prev,
                      interest: { ...prev.interest, page: cp },
                    }))
                  }
                  initialPage={data.interest.page}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="contentofpages">
        <h4 className="page-title">• View Request Access</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Query (Marathi)</th>
                    <th>User</th>
                    <th>Rejected</th>
                    <th>Accepted</th>
                    <th>View</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.request.count > 0 && (
                    data.request.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.query.english.navigation}</td>
                        <td>{item.query.marathi.navigation}</td>
                        <td>{item.userId.full_name}</td>
                        <td>{data.isRejected ? "Yes" : "No"}</td>
                        <td>{data.isAccepted ? "Yes" : "No"}</td>
                        <td>
                          <Link to={`${removeTailingId(paths.viewRequest)}/${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>View the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-eye"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                        <td>
                          <Link to={`${removeTailingId(paths.editRequest)}/${item._id}`}>
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
                    ))
                  )}
                </tbody>
              </table>
              {data.request.count > 0 && (
                <Paginate
                  totalCount={data.request.count}
                  perPage={10}
                  handlePageChange={(cp) =>
                    setData((prev) => ({
                      ...prev,
                      request: { ...prev.request, page: cp },
                    }))
                  }
                  initialPage={data.request.page}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInterestRequest;
