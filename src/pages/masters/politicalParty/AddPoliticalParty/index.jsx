import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import back from "assets/back.svg";
import remove from "assets/remove.svg";
import addwhite from "assets/addwhite.svg";

import { postApi } from "services/axiosInterceptors";

const AddPoliticalParty = () => {
  const [divCount, setDivCount] = useState(1);
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState([
    {
      marathi: {
        party_name: "",
        short_name: "",
      },
      english: {
        party_name: "",
        short_name: "",
      },
      party_flag: {},
      party_symbol: {},
      isHouse: "",
    },
  ]);

  const navigate = useNavigate();

  const addDiv = () => {
    let newData = {
      marathi: {
        party_name: "",
        short_name: "",
      },
      english: {
        party_name: "",
        short_name: "",
      },
      party_flag: {},
      party_symbol: {},
      isHouse: "",
    };
    setData([...data, newData]);
    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    let newData = [...data];

    newData.splice(index, 1);
    setData(newData);

    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
    alert("You've removed one field");
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const [field, subField] = name?.split(".");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (!files && name !== "isHouse") {
      setData((prev) => [
        ...prev.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [field]: {
                ...item[field],
                [subField]: value,
              },
            };
          }
          return item;
        }),
      ]);
    } else {
      if (files && files.length > 0) {
        if (
          files[0].type.startsWith("image/png") ||
          files[0].type.startsWith("image/jpeg") ||
          files[0].type.startsWith("image/jpg")
        ) {
          if (files[0].size > maxAllowedSize) {
            alert("Upload the file of size less than 2MB.");
          } else {
            setData((prev) => [
              ...prev.map((item, i) => {
                if (i === index) {
                  return {
                    ...item,
                    [name]: files[0],
                  };
                }
                return item;
              }),
            ]);
          }
        } else {
          alert("Only upload JPEG/JPG/PNG format assets");
        }
      }
    }

    if (name === "isHouse") {
      setData((prev) => [
        ...prev.map((item, i) => {
          if (i === +index) {
            return {
              ...item,
              [name]: value,
            };
          }
          return item;
        }),
      ]);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    data.forEach((element) => {
      formData.append("party_flag", element.party_flag);
      formData.append("party_symbol", element.party_symbol);
    });

    await postApi("party", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Added party");
          setTimeout(() => {
            navigate("/ViewPoliticalParties");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setSubmit(false);
  };

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewPoliticalParties" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Political Parties</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  {[...Array(divCount)].map((_, index) => (
                    <div className="formada border_names" key={index}>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Add Party Full Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english.party_name"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control mb-3"
                            placeholder="Enter Party Full Name"
                          />
                          <input
                            type="text"
                            name="marathi.party_name"
                            onChange={(e) => handleChange(e, index)}
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
                            onChange={(e) => handleChange(e, index)}
                            className="form-control mb-3"
                            placeholder="Enter Short name"
                          />
                          <input
                            type="text"
                            name="marathi.short_name"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control mb-3"
                            placeholder="लहान नाव प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-4">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Add Party Flag :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                data[index].party_flag.name ||
                                "Please choose a file"
                              }
                              name="party_flag"
                              accept="image/png, image/jpeg, image.jpg"
                              onChange={(e) => handleChange(e, index)}
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Party Flag - {data[index].party_flag.name || ""}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            *Only upload JPEG/JPG/PNG format assets.
                          </p>
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Add Party Symbol :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                data[index].party_symbol.name ||
                                "Please choose a file"
                              }
                              name="party_symbol"
                              accept="image/png, image/jpeg, image.jpg"
                              onChange={(e) => handleChange(e, index)}
                              className="custom-file-input"
                              id="customFile1"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile1"
                            >
                              Party Symbol -{" "}
                              {data[index].party_symbol.name || ""}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            *Only upload JPEG/JPG/PNG format assets.
                          </p>
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Add Party House :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <select
                              type="text"
                              name="isHouse"
                              onChange={(e) => handleChange(e, index)}
                              className="form-control mb-3"
                            >
                              <option hidden>Enter House</option>
                              <option value={"Assembly"}>Assembly</option>
                              <option value={"Council"}>Council</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div
                          onClick={() => addDiv()}
                          className="addSubButton mt-5"
                        >
                          <img src={addwhite} alt="white" />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeDiv(index)}
                          className="addSubButton mt-5"
                        >
                          <img
                            src={remove}
                            alt="remove"
                            style={{ height: "25px", width: "25px" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
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

export default AddPoliticalParty;