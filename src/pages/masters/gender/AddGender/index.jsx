import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import remove from "assets/remove.svg";
import back from "assets/back.svg";
import addwhite from "assets/addwhite.svg";

import { postApi } from "services/axiosInterceptors";

const AddGender = () => {
  const [divCount, setDivCount] = useState(1);
  const [data, setData] = useState([
    {
      marathi: {
        gender: "",
      },
      english: {
        gender: "",
      },
    },
  ]);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const addDiv = () => {
    let newData = {
      marathi: {
        gender: "",
      },
      english: {
        gender: "",
      },
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
    const { name, value } = e.target;
    const [field, subField] = name.split("_");

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
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await postApi("gender", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Added gender");
          setTimeout(() => {
            navigate("/ViewGender");
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
        <Link to="/ViewGender" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Gender</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  {[...Array(divCount)].map((_, index) => (
                    <div className="formada border_names" key={index}>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Add Gender Type :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english_gender"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control mb-3"
                            placeholder="Enter Gender Type"
                          />
                          <input
                            type="text"
                            name="marathi_gender"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control mb-3"
                            placeholder="लिंग प्रकार प्रविष्ट करा"
                          />
                        </div>
                      </div>

                      {index === 0 && (
                        <div onClick={() => addDiv()} className="addSubButton">
                          <img src={addwhite} alt="white" />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeDiv(index)}
                          className="addSubButton"
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

export default AddGender;
