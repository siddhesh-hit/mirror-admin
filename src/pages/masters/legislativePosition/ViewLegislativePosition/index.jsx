import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import add from "assets/add.svg";

import { deleteApi, getApi } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewLegislativePosition = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi("position")
      .then((res) => {
        setData(res.data.data);
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

      await deleteApi("position", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the position.");
            setTimeout(() => {
              navigate(paths.viewLegislativePosition);
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the navigation.");
        });

      setSubmit(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addLegislativePosition} className="addpagess">
          <img src={add} alt="add" />
          Add Legislative Positions
        </Link>

        <h4 className="page-title">• View Legislative Positions</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    <>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <h4>{item.name}</h4>
                          </td>
                          <td>
                            <Link
                              to={`${removeTailingId(paths.editLegislativePosition)}/${item._id}`}
                            >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLegislativePosition;
