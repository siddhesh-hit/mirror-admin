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

const ViewPoliticalParty = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    "marathi.party_name": "",
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi(
      `party?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&marathi.party_name=${pageOptions["marathi.party_name"]}`
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

      await deleteApi("party", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the party.");
            setTimeout(() => {
              navigate(paths.viewPoliticalParty);
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
  }, [
    pageOptions.page,
    pageOptions.current,
    pageOptions["marathi.party_name"],
  ]);

  console.log(data);
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addPoliticalParty} className="addpagess">
          <img src={add} alt="add" />
          Add Political Parties
        </Link>

        <h4 className="page-title">• View Political Parties</h4>
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
              "marathi.party_name": data,
            }))
          }
          searchQuery="the party full name"
        />
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Party Full Name</th>
                    <th>Party Full Name (Marathi)</th>
                    <th>Short Name</th>
                    <th>Short Name (Marathi)</th>
                    <th>Party Flag</th>
                    <th>Party Symbol</th>
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
                            <h4>{item.english.party_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.party_name}</h4>
                          </td>
                          <td>
                            <h4>{item.english.short_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.short_name}</h4>
                          </td>
                          <td>
                            <Link
                              to={
                                process.env.REACT_APP_IMG_URL +
                                item.party_flag.destination +
                                "/" +
                                item.party_flag.filename
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the image.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={
                                process.env.REACT_APP_IMG_URL +
                                item.party_symbol.destination +
                                "/" +
                                item.party_symbol.filename
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the image.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link to={`${removeTailingId(paths.editPoliticalParty)}/${item._id}`}>
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

export default ViewPoliticalParty;