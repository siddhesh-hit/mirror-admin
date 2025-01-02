import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "assets/back.svg";

import { postApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const AddSessionField = () => {
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    marathi: {
      name: "",
    },
    english: {
      name: "",
    },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    let [lang, field] = name.split(".");

    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setSubmit(true);
    await postApi("sessionField", data)
      .then((res) => {
        if (res.data.success) {
          navigate(paths.viewSessionField);
          toast.success("Session Field created!");
        }
      })
      .catch((err) => console.log(err));
    setSubmit(false);
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewSessionField}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Add Session Field</h4>
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
                          Add Session Field :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="marathi.name"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Marathi Session Field"
                          />
                          <input
                            type="text"
                            name="english.name"
                            onChange={handleChange}
                            className="form-control mt-3"
                            placeholder="Enter English Session Field"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="submit123 mt-5">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSessionField;
