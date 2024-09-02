import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import back from "assets/back.svg";

import { getApi, postApi } from "services/axiosInterceptors";

const AddMantriMandal = () => {
  const [minister, setMinister] = useState({
    assembly_number: "",
    member_name: "",
    ministry_type: [],
    designation: [],
    des_from: "",
    des_to: "",
    presiding: [],
    pres_from: "",
    pres_to: "",
    legislative_position: [],
    lp_from: "",
    lp_to: "",
  });

  const [options, setOptions] = useState({
    ministry: [],
    assembly: [],
    member: [],
    designation: [],
    presiding: [],
    legislative_position: [],
  });
  const [isSubmitted, setSubmit] = useState(false);

  const desOpt = options?.designation?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });
  const presOpt = options?.presiding?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });
  const lpOpt = options?.legislative_position?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });
  const minisOpt = options?.ministry?.map((item) => {
    let data = {
      value: item._id,
      label: item.ministry_name,
    };
    return data;
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) return;
    setSubmit(true);

    minister.designation = minister.designation.map((item) => item.value);
    minister.presiding = minister.presiding.map((item) => item.value);
    minister.legislative_position = minister.legislative_position.map(
      (item) => item.value
    );
    minister.ministry_type = minister.ministry_type.map((item) => item.value);

    await postApi("minister", minister)
      .then((res) => {
        if (res.data.success) {
          toast.success("Minister create request forwaded!");
          navigate("/ViewAllMantriMandal");
        }
      })
      .catch((err) => console.log(err));

    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApi("ministry/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              ministry: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("assembly/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              assembly: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("designation/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              designation: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("officer/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              presiding: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("position/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              legislative_position: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getApi(
        `member/all?status=Approved&basic_info.house=Assembly&basic_info.assembly_number=${minister.assembly_number}`
      )
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              member: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [minister.assembly_number]);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to="/ViewAllMantriMandal" className="addpagess">
            <img src={back} style={{ width: "25px" }} alt="add" />
            Go back
          </Link>
          <h4 className="page-title">• Add Mantrimandal</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form onSubmit={handleSubmit} className="form-horizontal">
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Assembly Number :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="assembly_number"
                            value={minister.assembly_number}
                            onChange={handleChange}
                          >
                            <option hidden>Select Assembly Number</option>
                            {options.assembly.map((item, index) => (
                              <option key={index} value={item._id}>
                                {item.assembly_number}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Member Name :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="member_name"
                            value={minister.member_name}
                            onChange={handleChange}
                          >
                            <option hidden>Select Member Name</option>
                            {options.member.map((item, index) => (
                              <option key={index} value={item._id}>
                                {item.basic_info.surname +
                                  " " +
                                  item.basic_info.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Ministry Type :
                        </label>
                        <div className="col-sm-8">
                          <Select
                            isMulti
                            name="ministry_type"
                            options={minisOpt}
                            onChange={(e) =>
                              setMinister((prev) => ({
                                ...prev,
                                ministry_type: e,
                              }))
                            }
                            className=""
                            classNamePrefix="select"
                            placeholder="Select Ministry Type"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Designation :
                        </label>
                        <div className="col-sm-8">
                          <Select
                            isMulti
                            name="designation"
                            options={desOpt}
                            onChange={(e) =>
                              setMinister((prev) => ({
                                ...prev,
                                designation: e,
                              }))
                            }
                            className=""
                            classNamePrefix="select"
                            placeholder="Select Designation"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Designation Year :
                        </label>
                        <div className="col-sm-4">
                          <DatePicker
                            name="des_from"
                            label="Select your Designation from"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setMinister((prev) => ({
                                ...prev,
                                des_from: date.format(),
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
                        <div className="col-sm-4">
                          <DatePicker
                            name="des_to"
                            label="Select your Designation to"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setMinister((prev) => ({
                                ...prev,
                                des_to: date.format(),
                              }));
                            }}
                            format="DD/MM/YYYY"
                            minDate={
                              minister.des_from
                                ? dayjs(
                                  new Date(minister.des_from)
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
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Presiding Officer :
                        </label>
                        <div className="col-sm-8">
                          <Select
                            isMulti
                            name="presiding"
                            options={presOpt}
                            onChange={(e) =>
                              setMinister((prev) => ({
                                ...prev,
                                presiding: e,
                              }))
                            }
                            className=""
                            classNamePrefix="select"
                            placeholder="Select Presiding Officer"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Presiding Officer Year :
                        </label>
                        <div className="col-sm-4">
                          <DatePicker
                            name="pres_from"
                            label="Select your Presiding from"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setMinister((prev) => ({
                                ...prev,
                                pres_from: date.format(),
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
                        <div className="col-sm-4">
                          <DatePicker
                            name="pres_to"
                            label="Select your Presiding to"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setMinister((prev) => ({
                                ...prev,
                                pres_to: date.format(),
                              }));
                            }}
                            format="DD/MM/YYYY"
                            minDate={
                              minister.pres_from
                                ? dayjs(
                                  new Date(minister.pres_from)
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
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Legislative Position :
                        </label>
                        <div className="col-sm-8">
                          <Select
                            isMulti
                            name="legislative_position"
                            options={lpOpt}
                            onChange={(e) =>
                              setMinister((prev) => ({
                                ...prev,
                                legislative_position: e,
                              }))
                            }
                            className=""
                            classNamePrefix="select"
                            placeholder="Select Legilsative Position"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          legislative Position Year :
                        </label>
                        <div className="col-sm-4">
                          <DatePicker
                            name="lp_from"
                            label="Select your Legislation Position from"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setMinister((prev) => ({
                                ...prev,
                                lp_from: date.format(),
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
                        <div className="col-sm-4">
                          <DatePicker
                            name="lp_to"
                            label="Select your Legislation Position to"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setMinister((prev) => ({
                                ...prev,
                                lp_to: date.format(),
                              }));
                            }}
                            format="DD/MM/YYYY"
                            minDate={
                              minister.lp_from
                                ? dayjs(
                                  new Date(minister.lp_from)
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

export default AddMantriMandal;
