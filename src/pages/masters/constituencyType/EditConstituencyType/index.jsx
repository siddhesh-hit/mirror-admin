import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";

import back from "assets/back.svg";
import { getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditConstituencyTypes = () => {
  const [data, setData] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("constituencytypes", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

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

  console.log(data);

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await putApi("constituencytypes", id, data)
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Updated ConstituencyTypes");
          setTimeout(() => {
            navigate(paths.viewConstituencyType);
          }, 1100);
        } else {
          console.log("error", res);
        }
      })
      .catch((err) => {
        console.log(err);
        // if(err.response && err.response.data && err.response.data.message){
        //   toast.error(err.response.data.message);
        // }
      });
    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log({ data });

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewConstituencyType} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Constituency Type</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && data.marathi && data.english && (
                <form className="form-horizontal border_names">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit ConstituencyTypes Full Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english.name"
                            defaultValue={data.english.name}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter ConstituencyTypes Full Name"
                          />
                          <input
                            type="text"
                            name="marathi.name"
                            defaultValue={data.marathi.name}
                            onChange={handleChange}
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
                          *Edit Short name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english.short_name"
                            defaultValue={data.english.short_name}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Short name"
                          />
                          <input
                            type="text"
                            name="marathi.short_name"
                            defaultValue={data.marathi.short_name}
                            onChange={handleChange}
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
                              checked={
                                data.isHouse === "Assembly" ? true : false
                              }
                              onChange={(e) => handleChange(e)}
                            />
                            <Form.Check
                              reverse
                              label="Council"
                              name="isHouse"
                              value={"Council"}
                              checked={
                                data.isHouse === "Council" ? true : false
                              }
                              type={"radio"}
                              onChange={(e) => handleChange(e)}
                            />
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
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

export default EditConstituencyTypes;
