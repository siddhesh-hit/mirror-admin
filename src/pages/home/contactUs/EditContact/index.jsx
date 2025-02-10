import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import add from "assets/back.svg";
import { getApiById, putApi } from "services/axios";
import { paths } from "services/paths";

const EditContact = () => {
  const [data, setData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const [isToggled, setIsToggled] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [lang, field] = name.split(".");

    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleEditorChange = (event, value, name) => {
    const [lang, field] = name.split(".");

    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value.getData(),
      },
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    await putApi("contact", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact request forwaded!");
          setTimeout(() => {
            navigate(paths.viewContact);
          }, 1110);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApiById("contact", id)
        .then((res) => {
          setData(res.data.data);
          setIsToggled(res.data.data.isActive);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewContact}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Edit Contact Us</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Address :
                        </label>
                        <div className="col-sm-8">
                          <CKEditor
                            config={{ placeholder: "Enter Address" }}
                            data={data?.english?.address}
                            editor={ClassicEditor}
                            onChange={(event, editor) =>
                              handleEditorChange(
                                event,
                                editor,
                                "english.address"
                              )
                            }
                          />
                          <CKEditor
                            config={{ placeholder: "पत्ता प्रविष्ट करा" }}
                            data={data?.marathi?.address}
                            editor={ClassicEditor}
                            onChange={(event, editor) =>
                              handleEditorChange(
                                event,
                                editor,
                                "marathi.address"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Email :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="email"
                            name="english.email"
                            onChange={handleChange}
                            defaultValue={data?.english?.email}
                            className="form-control mb-3"
                            placeholder="Enter Email"
                          />
                          <input
                            type="email"
                            name="marathi.email"
                            onChange={handleChange}
                            defaultValue={data?.marathi?.email}
                            className="form-control"
                            placeholder="ईमेल प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Fax Number :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english.fax"
                            onChange={handleChange}
                            defaultValue={data?.english?.fax}
                            className="form-control mb-3"
                            placeholder="Enter Fax Number"
                          />
                          <input
                            type="text"
                            name="marathi.fax"
                            onChange={handleChange}
                            defaultValue={data?.marathi?.fax}
                            className="form-control"
                            placeholder="फॅक्स क्रमांक प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Legislature No :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english.telephone"
                            onChange={handleChange}
                            defaultValue={data?.english?.telephone}
                            className="form-control mb-3"
                            placeholder="Enter Legislature No"
                          />
                          <input
                            type="text"
                            name="marathi.telephone"
                            onChange={handleChange}
                            defaultValue={data?.marathi?.telephone}
                            className="form-control"
                            placeholder="विधानमंडळ क्रमांक प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Map Url :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english.map_url"
                            onChange={handleChange}
                            defaultValue={data?.english?.map_url}
                            className="form-control mb-3"
                            placeholder="Enter Map Url"
                          />
                          <input
                            type="text"
                            name="marathi.map_url"
                            onChange={handleChange}
                            defaultValue={data?.marathi?.map_url}
                            className="form-control"
                            placeholder="नकशा Url प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="card-body">
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
                                className={`slider ${isToggled ? "active" : ""
                                  }`}
                              />
                              <div className="button-text">
                                {isToggled ? "Active" : "Inactive"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
