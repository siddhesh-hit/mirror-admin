import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";

import { deleteApi, getApi } from "services/axiosInterceptors";

const ViewDistrict = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    "marathi.district": "",
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi(
      `district?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&marathi.district=${pageOptions["marathi.district"]}`
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
      // console.log("cehck");

      if (isSubmitted) return;
      setSubmit(true);

      await deleteApi("district", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the district.");
            setTimeout(() => {
              navigate("/ViewDistrict");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the district.");
        });

      setSubmit(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions["marathi.district"]]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddDistrict" className="addpagess">
          <img src={add} alt="add" />
          Add District
        </Link>

        <h4 className="page-title">• View District</h4>
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
              "marathi.district": data,
            }))
          }
          searchQuery="the District"
        />
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>District Name</th>
                    <th>District Name (Marathi)</th>
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
                            <h4>{item.marathi.district}</h4>
                          </td>
                          <td>
                            <h4>{item.english.district}</h4>
                          </td>
                          <td>
                            <Link to={`/EditDistrict?id=${item._id}`}>
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

export default ViewDistrict;
