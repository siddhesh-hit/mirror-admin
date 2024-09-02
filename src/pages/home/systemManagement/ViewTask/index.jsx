import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";

import { getApi } from "services/axiosInterceptors";
import { routes } from "data/RouteStructure";

const ViewTask = () => {
  const [roles, setRoles] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    "userId.full_name": "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await getApi(
        `user/roletask?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&userId.full_name=${pageOptions["userId.full_name"]}`
      )
        .then((res) => {
          if (res.data.success) {
            setRoles(res.data.data);
            setPageOptions((prev) => ({
              ...prev,
              count: res.data.count,
            }));
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions["userId.full_name"]]);

  const handleDelete = () => { };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          {/* <Link className="addpagess" to="/AddTask">
            <img src={add} alt="add" />
            Add Task Management
          </Link> */}
          <h4 className="page-title">• View All Task Management</h4>

          <TotalEntries
            returnCount={(data) =>
              setPageOptions((prev) => ({
                ...prev,
                page: data,
              }))
            }
            returnSearch={(data) =>
              setPageOptions((prev) => ({
                ...prev,
                "userId.full_name": data,
              }))
            }
            searchQuery="the name"
          />

          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>User</th>
                      <th>Task Name</th>
                      {/* <th>Activity</th> */}
                      <th>Task Approval Authority</th>
                      {/* <th>Delete</th> */}
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles &&
                      roles?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{item.userId?.department?.name}</h4>
                          </td>
                          <td>
                            <h4>{item.userId?.full_name}</h4>
                          </td>
                          <td>
                            {item?.taskName?.length > 0 ? (
                              <>
                                {item?.taskName?.length === routes.length ? (
                                  "All"
                                ) : (
                                  <ul className="overflowwww">
                                    {item.taskName.map((item, index, array) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                          {/* <td>
                            <h4>{item.activity || "-"}</h4>
                          </td> */}
                          <td>
                            <h4>{item.role || "-"}</h4>
                          </td>
                          {/* <td onClick={handleDelete}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Delete the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </td> */}
                          <td>
                            <Link to={`/EditTask?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {pageOptions.count > 0 && (
                  <Paginate
                    totalCount={pageOptions.count}
                    perPage={pageOptions.page}
                    handlePageChange={(currentPage) => {
                      setPageOptions((prev) => ({
                        ...prev,
                        current: currentPage,
                      }));
                    }}
                    initialPage={pageOptions.current}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
