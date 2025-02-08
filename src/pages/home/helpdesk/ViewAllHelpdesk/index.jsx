import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApi, deleteApi } from "services/axiosInterceptors";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewAllHelpdesk = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    name: "",
  });

  const fetchData = async () => {
    await getApi(
      `helpdesk?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&filename=${pageOptions.name}`
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
    if (window.confirm("Are you sure you want to delete it?")) {
      if (isSubmitted) return;
      setSubmit(true);

      await deleteApi("helpdesk", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Helpdesk deleted successfully.");
            fetchData();
          }
        })
        .catch((err) => console.log(err));

      setSubmit(false);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Helpdesk</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      {/* <th>Status</th> */}
                      <th>View</th>
                      {/* <th>Edit</th>
                      <th>Delete</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>{item?.full_name}</td>
                          <td>{item?.email}</td>
                          {/* <td>{item.isActive ? "Active" : "Inactive"}</td> */}
                          <td>
                            <Link to={`${paths.viewHelpdesk}/${item._id}`}>
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
                          {/* <td>
                            <Link to={`${removeTailingId(paths.editHelpdesk)}/${item._id}`}>
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
                            <div onClick={() => handleDelete(item._id)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Delete the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-trash"></i>
                              </OverlayTrigger>
                            </div>
                          </td> */}
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

export default ViewAllHelpdesk;
