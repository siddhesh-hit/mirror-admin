import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";
import back from "assets/back.svg";

import { postApi } from "services/axiosInterceptors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { paths } from "services/paths";

const AddVidhanMandal = () => {
  const [divCount, setDivCount] = useState(1);
  const [isSubmitted, setSubmit] = useState(false);

  const [serverData, setServerData] = useState({
    marathi: {
      about_us: [{ title: "", description: "" }],
    },
    english: {
      about_us: [{ title: "", description: "" }],
    },
    mandal_image: [
      {
        image: {},
        documents: {},
      },
    ],
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const addDiv = () => {
    let marathi_aboutUs = {
      title: "",
      description: "",
    };

    let english_aboutUs = {
      title: "",
      description: "",
    };

    let files = {
      image: {},
      document: {},
    };

    setServerData((prev) => ({
      ...prev,
      marathi: {
        ...prev.marathi,
        about_us: [...prev.marathi.about_us, marathi_aboutUs],
      },
      english: {
        ...prev.english,
        about_us: [...prev.english.about_us, english_aboutUs],
      },
      mandal_image: [...prev.mandal_image, files],
    }));

    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    if (divCount > 1) {
      let marathi_aboutUs = [...serverData.marathi.about_us];

      let english_aboutUs = [...serverData.english.about_us];

      let files = [...serverData.mandal_image];

      marathi_aboutUs.splice(index, 1);
      english_aboutUs.splice(index, 1);
      files.splice(index, 1);

      setServerData((prev) => ({
        ...prev,
        english: {
          ...prev.english,
          about_us: english_aboutUs,
        },
        marathi: {
          ...prev.marathi,
          about_us: marathi_aboutUs,
        },
        mandal_image: files,
      }));

      setDivCount(divCount - 1);
      alert("You've removed one field");
    }
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const [fullField, subField] = name.split("-");
    const [lang, field] = fullField.split(".");

    // console.log(name, value, fullField, subField, field, lang, index);

    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (!files) {
      setServerData((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: [
            ...prev[lang][field].map((item, i) =>
              i === index ? { ...item, [subField]: value } : item
            ),
          ],
        },
      }));
    } else {
      if (
        (name === "image" &&
          (files[0].type.startsWith("image/png") ||
            files[0].type.startsWith("image/jpeg") ||
            files[0].type.startsWith("image/jpg"))) ||
        (name === "documents" && files[0].type.startsWith("application/pdf"))
      ) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          setServerData((prev) => {
            const updatedMandalassets = [...prev.mandal_image];
            if (!updatedMandalassets[index]) {
              updatedMandalassets[index] = {};
            }
            updatedMandalassets[index][name] = files[0];

            return {
              ...prev,
              mandal_image: updatedMandalassets,
            };
          });
        }
      } else {
        name === "image"
          ? alert("Only upload JPEG/JPG/PNG format assets")
          : alert("Only upload PDF format document");
      }
    }
  };

  const handleEditorChange = (event, value, name, index) => {
    const [fullField, subField] = name.split("-");
    const [lang, field] = fullField.split(".");
    setServerData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: [
          ...prev[lang][field].map((item, i) =>
            i === index ? { ...item, [subField]: value?.getData() } : item
          ),
        ],
      },
    }));
  };

  const validateData = (data) => {
    const errors = {
      marathi: {
        about_us: [],
      },
      english: {
        about_us: [],
      },
      mandal_image: [],
    };
    let isValid = true;

    // Validate English and Marathi about us fields
    ["english", "marathi"].forEach((lang) => {
      data[lang].about_us.forEach((item, index) => {
        let aboutUsError = {};
        if (!item.title.trim()) {
          isValid = false;
          aboutUsError.title = "Title is required";
        }
        if (!item.description.trim()) {
          isValid = false;
          aboutUsError.description = "Description is required";
        }
        if (Object.keys(aboutUsError).length > 0) {
          errors[lang].about_us[index] = aboutUsError || {};
        }
      });
    });

    // Validate mandal image fields
    data.mandal_image.forEach((item, index) => {
      let imageError = {};
      if (!item.image || !item.image.name) {
        isValid = false;
        imageError.image = "Image is required";
      }

      if (!item.documents || !item.documents.name) {
        isValid = false;
        imageError.documents = "Document is required";
      }

      if (Object.keys(imageError).length > 0) {
        errors.mandal_image[index] = imageError;
      }
    });

    // Clean up empty error arrays
    ["english", "marathi"].forEach((lang) => {
      if (errors[lang].about_us.length === 0) {
        delete errors[lang];
      }
    });

    if (errors.mandal_image.length === 0) {
      delete errors.mandal_image;
    }

    return { isValid, errors };
  };

  const handleSubmit = async () => {
    // const { isValid, errors } = validateData(serverData);
    // console.log(serverData);
    // if (!isValid) {
    //   setError(errors);
    //   toast.error("It seems some fields are empty check the red boxes!");
    //   return;
    // } else {
    const data = {
      english: serverData.english,
      marathi: serverData.marathi,
    };

    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();
    formData.append("english", JSON.stringify(data.english));
    formData.append("marathi", JSON.stringify(data.marathi));
    for (let key in serverData.mandal_image) {
      // console.log(key);
      // console.log(serverData.mandal_file[key]);
      formData.append("about_us_img", serverData.mandal_image[key].image);
      formData.append("about_us_doc", serverData.mandal_image[key].documents);
    }

    await postApi("mandal", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Vidhanmandal added successfully");
          setTimeout(() => {
            navigate(paths.viewAllVidhanMandal);
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });

    setSubmit(false);

    // }
  };

  console.log(serverData);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllVidhanMandal} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Vidhan Mandal</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="">
                <form className="form-horizontal">
                  {[...Array(divCount)].map((_, index) => (
                    <div className="card-body border_names" key={index}>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Title :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english.about_us-title"
                            onChange={(e) => handleChange(e, index)}
                            className={`form-control mb-3 ${error?.english?.about_us[index]?.title
                              ? "activeError"
                              : ""
                              }`}
                            placeholder="Enter Title"
                          />
                          {error?.english?.about_us[index]?.title ? (
                            <span className="red-error">
                              {error.english.about_us[index].title}
                            </span>
                          ) : (
                            <></>
                          )}
                          <input
                            type="text"
                            name="marathi.about_us-title"
                            onChange={(e) => handleChange(e, index)}
                            className={`form-control ${error?.marathi?.about_us[index]?.title
                              ? "activeError"
                              : ""
                              }`}
                            placeholder="शीर्षक प्रविष्ट करा"
                          />
                          {error?.marathi?.about_us[index]?.title ? (
                            <span className="red-error">
                              {error.marathi.about_us[index].title}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Description :
                        </label>
                        <div className="col-sm-8">
                          <CKEditor
                            editor={ClassicEditor}
                            // data={editorData}
                            className={`${error?.english?.about_us[index]?.description
                              ? "activeError"
                              : ""
                              }`}
                            name="english.about_us-description"
                            onChange={(event, editor) =>
                              handleEditorChange(
                                event,
                                editor,
                                "english.about_us-description",
                                index
                              )
                            }
                          />
                          {error?.english?.about_us[index]?.description ? (
                            <span className="red-error">
                              {error.english.about_us[index].description}
                            </span>
                          ) : (
                            <></>
                          )}
                          {/* <textarea
                            type="text"
                            name="english.about_us-description"
                            onChange={(e) => handleChange(e, index)}
                            className={`form-control mb-3 ${error?.english?.about_us[index]?.description
                              ? "activeError"
                              : ""
                              }`}
                            placeholder=" Enter Description"
                          />
                          {error?.english?.about_us[index]?.description ? (
                            <span className="red-error">
                              {error.english.about_us[index].description}
                            </span>
                          ) : (
                            <></>
                          )} */}
                          {/* <textarea
                              type="text"
                              name="marathi.about_us-description"
                              onChange={(e) => handleChange(e, index)}
                              className={`form-control mb-3 ${error?.marathi?.about_us[index]?.description
                                ? "activeError"
                                : ""
                                }`}
                              placeholder="वर्णन प्रविष्ट करा"
                            />
                            {error?.marathi?.about_us[index]?.description ? (
                              <span className="red-error">
                                {error.marathi.about_us[index].description}
                              </span>
                            ) : (
                              <></>
                            )} */}
                          <CKEditor
                            editor={ClassicEditor}
                            // data={editorData}
                            className={`${error?.marathi?.about_us[index]?.description
                              ? "activeError"
                              : ""
                              }`}
                            name="marathi.about_us-description"
                            onChange={(event, editor) =>
                              handleEditorChange(
                                event,
                                editor,
                                "marathi.about_us-description",
                                index
                              )
                            }
                          />
                          {error?.marathi?.about_us[index]?.description ? (
                            <span className="red-error">
                              {error.marathi.about_us[index].description}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Add assets :
                        </label>
                        <div className="col-sm-8">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                serverData.mandal_image[index].image
                                  ? serverData.mandal_image[index].image.name ||
                                  "Please choose a file"
                                  : "Please choose a file"
                              }
                              name="image"
                              accept="image/png, image/jpeg, image/jpg"
                              onChange={(e) => handleChange(e, index)}
                              className="custom-file-input"
                              id="customFile"
                            />

                            {error.mandal_image &&
                              error?.mandal_image[index]?.image ? (
                              <p className="red-error mt-3">
                                {error.mandal_image[index].image}
                              </p>
                            ) : (
                              <></>
                            )}

                            <label
                              className={`custom-file-label ${error.mandal_image &&
                                error?.mandal_image[index]?.image
                                ? "activeError"
                                : ""
                                }`}
                              htmlFor="customFile"
                            >
                              assets -{" "}
                              {serverData.mandal_image &&
                                serverData.mandal_image[index].image
                                ? serverData.mandal_image[index].image.name
                                : ""}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            {" "}
                            *Only upload JPEG/JPG/PNG format assets
                          </p>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Document :
                        </label>
                        <div className="col-sm-8">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                serverData.mandal_image[index].documents
                                  ? serverData.mandal_image[index].documents
                                    .name || "Please choose a file"
                                  : "Please choose a file"
                              }
                              name="documents"
                              accept="application/pdf"
                              onChange={(e) => handleChange(e, index)}
                              className="custom-file-input"
                              id="customFile"
                            />

                            {error.mandal_image &&
                              error?.mandal_image[index]?.documents ? (
                              <p className="red-error mt-3">
                                {error.mandal_image[index].documents}
                              </p>
                            ) : (
                              <></>
                            )}

                            <label
                              className={`custom-file-label ${error.mandal_image &&
                                error?.mandal_image[index]?.documents
                                ? "activeError"
                                : ""
                                }`}
                              htmlFor="customFile"
                            >
                              Document -{" "}
                              {serverData.mandal_image &&
                                serverData.mandal_image[index].documents
                                ? serverData.mandal_image[index].documents.name
                                : ""}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            {" "}
                            *Only upload PDF format document
                          </p>
                        </div>
                      </div>

                      {index === 0 && (
                        <div onClick={addDiv} className="addSubButton">
                          <img
                            src={addwhite}
                            // style={{ height: "25px", width: "25px" }}
                            alt="Add"
                          />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeDiv(index)}
                          className="addSubButton"
                        >
                          <img src={remove} alt="Remove" />
                        </div>
                      )}
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <button className="submit123 mt-5" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVidhanMandal;
