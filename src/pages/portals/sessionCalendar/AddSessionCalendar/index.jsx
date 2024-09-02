import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";
import back from "assets/back.svg";

import { getApi, postApi } from "services/axiosInterceptors";

const AddSessionCalendar = () => {
  const [divCount, setDivCount] = useState(1);
  const [option, setOption] = useState({
    year: [],
    session: [],
  });
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    session: "",
    topic_name: "",
    houses: "",
    year: "",
    from_date: "",
    to_date: "",
    documents: [
      {
        title: "",
        date: "",
        document: "",
      },
    ],
  });

  const navigate = useNavigate();

  const addDocument = () => {
    let newDoc = {
      title: "",
      date: "",
      document: "",
    };

    setData((prev) => ({
      ...prev,
      documents: [...prev.documents, newDoc],
    }));

    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDocument = (index) => {
    if (divCount > 1) {
      let list = [...data.documents];
      list.splice(index, 1);
      setData((prev) => ({
        ...prev,
        documents: list,
      }));
      setDivCount(divCount - 1);
    }
    alert("You've removed one field");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [field, lang, index] = name.split(".");

    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (index) {
      if (files) {
        if (files[0]?.type.startsWith("application/pdf")) {
          if (files[0].size > maxAllowedSize) {
            alert("Upload the file of size less than 2MB.");
          } else {
            setData((prev) => ({
              ...prev,
              [field]: [
                ...prev[field].map((item, ind) => {
                  // console.log(+index === ind);
                  return ind === +index ? { ...item, [lang]: files[0] } : item;
                }),
              ],
            }));
          }
        } else {
          alert("Only upload PDF format files!");
        }
      } else {
        setData((prev) => ({
          ...prev,
          [field]: [
            ...prev[field].map((item, ind) => {
              return ind === +index ? { ...item, [lang]: value } : item;
            }),
          ],
        }));
      }
    } else {
      setData((data) => ({
        ...data,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    data.documents.forEach((ele) => {
      formData.append("document", ele.document);
    });

    await postApi("session", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Session added successfully.");
          setTimeout(() => {
            navigate("/ViewAllCalendar");
          }, 1100);
        }
      })
      .catch((err) => toast.error("Failed to add session."));

    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApi("sessionField")
        .then((res) => {
          if (res.data.success) {
            setOption((prev) => ({ ...prev, session: res.data.data }));
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  useMemo(() => {
    let current = new Date().getFullYear();

    let years = [];
    for (let i = 1937; i < current; i++) {
      years.push(i);
    }

    setOption((prev) => ({ ...prev, year: years }));
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllCalendar" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Session Calendar </h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal border_names">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Select Session :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2"
                        name="session"
                        onChange={handleChange}
                      >
                        <option hidden>Select Session</option>
                        {option.session?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Topic Name :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="topic_name"
                        value={data.topic_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Add Topic Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Select Houses :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2"
                        name="houses"
                        value={data.houses}
                        onChange={handleChange}
                      >
                        <option>Select Houses</option>
                        <option value={"विधानसभा"}>विधानसभा</option>
                        <option value={"विधानपरिषद"}>विधानपरिषद</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Select Year :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2"
                        name="year"
                        value={data.year}
                        onChange={handleChange}
                      >
                        <option hidden>Select Year</option>
                        {option.year.length > 0 ? (
                          <>
                            {option.year.map((item, index) => (
                              <option key={index}>{item}</option>
                            ))}
                          </>
                        ) : (
                          <option hidden>Select Year</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Select From Date:
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        name="from_date"
                        label="Select From Date"
                        defaultValue={dayjs("")}
                        onChange={(date) => {
                          setData((prev) => ({
                            ...prev,
                            from_date: date.format(),
                          }));
                        }}
                        format="DD/MM/YYYY"
                        minDate={dayjs("1937-01-01")}
                        maxDate={dayjs(new Date().toISOString().split("T")[0])}
                        className={`form-control mb-3 `}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Select To Date :
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        name="to_date"
                        label="Select To Date"
                        defaultValue={dayjs("")}
                        onChange={(date) => {
                          setData((prev) => ({
                            ...prev,
                            to_date: date.format(),
                          }));
                        }}
                        format="DD/MM/YYYY"
                        minDate={
                          data.from_date
                            ? dayjs(
                              new Date(data.from_date)
                                .toISOString()
                                .split("T")[0]
                            )
                            : dayjs("1937-01-01")
                        }
                        maxDate={dayjs(new Date().toISOString().split("T")[0])}
                        className={`form-control mb-3 `}
                      />
                    </div>
                  </div>

                  {[...Array(divCount)].map((_, index) => (
                    <div key={index} className="form-group ">
                      <div className="row pb-3">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          Add Document {index + 1} :
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            name={`documents.title.${index}`}
                            // value={data.documents[index].title}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Add Title"
                          />
                        </div>
                        <div className="col-sm-4">
                          <DatePicker
                            name={`documents.date.${index}`}
                            label="Select your Date"
                            defaultValue={dayjs("")}
                            onChange={(date) => {
                              setData((prev) => {
                                const documents = [...prev.documents];
                                documents[index] = {
                                  ...documents[index],
                                  date: date.format(),
                                };

                                return documents;
                              });
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
                      <div className="row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-3 col-form-label"
                        ></label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              accept="application/pdf"
                              name={`documents.document.${index}`}
                              onChange={handleChange}
                              title={
                                data.documents[index].document
                                  ? data.documents[index].document.name ||
                                  "Please choose a file"
                                  : "Please choose a file"
                              }
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Document -{" "}
                              {data.documents[index].document
                                ? data.documents[index].document.name
                                : ""}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            *Only upload PDF format files
                          </p>
                        </div>
                      </div>
                      {index === 0 && (
                        <div
                          onClick={addDocument}
                          className="addSubButton mt-4 mb-4"
                        >
                          <img
                            src={addwhite}
                            // style={{ height: "25px", width: "25px" }}
                            alt="Add"
                          />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeDocument(index)}
                          className="addSubButton mt-4 mb-4"
                        >
                          <img src={remove} alt="Remove" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </form>
              <button className="submit123 mt-5" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSessionCalendar;
