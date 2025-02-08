import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";

import { getApi, postApi, deleteApi } from "services/axiosInterceptors";
import { API } from "lib/api";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewGallery = () => {
  const [data, setData] = useState([]);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    name: "",
  });
  const [isSubmitted, setSubmit] = useState({
    post: false,
    del: false,
  });

  const fetchData = async () => {
    await getApi(
      `gallery?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&filename=${pageOptions.name}`
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

  const handleArchiveSubmit = async (data) => {
    let newData = {
      data_object: data,
      action: "Archive",
      state: "Archived",
      modelName: "MandalGallery",
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

      await deleteApi("gallery", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Delete request forwaded!");
            fetchData();
          }
        })
        .catch((err) => toast.error("Failed to delete the gallery."));

      setSubmit((prev) => ({
        ...prev,
        del: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions.name]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addGallery} className="addpagess">
          <img src={add} alt="add" />
          Add Gallery
        </Link>

        <h4 className="page-title">• View Gallery</h4>
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
              name: data,
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
                    <th>Sr No</th>
                    <th>Photos and Videos Gallery</th>
                    <th>View File</th>
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
                          <h4>{item?.filename}</h4>
                        </td>
                        <td>
                          <Link to={`${paths.viewGalleryImage}/${item._id}`}>
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
                          <Link to={`${removeTailingId(paths.editGallery)}/${item._id}`}>
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
                                <Tooltip {...props}>Archive the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i class="fa fa-archive" aria-hidden="true"></i>
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
  );
};

export default ViewGallery;
