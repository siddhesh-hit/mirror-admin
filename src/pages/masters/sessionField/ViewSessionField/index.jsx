import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import add from "assets/add.svg";

import { deleteApi, getApi } from "services/axiosInterceptors";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewSessionField = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi("sessionField")
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

      await deleteApi("sessionField", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the session field.");
            setTimeout(() => {
              navigate(paths.viewSessionField);
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the session field.");
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
        <Link to={paths.addSessionField} className="addpagess">
          <img src={add} alt="add" />
          Add Session Field
        </Link>

        <h4 className="page-title">• View Session Field</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Name (MR)</th>
                    <th>Name (EN)</th>
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
                            <h4>{item?.marathi?.name}</h4>
                          </td>
                          <td>
                            <h4>{item?.english?.name}</h4>
                          </td>
                          <td>
                            <Link to={`${removeTailingId(paths.editSessionField)}/${item._id}`}>
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

export default ViewSessionField;
