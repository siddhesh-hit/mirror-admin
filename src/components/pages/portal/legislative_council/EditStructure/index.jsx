const EditStructure = ({ data, handleChange, error }) => {
  return (
    <div className="contentofpages">
      <h4 className="page-title">• Edit Structure</h4>
      <div className="card card-info">
        <div className="row mb-4 mt-4">
          <div className="col-lg-9">
            {data?.structure_profile &&
              data?.english?.structure &&
              data?.marathi.structure ? (
              <form className="form-horizontal border_names">
                <div className="card-body">
                  <div className="formada">
                    <div className="form-group row mt-4">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Image :
                      </label>
                      <div className="col-sm-9">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={
                              data.structure_profile.name ||
                              data.structure_profile.filename ||
                              "Please choose a file"
                            }
                            name="structure_profile"
                            accept="image/png, image/jpeg, image.jpg"
                            onChange={handleChange}
                            className={`custom-file-input`}
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
                            {data.structure_profile.name ||
                              data.structure_profile.filename}
                          </label>
                        </div>
                        <p className="photo_disclaimer">
                          {" "}
                          *Only upload JPEG/JPG/PNG format assets
                        </p>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Council Name :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          defaultValue={data.english.structure.name}
                          name="english.structure.name"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Council Name"
                        />
                        <input
                          type="text"
                          defaultValue={data.marathi.structure.name}
                          name="marathi.structure.name"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="कौन्सिलचे नाव एंटर करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Type :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          defaultValue={data.english.structure.type}
                          name="english.structure.type"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Edit Council Name"
                        />
                        <input
                          type="text"
                          defaultValue={data.marathi.structure.type}
                          name="marathi.structure.type"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="कौन्सिलचे नाव एंटर करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Term Limit :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          defaultValue={data.english.structure.term_limit}
                          name="english.structure.term_limit"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Term Limit"
                        />
                        <input
                          type="text"
                          defaultValue={data.marathi.structure.term_limit}
                          name="marathi.structure.term_limit"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="कौन्सिलचे नाव एंटर करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Seat :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          defaultValue={data.english.structure.seats}
                          name="english.structure.seats"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Seat"
                        />
                        <input
                          type="text"
                          defaultValue={data.marathi.structure.seats}
                          name="marathi.structure.seats"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="सीट प्रविष्ट करा"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <form className="form-horizontal border_names">
                <div className="card-body">
                  <div className="formada">
                    <div className="form-group row mt-4">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Image :
                      </label>
                      <div className="col-sm-9">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={
                              data.structure_profile
                                ? data.structure_profile.name ||
                                "Please choose a file"
                                : "Please choose a file"
                            }
                            name="structure_profile"
                            accept="image/png, image/jpeg, image.jpg"
                            onChange={handleChange}
                            className={`custom-file-input`}
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
                            {data.structure_profile
                              ? data.structure_profile.name
                              : ""}
                          </label>
                        </div>
                        <p className="photo_disclaimer">
                          {" "}
                          *Only upload JPEG/JPG/PNG format assets
                        </p>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Council Name :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.structure.name"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Council Name"
                        />
                        <input
                          type="text"
                          name="marathi.structure.name"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="कौन्सिलचे नाव एंटर करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Type :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.structure.type"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Council Name"
                        />
                        <input
                          type="text"
                          name="marathi.structure.type"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="कौन्सिलचे नाव एंटर करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Term Limit :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.structure.term_limit"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Term Limit"
                        />
                        <input
                          type="text"
                          name="marathi.structure.term_limit"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="कौन्सिलचे नाव एंटर करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Seat :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english.structure.seats"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Seat"
                        />
                        <input
                          type="text"
                          name="marathi.structure.seats"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="सीट प्रविष्ट करा"
                        />
                      </div>
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

export default EditStructure;
