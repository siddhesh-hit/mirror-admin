import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import back from "assets/back.svg";

import { formatDateForInput } from "lib/dateEnUsFormat";
import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const EditAssembly = () => {
  const [data, setData] = useState({});
  const [updatedField, setUpdatedField] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("assembly", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!data.assembly_number) {
      alert("Please select Assembly Number");
      return;
    }

    if (!data.assembly_name) {
      alert("Please select Assembly Name");
      return;
    }

    if (!data.start_date || !data.end_date) {
      alert("Please select both date");
      return;
    }

    if (isSubmitted) return;
    setSubmit(true);

    await putApi("assembly", id, data)
      .then((res) => {
        if (res.data.success) {
          let message = "";
          updatedField.map((ele, index, array) =>
            index === array.length - 1
              ? (message += `${ele.replace(/_/g, " ").toUpperCase()}`)
              : (message += `${ele.replace(/_/g, " ").toUpperCase()}, `)
          );

          toast.success(`${message ? message : "Assembly"} updated.`);
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

  useEffect(() => {
    fetchData();
  }, []);

  console.log(
    formatDateForInput(data?.start_date),
    formatDateForInput(data?.end_date)
  );

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAssembly} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Assembly</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && (
                <form className="form-horizontal border_names">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit Assembly Number :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            name="assembly_number"
                            defaultValue={data.assembly_number}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Assembly Number"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit Assembly :
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            type="text"
                            name="assembly_name"
                            defaultValue={data.assembly_name}
                            onChange={handleChange}
                            style={{ height: "auto !important" }}
                            className="form-control mb-3"
                            placeholder="Enter Assembly"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit Start Date :
                        </label>
                        <div className="col-sm-9">
                          <DatePicker
                            name="start_date"
                            label="Select Start Date"
                            value={dayjs(data?.start_date)}
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
                        </div>
                      </div>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit End Date :
                        </label>
                        <div className="col-sm-9">
                          <DatePicker
                            name="end_date"
                            label="Select End Date"
                            value={dayjs(data?.end_date)}
                            onChange={(date) => {
                              setData((prev) => ({
                                ...prev,
                                end_date: date.format(),
                              }));
                            }}
                            format="DD/MM/YYYY"
                            minDate={
                              data.end_date
                                ? dayjs(
                                  new Date(data.end_date)
                                    .toISOString()
                                    .split("T")[0]
                                )
                                : dayjs("1937-01-01")
                            }
                            maxDate={dayjs(
                              new Date().toISOString().split("T")[0]
                            )}
                            className={`form-control mb-3 `}
                          />
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

export default EditAssembly;
