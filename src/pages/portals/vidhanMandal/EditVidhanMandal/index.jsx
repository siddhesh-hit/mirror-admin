import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { getApiById, putApi } from "services/axiosInterceptors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { paths } from "services/paths";

const EditVidhanMandal = () => {
  const [data, setData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const [error, setError] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const pathnameArray = location.pathname?.split("/");
  const id = location.pathname?.split("/")[pathnameArray.length - 1];

  const [serverData, setServerData] = useState({});

  const fetchData = async () => {
    await getApiById("mandal", id)
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
        setServerData(res.data.data);
        setIsToggled(res.data.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const [fullField, subField] = name.split("-");
    const [lang, field] = fullField.split(".");

    const maxAllowedSize = 2.5 * 1024 * 1024;

    console.log(name, value, fullField, subField, field, lang, index);

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

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setServerData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const validateData = (data) => {
    console.log(data);
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
      if (!item.image && !item.image.filename && !item.image.name) {
        isValid = false;
        imageError.image = "Image is required";
      }

      if (!item.documents && !item.documents.filename && !item.documents.name) {
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
    // console.log(serverData);
    const { isValid, errors } = validateData(serverData);

    if (!isValid) {
      setError(errors);
      toast.error("It seems some fields are empty check the red boxes!");
      return;
    } else {
      if (isSubmitted) return;
      setSubmit(true);

      const formData = new FormData();
      formData.append("english", JSON.stringify(serverData.english));
      formData.append("marathi", JSON.stringify(serverData.marathi));
      formData.append("files", JSON.stringify(serverData.mandal_image));
      formData.append("isActive", serverData.isActive);
      formData.append("isUpdated", true);
      console.log(serverData);
      serverData.mandal_image.forEach((item) => {
        let image = item.image;
        let document = item.documents;
        formData.append("about_us_img", image);
        formData.append("about_us_doc", document);
      });
      await putApi("mandal", data._id, formData)
        .then((res) => {
          if (res.data.success) {
            toast.success("Vidhanmandal updated successfully");
            setTimeout(() => {
              navigate(`${paths.viewVidhanMandal}/${data._id}`);
            }, 1000);
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });

      setSubmit(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(error, "data here");
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

  console.log(serverData);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllVidhanMandal} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Vidhan Mandal</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="">
                <form className="form-horizontal">
                  {data &&
                    data.english &&
                    data.marathi &&
                    data.english.about_us ? (
                    data.english.about_us.map((item, index, array) => (
                      <React.Fragment key={index}>
                        <div className="card-body border_names">
                          <div className="form-group row">
                            <label
                              htmlFor="inputPassword3"
                              className="col-sm-4 col-form-label"
                            >
                              Edit Title :
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="english.about_us-title"
                                defaultValue={item.title}
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
                                defaultValue={
                                  data.marathi.about_us[index].title
                                }
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
                              Edit Description :
                            </label>
                            <div className="col-sm-8">
                              <CKEditor
                                editor={ClassicEditor}
                                data={item.description}
                                className={`form-control mb-3 ${error?.english?.about_us[index]?.description
                                  ? "activeError"
                                  : ""
                                  }`}
                                name="marathi.about_us-description"
                                onChange={(event, editor) =>
                                  handleEditorChange(
                                    event,
                                    editor,
                                    "english.about_us-description",
                                    index
                                  )
                                }
                              />

                              {/* <textarea
                                name="english.about_us-description"
                                defaultValue={item.description}
                                onChange={(e) => handleChange(e, index)}
                                className={`form-control mb-3 ${error?.english?.about_us[index]?.description
                                  ? "activeError"
                                  : ""
                                  }`}
                                placeholder=" Enter Description"
                              />{" "}
                              {error?.english?.about_us[index]?.description ? (
                                <span className="red-error">
                                  {error.english.about_us[index].description}
                                </span>
                              ) : (
                                <></>
                              )} */}
                              <CKEditor
                                editor={ClassicEditor}
                                data={data.marathi.about_us[index].description}
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
                              {/* <textarea
                                name="marathi.about_us-description"
                                defaultValue={
                                  data.marathi.about_us[index].description
                                }
                                onChange={(e) => handleChange(e, index)}
                                className={`form-control mb-3 ${error?.marathi?.about_us[index]?.description
                                  ? "activeError"
                                  : ""
                                  }`}
                                placeholder="वर्णन प्रविष्ट करा"
                              />{" "} */}
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
                              Edit Image :
                            </label>
                            <div className="col-sm-8">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="image"
                                  title={
                                    data.mandal_image[index].image.filename ||
                                    serverData.mandal_image[index].image.name ||
                                    "Please choose a file"
                                  }
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
                                  Image -
                                  {data.mandal_image[index].image.filename ||
                                    serverData.mandal_image[index].image.name}
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
                              Edit Document :
                            </label>
                            <div className="col-sm-8">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  title={
                                    data.mandal_image[index].documents
                                      .filename ||
                                    serverData.mandal_image[index].documents
                                      .name.name ||
                                    "Please choose a file"
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
                                  {data.mandal_image[index].documents
                                    .filename ||
                                    serverData.mandal_image[index].documents
                                      .name}
                                </label>
                              </div>
                              <p className="photo_disclaimer">
                                {" "}
                                *Only upload PDF format document
                              </p>
                            </div>
                          </div>
                        </div>
                        {index !== array.length - 1 ? (
                          <hr className="gradLine3" />
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <></>
                  )}
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
                            className={`slider ${isToggled ? "active" : ""}`}
                          />
                          <div className="button-text">
                            {isToggled ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default EditVidhanMandal;
