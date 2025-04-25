import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import back from "assets/back.svg";
import remove from "assets/remove.svg";
import addwhite from "assets/addwhite.svg";
import { postApi } from "services/axios";
import { paths } from "services/paths";

const AddConstituencyTypes = () => {
  const [divCount, setDivCount] = useState(1);
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    marathi: {
      name: "",
      short_name: "",
    },
    english: {
      name: "",
      short_name: "",
    },
    isHouse: "Assembly",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "english.name" || name === "english.short_name") {
      data.english[name.split(".")[1]] = value;
    } else if (name === "marathi.name" || name === "marathi.short_name") {
      data.marathi[name.split(".")[1]] = value;
    } else if (name == "isHouse") {
      data.isHouse = value;
    }
    setData({ ...data });
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await postApi("constituencytypes", data)
      .then((res) => {
        console.log("res", res);
        if (res && res.data && res.data.success) {
          toast.success("Added Constituency Types");
          setTimeout(() => {
            navigate(paths.viewConstituencyType);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log({ err });
      });

    setSubmit(false);
  };
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewConstituencyType} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Constituency Types</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    <div className="form-group row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Constituency Types Full Name :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.name"
                          onChange={(e) => handleChange(e)}
                          className="form-control mb-3"
                          placeholder="Enter Party Full Name"
                        />
                        <input
                          type="text"
                          name="marathi.name"
                          onChange={(e) => handleChange(e)}
                          className="form-control mb-3"
                          placeholder="पक्षाचे पूर्ण नाव प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Short name :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.short_name"
                          onChange={(e) => handleChange(e)}
                          className="form-control mb-3"
                          placeholder="Enter Short name"
                        />
                        <input
                          type="text"
                          name="marathi.short_name"
                          onChange={(e) => handleChange(e)}
                          className="form-control mb-3"
                          placeholder="लहान नाव प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *House :
                      </label>
                      <div className="col-sm-9">
                        <Form>
                          <Form.Check
                            reverse
                            label="Assembly"
                            name="isHouse"
                            value={"Assembly"}
                            type={"radio"}
                            checked={data.isHouse === "Assembly" ? true : false}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Check
                            reverse
                            label="Council"
                            name="isHouse"
                            value={"Council"}
                            checked={data.isHouse === "Council" ? true : false}
                            type={"radio"}
                            onChange={(e) => handleChange(e)}
                          />
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-4" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddConstituencyTypes;
