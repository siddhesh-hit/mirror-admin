import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import retrieve from "assets/retrieve.svg";
import back from "assets/back.svg";

import { getApi, postApi } from "services/axiosInterceptors";
import { newPageName } from "data/fileName";
import { toast } from "react-toastify";
import { formatEnUsDateTime } from "lib/dateEnUsFormat";

const ViewWorkflowHistory = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Approved");
  const [isSubmitted, setSubmit] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    modelName: "",
  });
  const roleOpt = ["Create", "Update", "Delete"];

  const navigate = useNavigate();

  const handleRetrieve = async (id) => {
    if (isSubmitted) return;

    setSubmit(true);
    await postApi("/reset/retrieve", { id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // navigate('/')
        }
      })
      .catch((err) => toast.error(err));
    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApi(
        status === "Approved"
          ? `reset?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&action=${role}&modelName=${pageOptions.modelName}`
          : `pending?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&status=Rejected&action=${role}&modelName=${pageOptions.modelName}`
      )
        .then((res) => {
          setData(res.data.data);
          setPageOptions((prev) => ({ ...prev, count: res.data.count }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [
    role,
    pageOptions.page,
    pageOptions.current,
    pageOptions.modelName,
    status,
  ]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllWorkflow" className="addpagess pl-4">
          <img src={back} style={{ width: "25px" }} alt="back" />
          Go back
        </Link>

        <OverlayTrigger
          delay={{ hide: 450, show: 300 }}
          overlay={(props) => <Tooltip {...props}>Select a role type.</Tooltip>}
          placement="top"
        >
          <select
            style={{
              float: "right",
              height: "30px",
              backgroundColor: "#ffffff",
              border: "1px solid #ffffff",
              borderRadius: "5px",
            }}
            defaultValue={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option hidden>Select a role type</option>
            <option value={""}>ALL</option>
            {roleOpt.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </OverlayTrigger>

        <h4 className="page-title">• View Workflow History</h4>

        <select
          style={{
            // float: "right",
            height: "30px",
            backgroundColor: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "5px",
          }}
          defaultValue={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option hidden>Select a status</option>
          <option value={"Approved"}>Approved</option>
          <option value={"Rejected"}>Rejected</option>
        </select>
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
              modelName: data,
            }))
          }
          searchQuery="the ModelName"
        />
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Performed On</th>
                    <th>Action</th>
                    <th>ModelName</th>
                    {/* <th>ModelId</th> */}
                    <th>View</th>
                    <th>Reset</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.map((item, index) => (
                      <tr key={index}>
                        <td>{formatEnUsDateTime(item?.createdAt)}</td>
                        <td>{item.action}</td>
                        <td>{item.modelName}</td>
                        {/* <td>{item.modelId}</td> */}
                        <td>
                          <Link
                            to={`/${newPageName[item?.modelName]}?id=${item._id
                              }&pending=update&history=${status === "Approved"}`}
                          >
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>View the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-eye"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                        <td>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Retrieve the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <button onClick={() => handleRetrieve(item._id)}>
                              {/* <img src={retrieve} alt="retrieve" width="15px" /> */}
                              Retrieve
                            </button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
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

export default ViewWorkflowHistory;
