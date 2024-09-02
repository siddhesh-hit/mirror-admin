import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import history from "assets/history.svg";

import { getApi } from "services/axiosInterceptors";
import { newPageName } from "data/fileName";
import { formatEnUsDate } from "lib/dateEnUsFormat";

const ViewAllFaqs = () => {
  const [data, setData] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    action: "",
    count: 0,
    modelName: "",
  });

  const fetchData = async () => {
    await getApi(
      `pending?perPage=${pageOptions.current}&perLimit=${pageOptions.page
      }&isPending=${true}&action=${pageOptions.action}&modelName=${pageOptions.modelName
      }`
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
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    pageOptions.action,
    pageOptions.page,
    pageOptions.current,
    pageOptions.modelName,
  ]);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to="/ViewWorkflowHistory" className="addpagess">
            <img src={history} alt="history" />
            Workflow history
          </Link>
          <h4 className="page-title">• View All Workflow</h4>
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
            <option value={"Create"}>Create</option>
            <option value={"Update"}>Update</option>
            <option value={"Delete"}>Delete</option>
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
                modelName: data,
              }))
            }
            searchQuery="the ModelName"
          />

          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Action</th>
                      <th>Model Name</th>
                      <th>Date</th>
                      <th>View</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data && data?.length > 0 ? (
                      data?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>
                              {pageOptions.current * pageOptions + index + 1}
                            </h4>
                          </td>
                          <td>{item?.action}</td>
                          <td>{item?.modelName}</td>
                          <td>{formatEnUsDate(item.createdAt)}</td>
                          <td>
                            <Link
                              to={`/${newPageName[item?.modelName]}?id=${item._id
                                }&action=${item.action}`}
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
                            </Link>
                            {/* )} */}
                          </td>
                          <td>
                            <Link
                              to={`/EditWorkflow?id=${item._id}&action=${item.action}`}
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
                      ))
                    ) : (
                      <></>
                    )}
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

export default ViewAllFaqs;
