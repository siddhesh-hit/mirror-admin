import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditProfile = ({
  data,
  handleChange,
  error,
  addCouncil,
  removeCouncil,
  addwhite,
  remove,
  isToggled,
  handleToggle,
  handleSubmit,
  handleEditorProfileChange,
}) => {
  return (
    <div className="contentofpages">
      <h4 className="page-title">• Edit Council Profile</h4>
      <div className="card card-info">
        <div className="row mt-5">
          {data &&
            data.english &&
            data.english.legislative_council.map((item, index, array) => (
              <div className="col-lg-9 border_names" key={index}>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-3 col-form-label"
                  >
                    Edit Profile Image :
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-file">
                      <input
                        type="file"
                        title={
                          data.legislative_council[index].council_profile
                            ? data.legislative_council[index].council_profile
                              .filename ||
                            data.legislative_council[index].council_profile
                              .name ||
                            "Please choose a file"
                            : "Please choose a file"
                        }
                        accept="image/png, image/jpeg, image/jpg"
                        name={`council_profile.${index}`}
                        onChange={handleChange}
                        className="custom-file-input"
                        id="customFile"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Image -{" "}
                        {data.legislative_council[index].council_profile
                          .filename ||
                          data.legislative_council[index].council_profile.name}
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
                    htmlFor="inputPassword3"
                    className="col-sm-3 col-form-label"
                  >
                    Edit Name :
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name={`english.legislative_council.${index}.council_name`}
                      defaultValue={item.council_name}
                      onChange={handleChange}
                      className={`form-control mb-3 ${error?.english?.legislative_council[index]?.council_name
                        ? "activeError"
                        : ""
                        }`}
                      placeholder="Edit Name"
                    />
                    {error?.english?.legislative_council[index]
                      ?.council_name ? (
                      <p className="red-error mt-3">
                        {
                          error?.english?.legislative_council[index]
                            .council_name
                        }
                      </p>
                    ) : (
                      <></>
                    )}
                    <input
                      type="text"
                      name={`marathi.legislative_council.${index}.council_name`}
                      defaultValue={
                        data.marathi.legislative_council[index].council_name
                      }
                      onChange={handleChange}
                      className={`form-control ${error?.marathi?.legislative_council[index]?.council_name
                        ? "activeError"
                        : ""
                        }`}
                      placeholder="नाव प्रविष्ट करा"
                    />
                    {error?.marathi?.legislative_council[index]
                      ?.council_name ? (
                      <p className="red-error mt-3">
                        {
                          error?.marathi?.legislative_council[index]
                            .council_name
                        }
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="form-group row mb-1">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-3 col-form-label"
                  >
                    Edit Description :
                  </label>
                  <div className="col-sm-9">
                    <CKEditor
                      data={item.council_description}
                      editor={ClassicEditor}
                      name={`english.legislative_council.${index}.council_description`}
                      onChange={(event, editor) =>
                        handleEditorProfileChange(
                          event,
                          editor,
                          `english.legislative_council.${index}.council_description`
                        )
                      }
                    />
                    <CKEditor
                      editor={ClassicEditor}
                      data={
                        data.marathi.legislative_council[index]
                          .council_description
                      }
                      name={`marathi.legislative_council.${index}.council_description`}
                      onChange={(event, editor) =>
                        handleEditorProfileChange(
                          event,
                          editor,
                          `marathi.legislative_council.${index}.council_description`
                        )
                      }
                    />

                    {/* <textarea
                      name={`english.legislative_council.${index}.council_description`}
                      defaultValue={item.council_description}
                      onChange={handleChange}
                      className={`form-control mb-3 ${error?.english?.legislative_council[index]
                          ?.council_description
                          ? "activeError"
                          : ""
                        }`}
                      placeholder="Edit Description"
                    />
                    {error?.english?.legislative_council[index]
                      ?.council_description ? (
                      <p className="red-error mt-3">
                        {
                          error?.english?.legislative_council[index]
                            .council_description
                        }
                      </p>
                    ) : (
                      <></>
                    )}
                    <textarea
                      name={`marathi.legislative_council.${index}.council_description`}
                      defaultValue={
                        data.marathi.legislative_council[index]
                          .council_description
                      }
                      onChange={handleChange}
                      className={`form-control ${error?.marathi?.legislative_council[index]
                          ?.council_description
                          ? "activeError"
                          : ""
                        }`}
                      placeholder="वर्णन प्रविष्ट करा"
                    />
                    {error?.marathi?.legislative_council[index]
                      ?.council_description ? (
                      <p className="red-error mt-3">
                        {
                          error?.marathi?.legislative_council[index]
                            .council_description
                        }
                      </p>
                    ) : (
                      <></>
                    )} */}
                  </div>
                </div>
                {index >= 0 && (
                  <button
                    onClick={() => removeCouncil(index)}
                    className="addSubButton mt-3 mb-3"
                  >
                    <img src={remove} alt="Remove" />
                  </button>
                )}

                {/* {index !== array.length - 1 ? (
                  <hr className="gradLine3 mt-5 mb-5" />
                ) : (
                  <></>
                )} */}

                {index === array.length - 1 && (
                  <button onClick={addCouncil} className="addSubButton ">
                    <img src={addwhite} alt="Add" />
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="form-group row">
              <label
                htmlFor="inputPassword3"
                className="col-sm-4 col-form-label"
              >
                Edit Status :
              </label>
              <div className="col-sm-8">
                <div
                  className={`toggle-button ${isToggled ? "active" : ""}`}
                  onClick={handleToggle}
                >
                  <div className={`slider ${isToggled ? "active" : ""}`} />
                  <div className="button-text">
                    {isToggled ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="submit123 mt-4" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
