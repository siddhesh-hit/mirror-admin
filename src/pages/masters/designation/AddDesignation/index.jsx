import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import back from "assets/back.svg";

import { postApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const AddDesignation = () => {
  const [data, setData] = useState({
    name: "",
  });
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await postApi("designation", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Designation created!");
          setTimeout(() => {
            navigate(paths.viewDesignation);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmit(false);
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewDesignation}>
            <img src={back} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Add Designation</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Designation :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter Designation"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddDesignation;
