import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import add from "assets/back.svg";
import { getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditLegislativePosition = () => {
  const [isSubmitted, setSubmit] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("position", id)
      .then((res) => {
        setData(res.data.data.name);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) return;
    setSubmit(true);

    await putApi("position", id, { name: data })
      .then((res) => {
        if (res.data.success) {
          toast.success("Updated Position");
          setTimeout(() => {
            navigate(paths.viewLegislativePosition);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
    setSubmit(false);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewLegislativePosition}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Edit Position</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Position Name :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Designation"
                            value={data}
                            onChange={(e) => {
                              setData(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button onClick={handleSubmit} className="submit123 mt-5">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditLegislativePosition;
