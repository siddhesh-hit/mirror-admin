import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "assets/add.svg";
import remove from "assets/remove.svg";

import { postApi } from "services/axiosInterceptors";

const AddBiologicalInformation = () => {
  const [divCount, setDivCount] = useState(1); // Initialize with one div
  const [divCount1, setDivCount1] = useState(1);
  const [divCount2, setDivCount2] = useState(1);
  const [divCount3, setDivCount3] = useState(1);
  const [divCount4, setDivCount4] = useState(1);

  const [data, setData] = useState({
    banner_image: "",
    description_en: "",
    description_mr: "",
  });

  const [council, setCouncil] = useState([
    {
      legislative_profile: "",
      council_name_en: "",
      council_name_mr: "",
      council_description_en: "",
      council_description_mr: "",
    },
  ]);

  const navigate = useNavigate();

  const addDiv = () => {
    setDivCount(divCount + 1);
  };

  const removeDiv = () => {
    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
  };

  const addDiv1 = () => {
    setDivCount1(divCount1 + 1);
  };

  const removeDiv1 = () => {
    if (divCount1 > 1) {
      setDivCount1(divCount1 - 1);
    }
  };

  const addDiv2 = () => {
    setDivCount2(divCount2 + 1);
  };

  const removeDiv2 = () => {
    if (divCount2 > 1) {
      setDivCount2(divCount2 - 1);
    }
  };

  const addDiv3 = () => {
    setDivCount3(divCount3 + 1);
  };

  const removeDiv3 = () => {
    if (divCount3 > 1) {
      setDivCount3(divCount3 - 1);
    }
  };

  const addCouncil = () => {
    let newCouncil = {
      legislative_profile: "",
      council_name_en: "",
      council_name_mr: "",
      council_description_en: "",
      council_description_mr: "",
    };
    setCouncil([...council, newCouncil]);
    setDivCount4(divCount4 + 1);
  };

  const removeCouncil = (index) => {
    if (divCount4 > 1) {
      let list = [...council];
      list.splice(index, 1);
      setCouncil(list);
      setDivCount4(divCount4 - 1);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    });
  };

  const handleCouncilChange = (e, index) => {
    const { name, value, files } = e.target;
    const list = [...council];
    list[index][name] = files ? files[0] : value;
    setCouncil(list);
  };

  const handleCouncilSubmit = async (e) => {
    const server = {
      english: {
        description: data.description_en,
        legislative_council: [],
      },
      marathi: {
        description: data.description_mr,
        legislative_council: [],
      },
    };

    server.english.legislative_council = council.map((item) => {
      return {
        council_name: item.council_name_en,
        council_description: item.council_description_en,
      };
    });

    server.marathi.legislative_council = council.map((item) => {
      return {
        council_name: item.council_name_mr,
        council_description: item.council_description_mr,
      };
    });

    console.log(server);

    const formData = new FormData();
    formData.append("english", JSON.stringify(server.english));
    formData.append("marathi", JSON.stringify(server.marathi));
    formData.append("banner_image", data.banner_image);

    council.map((item) => {
      formData.append("legislative_profile", item.legislative_profile);
    });

    await postApi("sabha", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Information added successfully");
          setTimeout(() => {
            navigate("/ViewLegislativeAssembly");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };
  console.log(council);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Add Biological Information</h4>
        <div className="card card-info" style={{ padding: "30px 20px" }}>
          <div className="col-lg-12">
            <h4 className="third-title">• Government (MVA) / सरकार (एमविए)</h4>
            {[...Array(divCount)].map((_, index) => (
              <div key={index} className="row">
                <div className="col-lg-11">
                  <div className="legis_members">
                    <div className="card-body" style={{ padding: "15px 10px" }}>
                      <div className="form-group row mb-0">
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Party Name :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Party Name"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="पक्षाचे नाव प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Member Count :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Member Count"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="सदस्य संख्या प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1">
                  {index === 0 && (
                    <a onClick={addDiv} style={{ cursor: "pointer" }}>
                      <img className="add" src={add} />
                    </a>
                  )}
                  {index !== 0 && (
                    <a style={{ cursor: "pointer" }} onClick={removeDiv}>
                      <img src={remove} alt="Remove" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            <h4 className="third-title mt-5">
              • Opposition (NDA) / विरोधी पक्ष (एनडीए)
            </h4>
            {[...Array(divCount1)].map((_, index) => (
              <div key={index} className="row">
                <div className="col-lg-11">
                  <div className="legis_members">
                    <div className="card-body" style={{ padding: "15px 10px" }}>
                      <div className="form-group row mb-0">
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Party Name :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Party Name"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="पक्षाचे नाव प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Member Count :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Member Count"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="सदस्य संख्या प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1">
                  {index === 0 && (
                    <a onClick={addDiv1} style={{ cursor: "pointer" }}>
                      <img className="add" src={add} />
                    </a>
                  )}
                  {index !== 0 && (
                    <a style={{ cursor: "pointer" }} onClick={removeDiv1}>
                      <img src={remove} alt="Remove" />
                    </a>
                  )}
                </div>
              </div>
            ))}
            <h4 className="third-title mt-5">• Other / इतर</h4>
            {[...Array(divCount2)].map((_, index) => (
              <div key={index} className="row">
                <div className="col-lg-11">
                  <div className="legis_members">
                    <div className="card-body" style={{ padding: "15px 10px" }}>
                      <div className="form-group row mb-0">
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Party Name :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Party Name"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="पक्षाचे नाव प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Member Count :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Member Count"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="सदस्य संख्या प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1">
                  {index === 0 && (
                    <a onClick={addDiv2} style={{ cursor: "pointer" }}>
                      <img className="add" src={add} />
                    </a>
                  )}
                  {index !== 0 && (
                    <a style={{ cursor: "pointer" }} onClick={removeDiv2}>
                      <img src={remove} alt="Remove" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            <h4 className="third-title mt-5">• Vacant / रिकामे</h4>
            {[...Array(divCount3)].map((_, index) => (
              <div key={index} className="row">
                <div className="col-lg-11">
                  <div className="legis_members">
                    <div className="card-body" style={{ padding: "15px 10px" }}>
                      <div className="form-group row mb-0">
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Party Name :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Party Name"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="पक्षाचे नाव प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-5 col-form-label"
                            >
                              Add Member Count :
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder=" Enter Member Count"
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="सदस्य संख्या प्रविष्ट करा"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1">
                  {index === 0 && (
                    <a onClick={addDiv3} style={{ cursor: "pointer" }}>
                      <img className="add" src={add} />
                    </a>
                  )}
                  {index !== 0 && (
                    <a style={{ cursor: "pointer" }} onClick={removeDiv3}>
                      <img src={remove} alt="Remove" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className="submit123 mt-4"
            onClick={() => handleCouncilSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBiologicalInformation;
