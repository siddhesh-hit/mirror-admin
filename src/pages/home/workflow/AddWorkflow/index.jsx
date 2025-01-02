import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import back from "assets/back.svg";

import { postApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const AddWorkflow = () => {
  const [data, setData] = useState({
    marathi: {
      assembly_number: "",
      assembly_name: "",
    },
    english: {
      assembly_number: "",
      assembly_name: "",
    },
    start_date: "",
    end_date: "",
  });
  const [isSubmitted, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;

    setSubmit(true);
    await postApi("pending", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("New Assembly Added.");
          setTimeout(() => {
            navigate(paths.viewAssembly);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmit(false);
  };

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAssembly} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Assembly</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9 ">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Assembly Number :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name={`english.assembly_number`}
                          onChange={handleChange}
                          className={`form-control mb-3`}
                          placeholder="Enter Assembly Number"
                        />

                        <input
                          type="text"
                          name={`marathi.assembly_number`}
                          onChange={handleChange}
                          className={`form-control mb-3`}
                          placeholder="विधानसभा क्रमांक प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Assembly Name :
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          type="text"
                          name={`english.assembly_name`}
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className={`form-control mb-3 `}
                          placeholder="Enter Assembly"
                        />

                        <textarea
                          type="text"
                          name={`marathi.assembly_name`}
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className={`form-control`}
                          placeholder="विधानसभा नाव प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Start Date :
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          name="start_date"
                          label="Select Start Date"
                          defaultValue={dayjs("")}
                          onChange={(date) => {
                            setData((prev) => ({
                              ...prev,
                              start_date: date.format(),
                            }));
                          }}
                          format="DD/MM/YYYY"
                          // minDate={dayjs("1937-01-01")}
                          // maxDate={dayjs(
                          //   new Date().toISOString().split("T")[0]
                          // )}
                          className={`form-control mb-3`}
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add End Date :
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          name="end_date"
                          label="Select End Date"
                          defaultValue={dayjs("")}
                          onChange={(date) => {
                            setData((prev) => ({
                              ...prev,
                              end_date: date.format(),
                            }));
                          }}
                          format="DD/MM/YYYY"
                          // minDate={dayjs("1937-01-01")}
                          // maxDate={dayjs(
                          //   new Date().toISOString().split("T")[0]
                          // )}
                          className={`form-control mb-3`}
                        />
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

export default AddWorkflow;
