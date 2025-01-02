import { useEffect, useState } from "react";
import back from "assets/back.svg";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { API } from "lib/api";
import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewWorkflowGalleryImage = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitted, setSubmit] = useState(false);

  const configRoutes = {
    Create: "updatePost",
    Update: "updatePut",
    Delete: "updateDel",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("&")[0].split("=")[1];
  const action = location?.search?.split("&")[1]?.split("=")[1];
  const history = location?.search?.split("&")[2]?.split("=")[1];

  const fetchData = async () => {
    try {
      const baseRoute = history === "true" ? "reset" : "pending";

      const res = await getApiById(baseRoute, id);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.name);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    data.status = status;
    await putApi(`pending/${configRoutes[action]}`, id, data)
      .then((res) => {
        if (res.data.success) {
          // toast.success("Updated pending");
          toast.success(`Status ${status}!`);
          setTimeout(() => {
            navigate(paths.viewAllWorkflow);
          }, 1100);
        }
      })
      .catch((err) => console.log(err));

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <div>
        <div className="content-wrapper pt-4">
          <div className="contentofpages">
            <Link
              to={
                history === "true"
                  ? paths.viewWorkflowHistory
                  : history === "false"
                    ? paths.viewWorkflowHistory
                    : paths.viewAllWorkflow
              }
              className="addpagess"
            >
              <img src={back} style={{ width: "25px" }} alt="back" />
              Go back
            </Link>
            <h4 className="page-title">• View Workflow Gallery Image</h4>
            <div className="card card-info">
              <img
                className="mt-5 mb-5"
                style={{
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                src={
                  API.baseUrl +
                  data?.data_object?.destination +
                  "/" +
                  data?.data_object?.filename
                }
                alt="gallery"
              />
            </div>
            {history ? (
              <></>
            ) : (
              <div className="card card-info">
                <div className="row mb-4 mt-4">
                  {data?.data_object && (
                    <div className="col-lg-9 border_names">
                      <form className="form-horizontal">
                        <div className="card-body">
                          <div className="formada">
                            <div className="form-group row">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-4 col-form-label"
                              >
                                Edit Status :
                              </label>
                              <div className="col-sm-8">
                                <div className="d-flex align-items-center">
                                  <Form.Check
                                    type="radio"
                                    id="approveRadio"
                                    name="Accepted"
                                    checked={status === "Accepted"}
                                    onChange={handleChange}
                                  />
                                  <label
                                    style={{ margin: 0 }}
                                    htmlFor="approveRadio"
                                  >
                                    Approve
                                  </label>
                                </div>

                                <div className="d-flex align-items-center">
                                  <Form.Check
                                    type="radio"
                                    id="rejectRadio"
                                    name="Rejected"
                                    checked={status === "Rejected"}
                                    onChange={handleChange}
                                  />
                                  <label
                                    style={{ margin: 0 }}
                                    htmlFor="rejectRadio"
                                  >
                                    Reject
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
                <button
                  className="submit123 mt-4"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorkflowGalleryImage;
