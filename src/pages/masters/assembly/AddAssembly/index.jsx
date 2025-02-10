import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import back from "assets/back.svg";

import { postApi } from "services/axios";
import { paths } from "services/paths";

const AddAssembly = () => {
  const [error, setError] = useState({});
  const [data, setData] = useState({
    assembly_number: "",
    assembly_name: "",
    start_date: "",
    end_date: "",
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

  const handleKeyDown = (event) => {
    // Allow backspace and delete keys
    if (event.key === "Backspace" || event.key === "Delete") {
      return;
    }

    // Allow digits (0-9) and a single hyphen (-)
    const currentValue = event.target.value;
    const key = event.key;
    const allowedCharacters = /^[0-9-]$/;

    if (
      (key === "-" && currentValue.includes("-")) || // Allow only one hyphen
      !allowedCharacters.test(key)
    ) {
      event.preventDefault();
    }
  };

  // const handleSubmit = async () => {
  //   console.log(data);
  //   if (!data.assembly_number) {
  //     alert("Please select Assembly Number");
  //     return;
  //   }

  //   if (!data.assembly_name) {
  //     alert("Please select Assembly Name");
  //     return;
  //   }

  //   if (!data.start_date || !data.end_date) {
  //     alert("Please select both date");
  //     return;
  //   }
  //   if (isSubmitted) return;

  //   setSubmit(true);

  //   // await postApi("assembly", data)
  //   //   .then((res) => {
  //   //     if (res.data.success) {
  //   //       toast.success("New Assembly Added.");
  //   //       setTimeout(() => {
  //   //         navigate("/ViewAssembly");
  //   //       }, 1100);
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //     toast.error("Something went wrong!");
  //   //   });

  //   try {
  //     const res = await postApi("assembly", data);
  //     if (res.data.success) {
  //       toast.success("New Assembly Added.");
  //       setTimeout(() => {
  //         navigate("/ViewAssembly");
  //       }, 1100);
  //     } else {
  //       throw new Error("API did not return success.");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Something went wrong!");
  //     return; // Keep isSubmitted as true to prevent further submissions
  //   }

  //   setSubmit(false);
  // };

  let isSubmitting = false; // Semaphore outside of the component function

  const handleSubmit = async () => {
    if (
      !data.assembly_number ||
      !data.assembly_name ||
      !data.start_date ||
      !data.end_date
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (isSubmitting) return; // Check if already submitting

    isSubmitting = true; // Set semaphore to block new submissions

    try {
      const res = await postApi("assembly", data);
      if (res.data.success) {
        toast.success("New Assembly Added.");
        setTimeout(() => {
          navigate(paths.viewAssembly);
        }, 1100);
      } else {
        throw new Error("API did not return success.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      isSubmitting = false; // Reset semaphore whether success or fail
    }
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
                          name={`assembly_number`}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className={`form-control mb-3 ${error && error.assembly_number ? "activeError" : ""
                            }`}
                          placeholder="Enter Assembly Number"
                        />

                        {error && error.assembly_number ? (
                          <p className="red-error">{error.assembly_number}</p>
                        ) : (
                          <></>
                        )}
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
                          name={`assembly_name`}
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className={`form-control mb-3 ${error && error.assembly_name ? "activeError" : ""
                            }`}
                          placeholder="Enter Assembly"
                        />
                        {error && error.assembly_name ? (
                          <p className="red-error">{error.assembly_name}</p>
                        ) : (
                          <></>
                        )}
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
                          minDate={dayjs("1937-01-01")}
                          maxDate={dayjs(
                            new Date().toISOString().split("T")[0]
                          )}
                          className={`form-control mb-3 `}
                        />

                        {error && error.start_date ? (
                          <p className="red-error">{error.start_date}</p>
                        ) : (
                          <></>
                        )}
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
                          minDate={dayjs(
                            data.start_date
                              ? new Date(data.start_date).toISOString()
                              : ""
                          )}
                          maxDate={dayjs(
                            new Date().toISOString().split("T")[0]
                          )}
                          className={`form-control mb-3 `}
                        />

                        {error && error.end_date ? (
                          <p className="red-error">{error.end_date}</p>
                        ) : (
                          <></>
                        )}
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

export default AddAssembly;
