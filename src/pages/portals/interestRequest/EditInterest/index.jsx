import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getApiById, putApi } from "services/axiosInterceptors";
import { toast } from "react-toastify";
import { paths } from "services/paths";

const EditInterest = () => {
  const [data, setData] = useState({});
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("interest", id)
      .then((res) => {
        setData(res.data.data);
        setIsToggled(res.data.data.isActive);
      })
      .catch((err) => console.log(err));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await putApi("interest", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Interest updated successfully!");
          setTimeout(() => {
            navigate(`${paths.viewInterest}?id=${id}`);
          }, 1110);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Edit Interest</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="border_name">
                <form className="form-horizontal">
                  <React.Fragment>
                    <div className="card-body"></div>
                  </React.Fragment>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        *Edit Active :
                      </label>
                      <div className="col-sm-8">
                        <div
                          className={`toggle-button ${isToggled ? "active" : ""
                            }`}
                          onClick={handleToggle}
                        >
                          <div
                            className={`slider ${isToggled ? "active" : ""}`}
                          />
                          <div className="button-text">
                            {isToggled ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <button className="submit123 mt-5" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInterest;
