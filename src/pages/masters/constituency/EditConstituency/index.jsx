import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import back from "assets/back.svg";

import { getApi, getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditConstituency = () => {
  const [data, setData] = useState({});
  const [updatedField, setUpdatedField] = useState([]);
  const [isToggled, setIsToggled] = useState(true);
  const [assembly, setAssembly] = useState([]);
  const [constituencytypes, setConstituencyTypes] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [state, setState] = useState({
    assembly: true,
    council: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("constituency", id)
      .then((res) => {
        setData(res.data.data);
        if (res.data.data.isHouse === "Council") {
          setIsToggled(false);
          setState((prev) => ({
            ...prev,
            assembly: false,
            council: true,
          }));
        }
      })
      .catch((err) => console.log(err));

    await getApi("assembly")
      .then((res) => {
        if (res.data.success) {
          setAssembly(res.data.data);
        }
      })
      .catch((err) => console.log(err));

    await getApi("constituencytypes")
      .then((res) => {
        if (res.data.success) {
          setConstituencyTypes(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setState((prev) => ({
      ...prev,
      assembly: !prev.assembly,
      council: !prev.council,
    }));
    setData((prev) => ({
      ...prev,
      assembly: {
        constituency_name: "",
        assembly_number: "",
        constituency_type: "",
        year: "",
      },
      council: {
        constituency_name: "",
        constituency_number: "",
        constituency_type: "",
        year: "",
      },
      isHouse: !state.assembly ? "Assembly" : "Council",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");

    setData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleDateChange = (e, name) => {
    if (name === "assembly") {
      setData((prev) => ({
        ...prev,
        assembly: {
          ...prev.assembly,
          year: e,
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        council: {
          ...prev.council,
          year: e,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await putApi("constituency", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success(`Constituency updated.`);
          setTimeout(() => {
            navigate(paths.viewConstituency);
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

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewConstituency} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Constituency</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <div className="card-body">
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Select constituency type :
                  </label>
                  <div className="col-sm-8">
                    <div
                      className={`toggle-button ${isToggled ? "active" : ""}`}
                      onClick={handleToggle}
                    >
                      <div className={`slider ${isToggled ? "active" : ""}`} />
                      <div className="button-text">
                        {isToggled ? "Assembly" : "Council"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form className="form-horizontal">
                {data && (
                  <>
                    <div className="card-body">
                      <div className="formada border_names">
                        {state.assembly && (
                          <>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Constituency Name :
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  name={`assembly.constituency_name`}
                                  onChange={handleChange}
                                  defaultValue={
                                    data?.assembly?.constituency_name
                                  }
                                  className="form-control mb-3"
                                  placeholder="Enter Constitution Name"
                                />
                              </div>
                            </div>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Assembly Number :
                              </label>
                              <div className="col-sm-9">
                                <select
                                  name={`assembly.assembly_number`}
                                  onChange={handleChange}
                                  value={data?.assembly?.assembly_number}
                                  className="form-control mb-3"
                                >
                                  <option hidden>Select Assembly</option>
                                  {assembly?.map((item, index) => (
                                    <option key={index} value={item._id}>
                                      {item.assembly_number}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Constituency Type :
                              </label>
                              <div className="col-sm-9">
                                <select
                                  className="form-control mb-3"
                                  name={`assembly.constituency_type`}
                                  onChange={handleChange}
                                  value={data?.assembly?.constituency_type}
                                >
                                  <option hidden>
                                    Select Constituency Type
                                  </option>
                                  {constituencytypes?.map((item, index) => (
                                    <option key={index} value={item._id}>
                                      {item.english.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Year :
                              </label>
                              <div className="col-sm-9">
                                <DatePicker
                                  placeholderText="Select year"
                                  selected={data?.assembly?.year}
                                  showYearPicker
                                  dateFormat={"yyyy"}
                                  onChange={(e) =>
                                    handleDateChange(e, "assembly")
                                  }
                                  className="form-control"
                                  minDate={new Date("02-01-1936")}
                                  maxDate={new Date()}
                                  name="assembly.year"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {state.council && (
                          <>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Constituency name :
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  name={`council.constituency_name`}
                                  onChange={handleChange}
                                  defaultValue={
                                    data?.council?.constituency_name
                                  }
                                  className="form-control mb-3"
                                  placeholder="Enter Constituency name"
                                />
                              </div>
                            </div>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Constituency Sub type :
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  name={`council.constituency_subtype`}
                                  onChange={handleChange}
                                  defaultValue={
                                    data?.council?.constituency_subtype
                                  }
                                  className="form-control mb-3"
                                  placeholder="Enter Constituency Sub type"
                                />
                                {/* <input
                                  type="text"
                                  name={`council.constituency_type`}
                                  onChange={handleChange}
                                  defaultValue={
                                    data?.council?.constituency_type
                                  }
                                  className="form-control mb-3"
                                  placeholder="Enter Constitution type"
                                /> */}
                              </div>
                            </div>
                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Constituency type :
                              </label>
                              <div className="col-sm-9">
                                <div className="col-sm-9">
                                  <select
                                    className="form-control mb-3"
                                    name={`council.constituency_type`}
                                    onChange={handleChange}
                                    value={data?.council?.constituency_type}
                                  >
                                    <option hidden>
                                      Select Constituency Type
                                    </option>
                                    {constituencytypes?.map((item, index) => (
                                      <option key={index} value={item._id}>
                                        {item.english.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group row mb-5">
                              <label
                                htmlFor="inputPassword3"
                                className="col-sm-3 col-form-label"
                              >
                                *Edit Year :
                              </label>
                              <div className="col-sm-9">
                                <DatePicker
                                  placeholderText="Select year"
                                  selected={data?.council?.year}
                                  showYearPicker
                                  dateFormat={"yyyy"}
                                  onChange={(e) =>
                                    handleDateChange(e, "council")
                                  }
                                  className="form-control"
                                  minDate={new Date("02-01-1936")}
                                  maxDate={new Date()}
                                  name="council.year"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
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

export default EditConstituency;
