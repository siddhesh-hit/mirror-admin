import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";

import { getApi, postApi, deleteApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewAllSessionCalendar = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState({
    post: false,
    del: false,
  });

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    topic_name: "",
  });

  const fetchData = async () => {
    await getApi(
      `session/fields?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&topic_name=${pageOptions.topic_name}`
    )
      .then((res) => {
        setData(res.data.data);
        setPageOptions((prev) => ({
          ...prev,
          count: res.data.count,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleArchiveSubmit = async (data) => {
    let newData = {
      data_object: data,
      action: "Archive",
      state: "Archived",
      modelName: "SessionCalendar",
      modelId: data._id,
    };

    if (isSubmitted.post) return;

    setSubmit((prev) => ({
      ...prev,
      post: true,
    }));

    await postApi(`/archive`, newData)
      .then((res) => {
        if (res.data.success) {
          toast.success("An entry archived!");
          fetchData();
        }
      })
      .catch((err) => console.log(err));

    setSubmit((prev) => ({
      ...prev,
      post: false,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      if (isSubmitted.del) return;

      setSubmit((prev) => ({
        ...prev,
        del: true,
      }));

      await deleteApi("session", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Delete request forwaded!");
            fetchData();
          }
        })
        .catch((err) => toast.error("Failed to delete the session."));
      setSubmit((prev) => ({
        ...prev,
        del: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions.topic_name]);
  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.addSessionCalendar} className="addpagess">
            <img src={add} alt="add" />
            Add Session Calendar
          </Link>
          <h4 className="page-title">• View All Session Calendar</h4>
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
                topic_name: data,
              }))
            }
            searchQuery="the topic name"
          />
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Topic</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>Archive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>
                            <h4>{item.topic_name}</h4>
                          </td>
                          <td>{item.isActive ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={`${paths.viewSessionCalendar}?id=${item._id}`}>
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
                          </td>
                          <td>
                            <Link to={`${paths.editSessionCalendar}?id=${item._id}`}>
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
                          <td>
                            <Link onClick={() => handleDelete(item._id)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Delete the data.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-trash"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <button onClick={() => handleArchiveSubmit(item)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>
                                    Archive the data.
                                  </Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i
                                  className="fa fa-archive"
                                  aria-hidden="true"
                                ></i>
                              </OverlayTrigger>
                            </button>
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

export default ViewAllSessionCalendar;
