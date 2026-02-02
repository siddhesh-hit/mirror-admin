import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";

import { getApi, getApiForBlob } from "services/axios";
import { paths } from "services/paths";
import { removeIdFromPathname, removeTailingId } from "data/RouteStructure";
import { toast } from "react-toastify";
import { api } from "services/api";

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

  const handleDownload = async (id) => {
    try {
      const querystring = new URLSearchParams({ userId: id });
      toast.info("Downloading auth data, please wait it'll take a few minutes...");

      const res = await getApiForBlob(`${api.auditUserDownloadAll}?${querystring}`);
      const filename = res?.headers?.['content-disposition']?.split('filename=')?.[1]?.replace(/"/g, '');
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Data downloaded successfully as ${filename}`);

      return true;
    } catch (error) {
      console.log(error);

      // When responseType is 'blob', error response data is also a Blob
      // Need to parse it to get the JSON error message
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const json = JSON.parse(text);
          toast.error(json.message || "Failed to download the data");
        } catch {
          toast.error("Failed to download the data");
        }
      } else {
        toast.error(error.response?.data?.message || "Failed to download the data");
      }
    }
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
        <Link to={paths.addPortalUser} className="addpagess">
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
                    <th>Download</th>
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
                          <Link to={`${removeTailingId(paths.viewUserAudit)}/${item._id}`}>
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
                        <td>
                          <button className="btn btn-primary" onClick={() => handleDownload(item._id)}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>
                                  Download all user audit.
                                </Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-download" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </button>
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
