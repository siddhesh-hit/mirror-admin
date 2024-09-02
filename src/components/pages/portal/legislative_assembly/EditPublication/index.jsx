const EditPublication = ({
  data,
  handleChange,
  error,
  divCount,
  addPublication,
  removePublication,
  addwhite,
  remove,
}) => {
  return (
    <div className="contentofpages">
      <h4 className="page-title">• Edit Important Publications</h4>
      <div className="card card-info">
        <div className="row mb-4 mt-4">
          <div className="col-lg-9">
            <form className="form-horizontal">
              <div className="card-body">
                {data?.publication && data?.publication.length > 0 ? (
                  data.publication.map((item, index) => (
                    <div className="formada border_names" key={index}>
                      <div className="form-group row mb-1">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          Edit Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            onChange={handleChange}
                            defaultValue={item.english.name}
                            name={`publication.${index}.english.name`}
                            className="form-control mb-3"
                            placeholder="Enter Name"
                          />
                          <input
                            type="text"
                            onChange={handleChange}
                            defaultValue={item.marathi.name}
                            name={`publication.${index}.marathi.name`}
                            className="form-control"
                            placeholder="नाव संपादित करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-4">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-3 col-form-label"
                        >
                          Edit English Document :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                item.english.document.name ||
                                item.english.document.filename ||
                                "Please choose a file"
                              }
                              onChange={handleChange}
                              name={`publication.${index}.english.document`}
                              accept="application/pdf"
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
                              Document -{" "}
                              {item.english.document.name ||
                                item.english.document.filename}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            {" "}
                            *Only upload PDF format document
                          </p>
                        </div>
                      </div>
                      <div className="form-group row mt-4">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-3 col-form-label"
                        >
                          Edit Marathi Document :
                        </label>
                        <div className="col-sm-9">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                item.marathi.document.name ||
                                item.marathi.document.filename ||
                                "Please choose a file"
                              }
                              onChange={handleChange}
                              name={`publication.${index}.marathi.document`}
                              accept="application/pdf"
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
                              Document -{" "}
                              {item.marathi.document.name ||
                                item.marathi.document.filename}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            {" "}
                            *Only upload PDF format document
                          </p>
                        </div>
                      </div>
                      {index === 0 && (
                        <div
                          onClick={addPublication}
                          className="addSubButton mb-3"
                        >
                          <img
                            src={addwhite}
                            // style={{ height: "25px", width: "25px" }}
                            alt="add"
                          />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removePublication(index)}
                          className="addSubButton"
                        >
                          <img src={remove} alt="Remove" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {[...Array(divCount)].map((_, index) => (
                      <div className="formada border_names" key={index}>
                        <div className="form-group row mb-1">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            Add Name :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              onChange={handleChange}
                              name={`publication.${index}.english.name`}
                              className="form-control mb-3"
                              placeholder="Enter Name"
                            />
                            <input
                              type="text"
                              onChange={handleChange}
                              name={`publication.${index}.marathi.name`}
                              className="form-control"
                              placeholder="नाव संपादित करा"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-3 col-form-label"
                          >
                            Add English Document :
                          </label>
                          <div className="col-sm-9">
                            <div className="custom-file">
                              <input
                                type="file"
                                title={
                                  data.publication &&
                                    data.publication[index] &&
                                    data.publication[index].english.document
                                    ? data.publication[index].english.document
                                      .name || "Please choose a file"
                                    : "Please choose a file"
                                }
                                onChange={handleChange}
                                name={`publication.${index}.english.document`}
                                accept="application/pdf"
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
                                Document -{" "}
                                {data.publication &&
                                  data.publication[index] &&
                                  data.publication[index].english.document
                                  ? data.publication[index].english.document
                                    .name
                                  : ""}
                              </label>
                            </div>
                            <p className="photo_disclaimer">
                              {" "}
                              *Only upload PDF format document
                            </p>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-3 col-form-label"
                          >
                            Add Marathi Document :
                          </label>
                          <div className="col-sm-9">
                            <div className="custom-file">
                              <input
                                type="file"
                                title={
                                  data.publication &&
                                    data.publication[index] &&
                                    data.publication[index].marathi.document
                                    ? data.publication[index].marathi.document
                                      .name || "Please choose a file"
                                    : "Please choose a file"
                                }
                                onChange={handleChange}
                                name={`publication.${index}.marathi.document`}
                                accept="application/pdf"
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
                                Document -{" "}
                                {data.publication &&
                                  data.publication[index] &&
                                  data.publication[index].marathi.document
                                  ? data.publication[index].marathi.document
                                    .name
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
                          <div
                            onClick={addPublication}
                            className="addSubButton mb-3 mt-3"
                          >
                            <img
                              src={addwhite}
                              // style={{ height: "25px", width: "25px" }}
                              alt="Remove"
                            />
                          </div>
                        )}
                        {index !== 0 && (
                          <div
                            onClick={() => removePublication(index)}
                            className="addSubButton mb-3 mt-3"
                          >
                            <img src={remove} alt="Remove" />
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPublication;
