import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";

import { getApi } from "services/axiosInterceptors";

const ViewAllUserAudit = () => {
  const [data, setData] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    action: "",
    count: 0,
    full_name: "",
  });

  const fetchData = async () => {
    await getApi(
      `user?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&role_taskId.role=${pageOptions.action}&full_name=${pageOptions.full_name}`
    )
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setPageOptions((prev) => ({
            ...prev,
            count: res.data.count,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [
    pageOptions.action,
    pageOptions.page,
    pageOptions.current,
    pageOptions.full_name,
  ]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddPortalUsers" className="addpagess">
          <img src={add} alt="add" />
          Add Portal User
        </Link>
        <h4 className="page-title">• View Portal User</h4>

        <select
          className="form-control mb-4"
          name="action"
          value={pageOptions.action}
          onChange={(e) =>
            setPageOptions((prev) => ({
              ...prev,
              action: e.target.value,
            }))
          }
        >
          <option hidden>Select Action</option>
          <option value={""}>All</option>
          <option value={"SuperAdmin"}>SuperAdmin</option>
          <option value={"Admin"}>Admin</option>
          <option value={"Reviewer"}>Reviewer</option>
          <option value={"ContentCreator"}>ContentCreator</option>
          <option value={"User"}>User</option>
        </select>

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
              full_name: data,
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
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <p>{item.full_name}</p>
                        </td>
                        <td>
                          <p>{item.email}</p>
                        </td>
                        <td>
                          <Link to={`/ViewUserAudit?id=${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>
                                  View the user audit.
                                </Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>
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
  );
};

export default ViewAllUserAudit;
