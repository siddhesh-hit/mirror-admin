import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import add from "assets/add.svg";


import { deleteApi, getApi } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewConstituencyType = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    "marathi.name": "",
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi(
      `constituencytypes?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&marathi.name=${pageOptions["marathi.name"]}`
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
      await deleteApi("constituencytypes", id)
        .then((res) => {
          if (res.status === 204 || res.status === 200) {
            toast.success("Deleted the Constituency Types.");
            setTimeout(() => {
              navigate(paths.viewConstituencyType);
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the party.");
        });

      setSubmit(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions["marathi.name"]]);

  console.log(data);
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addConstituencyType} className="addpagess">
          <img src={add} alt="add" />
          Add Constituency Types
        </Link>

        <h4 className="page-title">• View Constituency Types</h4>
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
              "marathi.name": data,
            }))
          }
          searchQuery="the Constituency Name"
        />
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Constituency Name</th>
                    <th>Constituency Name (Marathi)</th>
                    <th>Short Name</th>
                    <th>Short Name (Marathi)</th>
                    <th>House</th>
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
                            <h4>{item.english.name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.name}</h4>
                          </td>
                          <td>
                            <h4>{item.english.short_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.short_name}</h4>
                          </td>
                          <td>
                            <h4>{item.isHouse}</h4>
                          </td>

                          <td>
                            <Link to={`${removeTailingId(paths.editConstituencyType)}/${item._id}`}>
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

export default ViewConstituencyType;
