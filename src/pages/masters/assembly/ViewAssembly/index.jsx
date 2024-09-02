import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";

import { deleteApi, getApi } from "services/axiosInterceptors";
import { formatEnUsDate } from "lib/dateEnUsFormat";

const ViewAssembly = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    assembly_name: "",
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi(
      `assembly?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&assembly_name=${pageOptions.assembly_name}`
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      console.log("check");

      if (isSubmitted) return;
      setSubmit(true);

      await deleteApi("assembly", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the assembly.");
            setTimeout(() => {
              navigate("/ViewAssembly");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the assembly.");
        });

      setSubmit(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [pageOptions.page, pageOptions.current, pageOptions.assembly_name]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddAssembly" className="addpagess">
          <img src={add} alt="add" />
          Add Assembly
        </Link>

        <h4 className="page-title">• View Assembly</h4>
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
              assembly_name: data,
            }))
          }
          searchQuery="the Assembly"
        />
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Assembly Number</th>
                    <th>Assembly Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    <>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{item.assembly_number || "-"}</h4>
                          </td>
                          <td>
                            <h4>{item.assembly_name || "-"}</h4>
                          </td>
                          <td>
                            <h4>{formatEnUsDate(item.start_date)}</h4>
                          </td>
                          <td>
                            <h4>{formatEnUsDate(item.end_date)}</h4>
                          </td>
                          <td>
                            <Link to={`/EditAssembly?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="top"
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
                        </tr>
                      ))}
                    </>
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

export default ViewAssembly;
