import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import add from "assets/add.svg";

import { getApiById } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewWorkflow = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("pending", id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        {/* <Link to="/AddFaq" className="addpagess">
          <img src={add} alt="add" />
          Add Pending
        </Link> */}
        <h4 className="page-title">• View Workflow</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>ModelName</th>
                    <th>ModelId</th>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>{data.modelName}</td>
                      <td>{data.modelId}</td>
                      <td>{new Date(data.createdAt).toLocaleString()}</td>
                      <td>{data.action}</td>
                      <td>
                        <Link
                          to={`${paths.editWorkflow}?id=${data._id}&action=${data.action}`}
                        >
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
                    </tr>
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

export default ViewWorkflow;
