import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import add from "assets/add.svg";
import back from "assets/back.svg";
import remove from "assets/remove.svg";

import { postApi } from "services/axios";
import { paths } from "services/paths";

const AddNavigation = () => {
  const [divCount, setDivCount] = useState(1);
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    marathi: {
      navigation: "",
      dropDownValue: [
        {
          name: "",
        },
      ],
    },
    english: {
      navigation: "",
      dropDownValue: [
        {
          name: "",
        },
      ],
    },
    isDropDown: false,
  });

  const navigate = useNavigate();

  const addDiv = () => {
    let object = {
      name: "",
    };

    setData((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        dropDownValue: [...prev.english.dropDownValue, object],
      },
      marathi: {
        ...prev.marathi,
        dropDownValue: [...prev.marathi.dropDownValue, object],
      },
    }));

    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    let object1 = [...data.english.dropDownValue];
    let object2 = [...data.marathi.dropDownValue];

    object1.splice(index, 1);
    object2.splice(index, 1);

    setData((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        dropDownValue: object1,
      },
      marathi: {
        ...prev.marathi,
        dropDownValue: object2,
      },
    }));

    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
    alert("You've removed one field");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [lang, field, subField, index] = name.split(".");

    // console.log(lang, field, subField, index);

    if (index) {
      setData((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: prev[lang][field].map((item, ind) =>
            ind === +index
              ? {
                ...item,
                [subField]: value,
              }
              : item
          ),
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: value,
        },
      }));
    }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isDropDown: !prev.isDropDown,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    if (!data.isDropDown) {
      delete data.english.dropDownValue;
      delete data.marathi.dropDownValue;
    };

    await postApi("navigation", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Added navigation");
          setTimeout(() => {
            navigate(paths.viewNavigation);
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
        <Link to={paths.viewNavigation} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="back" />
          Go back
        </Link>
        <h4 className="page-title">• Add Navigation</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Navbar field :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.navigation"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Navbar field"
                        />
                        <input
                          type="text"
                          name="marathi.navigation"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="नवबार फील्ड प्रविष्ट करा"
                        />
                      </div>
                    </div>

                    <div className="fform-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Sub field :
                      </label>
                      <div className="col-sm-9">
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
                        <p className="photo_disclaimer mt-3">
                          *Only turn active when you want to add sub fields in
                          the navbar
                        </p>
                      </div>
                    </div>

                    {data.isDropDown ? (
                      <>
                        {[...Array(divCount)].map((_, index) => (
                          <div className="form-group row mb-5" key={index}>
                            <label
                              htmlFor="inputPassword3"
                              className="col-sm-3 col-form-label"
                            >
                              *Add Sub-Navbar Field :
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                name={`english.dropDownValue.name.${index}`}
                                onChange={handleChange}
                                className="form-control mb-3"
                                placeholder="Add Sub-Navbar Field"
                              />
                              <input
                                type="text"
                                name={`marathi.dropDownValue.name.${index}`}
                                onChange={handleChange}
                                className="form-control mb-3"
                                placeholder="सुब-नवबार फील्ड प्रविष्ट करा"
                              />
                            </div>

                            {index === 0 && (
                              <div
                                onClick={addDiv}
                                className="addSubButton"
                                style={{ cursor: "pointer" }}
                              >
                                <img className="add" src={add} alt="add" />
                              </div>
                            )}
                            {index !== 0 && (
                              <div
                                onClick={() => removeDiv(index)}
                                className="addSubButton"
                                style={{ cursor: "pointer" }}
                              >
                                <img src={remove} alt="Remove" />
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
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


export default AddNavigation;
