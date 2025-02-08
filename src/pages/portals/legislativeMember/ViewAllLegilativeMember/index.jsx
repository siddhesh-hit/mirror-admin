import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";

import add from "assets/add.svg";

import { getApi, postApi, deleteApi } from "services/axiosInterceptors";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewAllLegislativeMember = () => {
  const [data, setData] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    "basic_info.name": "",
  });
  const [isSubmitted, setSubmit] = useState({
    post: false,
    del: false,
  });

  const fetchData = async () => {
    await getApi(
      `member?status=Approved&perPage=${pageOptions.current}&perLimit=${pageOptions.page}&name=${pageOptions["basic_info.name"]}`
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
      modelName: "Member",
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
      await deleteApi("member", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Delete request forwaded!");
            fetchData();
          }
        })
        .catch((err) => toast.error("Failed to delete the member."));

      setSubmit((prev) => ({
        ...prev,
        del: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions["basic_info.name"]]);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.addLegislativeMember} className="addpagess">
            <img src={add} alt="add" />
            Add Legislative Member
          </Link>
          <h4 className="page-title">• View All Legislative Members</h4>
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
                "basic_info.name": data,
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
                      <th>Sr No.</th>
                      <th>Name</th>
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
                            <h4>
                              {pageOptions.current * pageOptions.page + index + 1}
                            </h4>
                          </td>
                          <td>
                            {item.basic_info.name +
                              " " +
                              item.basic_info.surname}
                          </td>
                          <td>
                            <Link to={`${paths.viewMemberProfile}/${item._id}`}>
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
                            <Link to={`${removeTailingId(paths.editLegislativeMember)}/${item._id}`}>
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

export default ViewAllLegislativeMember;
