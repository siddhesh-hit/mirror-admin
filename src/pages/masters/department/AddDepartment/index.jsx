import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

import add from "assets/back.svg";

import { getApi, postApi } from "services/axios";
import { paths } from "services/paths";

const AddDepartment = () => {
  const [designation, setDesignation] = useState([]);
  const [data, setData] = useState({
    name: "",
    year: "",
    sub_dep: "",
    designation: "",
  });
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setSubmit(true);
    await postApi("department", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Department created!");
          setTimeout(() => {
            navigate(paths.viewDepartment);
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
    const fetchData = async () => {
      await getApi(`designation`)
        .then((res) => {
          if (res.data.success) {
            setDesignation(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={"/ViewDepartment"}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Add Department</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form
                    className="form-horizontal"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="card-body">
                      <div className="formada border_names">
                        <div className="form-group row mb-3">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Name :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="name"
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Name"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-3">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Sub Department :
                          </label>
                          <div className="col-sm-9">
                            <select
                              className="form-control"
                              name="sub_dep"
                              onChange={handleChange}
                            >
                              <option hidden>Select sub-department</option>
                              <option value={"sub-department 1"}>
                                sub-department 1
                              </option>
                              <option value={"sub-department 2"}>
                                sub-department 2
                              </option>
                              <option value={"sub-department 3"}>
                                sub-department 3
                              </option>
                              <option value={"sub-department 4"}>
                                sub-department 4
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mb-3">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Designation :
                          </label>
                          <div className="col-sm-9">
                            {designation && (
                              <select
                                className="form-control"
                                name="designation"
                                onChange={handleChange}
                              >
                                <option hidden>Select designation</option>
                                {designation?.map((item, index) => (
                                  <option key={index} value={item._id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mb-3">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Year :
                          </label>
                          <div className="col-sm-9">
                            <ReactDatePicker
                              className="form-control"
                              showYearPicker
                              selected={data?.year}
                              dateFormat="yyyy"
                              minDate={new Date("01-01-1937")}
                              maxDate={new Date()}
                              onChange={(date) =>
                                setData((prev) => ({
                                  ...prev,
                                  year: date,
                                }))
                              }
                              placeholderText="Select year"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="submit123 mt-4" type="submit">
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

export default AddDepartment;
