import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditBanner = ({ data, handleChange, error, back, handleEditorBannerChange }) => {
  console.log(data, "data")


  return (
    <div className="contentofpages">
      <Link to="/ViewAllLegislativeAssembly" className="addpagess">
        <img src={back} style={{ width: "25px" }} alt="add" />
        Go back
      </Link>
      <h4 className="page-title">• Edit Legislative Assembly</h4>
      <div className="card card-info">
        <div className="row mb-4 mt-4">
          <div className="col-lg-9">
            {data && data.english && (
              <form className="form-horizontal border_names">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Banner :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          title={
                            data.banner_image.filename ||
                            data.banner_image.name ||
                            "Please choose a file"
                          }
                          name="banner_image"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />

                        {error?.banner_image ? (
                          <p className="red-error mt-3">
                            {error?.banner_image}
                          </p>
                        ) : (
                          <></>
                        )}

                        <label
                          className={`custom-file-label ${error?.banner_image ? "activeError" : ""
                            }`}
                          htmlFor="customFile"
                        >
                          Image -{" "}
                          {data.banner_image.filename || data.banner_image.name}
                        </label>
                      </div>
                      <p className="photo_disclaimer">
                        {" "}
                        *Only upload JPEG/JPG/PNG format assets
                      </p>
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
                        editor={ClassicEditor}
                        data={data.english.description}
                        name="english.description"
                        onChange={(event, editor) => handleEditorBannerChange(event, editor, "english.description")}
                      />
                      <CKEditor
                        editor={ClassicEditor}
                        data={data.marathi.description}
                        name="marathi.description"
                        onChange={(event, editor) => handleEditorBannerChange(event, editor, "marathi.description")}
                      />
                      {/* <textarea
                        name="english.description"
                        defaultValue={data.english.description}
                        onChange={handleChange}
                        className={`form-control mb-3 ${error?.english?.description ? "activeError" : ""
                          }`}
                        placeholder="Edit Description"
                      />

                      {error?.english?.description ? (
                        <p className="red-error mt-3">
                          {error?.english.description}
                        </p>
                      ) : (
                        <></>
                      )}

                      <textarea
                        name="marathi.description"
                        defaultValue={data.marathi.description}
                        onChange={handleChange}
                        className={`form-control ${error?.marathi?.description ? "activeError" : ""
                          }`}
                        placeholder="वर्णन प्रविष्ट करा"
                      />

                      {error?.marathi?.description ? (
                        <p className="red-error mt-3">
                          {error?.marathi.description}
                        </p>
                      ) : (
                        <></>
                      )} */}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
