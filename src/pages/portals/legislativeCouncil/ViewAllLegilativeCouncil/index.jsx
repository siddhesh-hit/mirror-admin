import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import add from "assets/add.svg";

import { deleteApi, getApi, postApi } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewAllLegislativeCouncil = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState({
    post: false,
    del: false,
  });

  const fetchData = async () => {
    await getApi("parishad?status=Approved")
      .then((res) => {
        setData(res.data.data);
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
      modelName: "VidhanParishad",
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

      await deleteApi("parishad", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Delete request forwaded!");
            fetchData();
          }
        })
        .catch((err) => toast.error("Failed to delete the parishad."));

      setSubmit((prev) => ({
        ...prev,
        del: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.addLegislativeCouncil} className="addpagess">
            <img src={add} alt="add" />
            Add Vidhan Parishad
          </Link>
          <h4 className="page-title">• View All Legislative Council</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
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
                          <td>{item.isActive ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={`${removeTailingId(paths.viewLegislativeCouncil)}/${item._id}`}>
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
                            <Link to={`${removeTailingId(paths.editLegislativeCouncil)}/${item._id}`}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllLegislativeCouncil;
