import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { paths } from "services/paths";

const AddBanner = ({ data, handleChange, error, back, handleEditorBannerChange }) => {
  return (
    <div className="contentofpages">
      <Link to={paths.viewAllLegislativeAssembly} className="addpagess">
        <img src={back} style={{ width: "25px" }} alt="add" />
        Go back
      </Link>
      <h4 className="page-title">• Add Legislative Assembly</h4>
      <div className="card card-info">
        <div className="row mb-4 mt-4">
          <div className="col-lg-9">
            <form className="form-horizontal border_names">
              <div className="card-body">
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-3 col-form-label"
                  >
                    Add Banner :
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-file">
                      <input
                        type="file"
                        title={data.banner_image.name || "Please choose a file"}
                        name="banner_image"
                        accept="image/png, image/jpeg, image.jpg"
                        onChange={handleChange}
                        className={`custom-file-input`}
                        id="customFile"
                      />

                      {error?.banner_image ? (
                        <p className="red-error mt-3">{error?.banner_image}</p>
                      ) : (
                        <></>
                      )}

                      <label
                        className={`custom-file-label ${error?.banner_image ? "activeError" : ""
                          }`}
                        htmlFor="customFile"
                      >
                        Image -{" "}
                        {data.banner_image ? data.banner_image.name : ""}
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
                    Add Description :
                  </label>
                  <div className="col-sm-9">
                    <CKEditor
                      editor={ClassicEditor}
                      // data={editorData}
                      name="english.description"
                      onChange={(event, editor) => handleEditorBannerChange(event, editor, "english.description")}
                    />
                    <CKEditor
                      editor={ClassicEditor}
                      // data={editorData}
                      name="marathi.description"
                      onChange={(event, editor) => handleEditorBannerChange(event, editor, "marathi.description")}
                    />
                    {/* <input
                      type="text"
                      name="english.description"
                      onChange={handleChange}
                      className={`form-control mb-3 ${
                        error?.description_en ? "activeError" : ""
                      }`}
                      placeholder="Enter Description"
                    />
                    {error?.description_en ? (
                      <p className="red-error mt-3">{error?.description_en}</p>
                    ) : (
                      <></>
                    )}
                    <input
                      type="text"
                      name="marathi.description"
                      onChange={handleChange}
                      className={`form-control ${
                        error?.description_mr ? "activeError" : ""
                      }`}
                      placeholder="वर्णन प्रविष्ट करा"
                    />
                    {error?.description_mr ? (
                      <p className="red-error mt-3">{error?.description_mr}</p>
                    ) : (
                      <></>
                    )} */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
