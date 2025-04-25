import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";

import back from "assets/back.svg";
import { getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditPoliticalParty = () => {
  const [data, setData] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("party", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const [field, subField] = name.split(".");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (subField && name !== "isHouse") {
      setData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
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
            setData((prev) => ({
              ...prev,
              [name]: files[0],
            }));
          }
        } else {
          alert("Only upload JPEG/JPG/PNG format assets");
        }
      }
    }

    if (name === "isHouse") {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("party_flag", data.party_flag);
    formData.append("party_symbol", data.party_symbol);

    data.isUpdated = true;
    await putApi("party", id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Updated Party");
          setTimeout(() => {
            navigate(paths.viewPoliticalParty);
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
        <Link to={paths.viewPoliticalParty} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Political Parties</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && data.marathi && data.english && (
                <form className="form-horizontal border_names">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit Party Full Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english.party_name"
                            defaultValue={data.english.party_name}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Party Full Name"
                          />
                          <input
                            type="text"
                            name="marathi.party_name"
                            defaultValue={data.marathi.party_name}
                            onChange={handleChange}
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
                          *Edit Short name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english.short_name"
                            defaultValue={data.english.short_name}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Short name"
                          />
                          <input
                            type="text"
                            name="marathi.short_name"
                            defaultValue={data.marathi.short_name}
                            onChange={handleChange}
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
                          *Edit Party Flag :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                data.party_flag.name ||
                                data.party_flag.filename ||
                                "Please choose a file"
                              }
                              name="party_flag"
                              accept="image/png, image/jpeg, image.jpg"
                              onChange={handleChange}
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Party Flag -{" "}
                              {data.party_flag.name || data.party_flag.filename}
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
                          *Edit Party Symbol :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                data.party_symbol.name ||
                                data.party_symbol.filename ||
                                "Please choose a file"
                              }
                              name="party_symbol"
                              accept="image/png, image/jpeg, image.jpg"
                              onChange={handleChange}
                              className="custom-file-input"
                              id="customFile1"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile1"
                            >
                              Party Symbol -{" "}
                              {data.party_symbol.name ||
                                data.party_symbol.filename}
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
                          *Edit Party House :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <select
                              type="text"
                              name="isHouse"
                              onChange={(e) => handleChange(e)}
                              className="form-control mb-3"
                              value={data.isHouse}
                            >
                              <option hidden>Enter House</option>
                              <option value={"Assembly"}>Assembly</option>
                              <option value={"Council"}>Council</option>
                            </select>
                          </div>
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

export default EditPoliticalParty;