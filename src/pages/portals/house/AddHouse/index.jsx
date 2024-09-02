import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import remove from "assets/remove.svg";
import addwhite from "assets/addwhite.svg";

import { postApi } from "services/axiosInterceptors";

const AddHouse = () => {
  const [divCount, setDivCount] = useState(1);
  const [data, setData] = useState([
    {
      marathi: {
        question: "",
        answer: "",
      },
      english: {
        question: "",
        answer: "",
      },
    },
  ]);

  const navigate = useNavigate();

  const addDiv = () => {
    let newData = {
      marathi: {
        question: "",
        answer: "",
      },
      english: {
        question: "",
        answer: "",
      },
    };
    setData([...data, newData]);
    setDivCount(divCount + 1);
  };

  const removeDiv = (index) => {
    let newData = [...data];

    newData.splice(index, 1);
    setData(newData);

    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
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
    await postApi("faq", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Added a FAQ");
          setTimeout(() => {
            navigate("/ViewFaqs");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Add House</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  {[...Array(divCount)].map((_, index) => (
                    <div className="formada" key={index}>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          Add House Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english_question"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control mb-3"
                            placeholder="Enter House Name"
                          />
                          <input
                            type="text"
                            name="marathi_question"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control"
                            placeholder="वर्णन प्रविष्ट करा"
                          />
                        </div>
                      </div>

                      {index === 0 && (
                        <div
                          onClick={() => addDiv()}
                          className="submit1234 mt-5 mb-5"
                        >
                          Add New <img src={addwhite} alt="white" />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeDiv(index)}
                          className="submit1234 mt-5 mb-5"
                        >
                          Remove <img src={remove} alt="remove" />
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

export default AddHouse;
