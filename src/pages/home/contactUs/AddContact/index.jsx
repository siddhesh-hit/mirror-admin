import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import add from "assets/back.svg";

import { postApi } from "services/axiosInterceptors";

const AddContact = () => {
  const [isSubmitted, setSubmit] = useState(false);
  const [data, setData] = useState({
    marathi: {
      address: "",
      telephone: "",
      fax: "",
      email: "",
      map_url: "",
    },
    english: {
      address: "",
      telephone: "",
      fax: "",
      email: "",
      map_url: "",
    },
  });

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    await postApi(`/contact`, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact Us entry created!");
          setTimeout(() => {
            navigate("/ViewContact");
          }, 1100);
        }
      })
      .catch((err) => console.log(err));

    setSubmit(false);
  };

  console.log(data);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/Dashboard">
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• Add Contact Us</h4>
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
                          Add Address :
                        </label>
                        <div className="col-sm-8">
                          <CKEditor
                            config={{ placeholder: "Enter Address" }}
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
                          Add Email :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="email"
                            name="english.email"
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Email"
                          />
                          <input
                            type="email"
                            name="marathi.email"
                            onChange={handleChange}
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
                          Add Fax Number :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english.fax"
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Fax Number"
                          />
                          <input
                            type="text"
                            name="marathi.fax"
                            onChange={handleChange}
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
                          Add Legislature No :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english.telephone"
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Legislature No"
                          />
                          <input
                            type="text"
                            name="marathi.telephone"
                            onChange={handleChange}
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
                            className="form-control mb-3"
                            placeholder="Enter Map Url"
                          />
                          <input
                            type="text"
                            name="marathi.map_url"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="नकशा Url प्रविष्ट करा"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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

export default AddContact;
