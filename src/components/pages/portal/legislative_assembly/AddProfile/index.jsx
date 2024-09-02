import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProfile = ({
  data,
  handleChange,
  error,
  divCount,
  addCouncil,
  removeCouncil,
  addwhite,
  remove,
  handleSubmit,
  handleEditorProfileChange
}) => {
  return (
    <div className="contentofpages">
      <h4 className="page-title">• Add Legislative Profile</h4>
      <div className="card card-info">
        <div className="row mb-4 mt-4">
          <div className="col-lg-9">
            <form className="form-horizontal">
              <div className="card-body">
                <div>
                  {[...Array(divCount)].map((_, index) => (
                    <div className="formada border_names" key={index}>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-3 col-form-label"
                        >
                          Add Profile Image :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                data.legislative_council[index].council_profile
                                  ? data.legislative_council[index]
                                    .council_profile.name ||
                                  "Please choose a file"
                                  : "Please choose a file"
                              }
                              accept="image/png, image/jpeg, image.jpg"
                              name={`council_profile.${index}`}
                              onChange={handleChange}
                              className="custom-file-input"
                              id="customFile"
                            />

                            {error.council &&
                              error?.council[index]?.legislative_profile ? (
                              <p className="red-error mt-3">
                                {error.council[index].legislative_profile}
                              </p>
                            ) : (
                              <></>
                            )}

                            <label
                              className={`custom-file-label ${error.council &&
                                error?.council[index]?.legislative_profile
                                ? "activeError"
                                : ""
                                }`}
                              htmlFor="customFile"
                            >
                              Image -{" "}
                              {data.legislative_council[index].council_profile
                                ? data.legislative_council[index]
                                  .council_profile.name
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
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          Add Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name={`english.legislative_council.${index}.council_name`}
                            onChange={handleChange}
                            className={`form-control mb-3 ${error.council &&
                              error?.council[index]?.council_name_en
                              ? "activeError"
                              : ""
                              }`}
                            placeholder="Enter Name"
                          />
                          {error.council &&
                            error?.council[index]?.council_name_en ? (
                            <p className="red-error mt-3">
                              {error.council[index].council_name_en}
                            </p>
                          ) : (
                            <></>
                          )}
                          <input
                            type="text"
                            name={`marathi.legislative_council.${index}.council_name`}
                            onChange={handleChange}
                            className={`form-control ${error.council &&
                              error?.council[index]?.council_name_en
                              ? "activeError"
                              : ""
                              }`}
                            placeholder="नाव प्रविष्ट करा"
                          />
                          {error.council &&
                            error?.council[index]?.council_name_mr ? (
                            <p className="red-error mt-3">
                              {error.council[index].council_name_mr}
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
                          Add Description :
                        </label>
                        <div className="col-sm-9">
                          <CKEditor
                            editor={ClassicEditor}
                            // data={editorData}
                            name={`english.legislative_council.${index}.council_description`}
                            onChange={(event, editor) => handleEditorProfileChange(event, editor, "english.legislative_council.${index}.council_descriptio")}
                          />
                          <CKEditor
                            editor={ClassicEditor}
                            // data={editorData}
                            name={`marathi.legislative_council.${index}.council_description`}
                            onChange={(event, editor) => handleEditorProfileChange(event, editor, "marathi.legislative_council.${index}.council_description")}
                          />
                          {/* <input
                            type="text"
                            name={`english.legislative_council.${index}.council_description`}
                            onChange={handleChange}
                            className={`form-control mb-3 ${error.council &&
                                error?.council[index]?.council_description_en
                                ? "activeError"
                                : ""
                              }`}
                            placeholder="Add Description"
                          />
                          {error.council &&
                            error?.council[index]?.council_description_en ? (
                            <p className="red-error mt-3">
                              {error.council[index].council_description_en}
                            </p>
                          ) : (
                            <></>
                          )}
                          <input
                            type="text"
                            name={`english.legislative_council.${index}.council_description`}
                            onChange={handleChange}
                            className={`form-control ${error.council &&
                                error?.council[index]?.council_description_mr
                                ? "activeError"
                                : ""
                              }`}
                            placeholder="वर्णन प्रविष्ट करा"
                          />
                          {error.council &&
                            error?.council[index]?.council_description_mr ? (
                            <p className="red-error mt-3">
                              {error.council[index].council_description_mr}
                            </p>
                          ) : (
                            <></>
                          )} */}
                        </div>
                      </div>
                      {index === 0 && (
                        <div
                          onClick={addCouncil}
                          className="addSubButton mb-3 mt-3"
                        >
                          <img
                            src={addwhite}
                            // style={{ height: "25px", width: "25px" }}
                            alt="Add"
                          />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeCouncil(index)}
                          className="addSubButton mb-3 mt-3"
                        >
                          <img src={remove} alt="Remove" />
                        </div>
                      )}
                    </div>
                  ))}
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
  );
};

export default AddProfile;
