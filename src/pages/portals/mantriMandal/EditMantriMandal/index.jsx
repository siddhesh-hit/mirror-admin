import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import back from "assets/back.svg";

import {
  getApi,
  getApiById,
  putApi,
} from "services/axios";
import { formatDateForInput, isValidDate } from "lib/dateEnUsFormat";
import { paths } from "services/paths";

const EditMantriMandal = () => {
  const [data, setData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const [options, setOptions] = useState({
    ministry: [],
    assembly: [],
    member: [],
    designation: [],
    presiding: [],
    legislative_position: [],
  });

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

  const [defaultOption, setDefaultOption] = useState({
    desOpt: [],
    presOpt: [],
    lpOpt: [],
    minisOpt: [],
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) return;
    setSubmit(true);

    data.designation = data.designation.map((item) => item.value);
    data.presiding = data.presiding.map((item) => item.value);
    data.legislative_position = data.legislative_position.map((item) => item.value);
    data.ministry_type = data.ministry_type.map((item) => item.value);

    data.assembly_number = data.assembly_number._id;
    data.member_name = data.member_name._id;
    data.ministry_type = data.ministry_type._id;

    await putApi("minister", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Ministry updated request forwaded!");
          setTimeout(() => {
            navigate(paths.viewAllMantriMandal);
          }, 1100);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });

    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApiById("minister", id)
        .then((res) => {
          setData(res.data.data);

          setDefaultOption((prev) => ({
            ...prev,
            desOpt: res?.data?.data?.designation.map((item) => {
              let data = {
                value: item._id,
                label: item.name,
              };
              return data;
            }),
            presOpt: res?.data?.data?.presiding.map((item) => {
              let data = {
                value: item._id,
                label: item.name,
              };
              return data;
            }),
            lpOpt: res?.data?.data?.legislative_position.map((item) => {
              let data = {
                value: item._id,
                label: item.name,
              };
              return data;
            }),
            minisOpt: res?.data?.data?.ministry_type.map((item) => {
              let data = {
                value: item._id,
                label: item.ministry_name,
              };
              return data;
            }),
          }));
          setIsToggled(res.data.data.isActive);
        })
        .catch((err) => {
          console.log(err);
        });

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
    if (data?.assembly_number) {
      const fetchData = async () => {
        await getApi(
          `member/all?status=Approved&basic_info.house=Assembly&basic_info.assembly_number=${data.assembly_number?._id}`
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
    }
  }, [data.assembly_number]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllMantriMandal} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit MantriMandal</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form
                onSubmit={handleSubmit}
                className="form-horizontal border_names"
              >
                {data && (
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Edit Assembly Number :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="assembly_number"
                          value={data?.assembly_number?._id}
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
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Edit Member Name :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="member_name"
                          value={data?.member_name?._id}
                          onChange={handleChange}
                        >
                          <option hidden>Select Member name</option>
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
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Edit Ministry Type :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          value={defaultOption.minisOpt}
                          name="ministry_type"
                          options={minisOpt}
                          onChange={(e) => {
                            setData((prev) => ({
                              ...prev,
                              ministry_type: e,
                            }))
                            console.log(e, data.ministry_type, "e")
                          }
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
                        Edit Designation :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          value={defaultOption.desOpt}
                          name="designation"
                          options={desOpt}
                          onChange={(e) =>
                            setData((prev) => ({
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
                        Edit Designation Year :
                      </label>
                      <div className="col-sm-4">
                        <DatePicker
                          name="des_from"
                          label="Select your Designation from"
                          value={dayjs(data?.des_from)}
                          onChange={(date) => {
                            setData((prev) => ({
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
                          value={dayjs(data?.des_to)}
                          onChange={(date) => {
                            setData((prev) => ({
                              ...prev,
                              des_to: date.format(),
                            }));
                          }}
                          format="DD/MM/YYYY"
                          minDate={
                            data.des_from && isValidDate(data.des_from)
                              ? dayjs(
                                new Date(data.des_from)
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
                        Edit Presiding Officer :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          value={defaultOption.presOpt}
                          name="presiding"
                          options={presOpt}
                          onChange={(e) =>
                            setData((prev) => ({
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
                        Edit Presiding Officer Year :
                      </label>
                      <div className="col-sm-4">
                        <DatePicker
                          name="pres_from"
                          label="Select your Presiding from"
                          value={dayjs(data?.pres_from)}
                          onChange={(date) => {
                            setData((prev) => ({
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
                          value={dayjs(data?.pres_to)}
                          onChange={(date) => {
                            setData((prev) => ({
                              ...prev,
                              pres_to: date.format(),
                            }));
                          }}
                          format="DD/MM/YYYY"
                          minDate={
                            data.pres_from && isValidDate(data.pres_from)
                              ? dayjs(
                                new Date(data.pres_from)
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
                        Edit Legislative Position :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          name="legislative_position"
                          value={defaultOption.lpOpt}
                          options={lpOpt}
                          onChange={(e) =>
                            setData((prev) => ({
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
                        Edit legislative Position Year :
                      </label>
                      <div className="col-sm-4">
                        <DatePicker
                          name="lp_from"
                          label="Select your Legislation Position from"
                          value={dayjs(data?.lp_from)}
                          onChange={(date) => {
                            setData((prev) => ({
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
                          value={dayjs(data?.lp_to)}
                          onChange={(date) => {
                            setData((prev) => ({
                              ...prev,
                              lp_to: date.format(),
                            }));
                          }}
                          format="DD/MM/YYYY"
                          minDate={
                            data.lp_from && isValidDate(data.lp_from)
                              ? dayjs(
                                new Date(data.lp_from)
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
                        Edit Status :
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
                    <button className="submit123 mt-5">Submit</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditMantriMandal;
