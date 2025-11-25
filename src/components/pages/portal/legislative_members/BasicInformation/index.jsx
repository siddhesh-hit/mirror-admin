import { isValidDate } from "lib/dateEnUsFormat";

function BasicInformation({
  currentStep,
  data,
  handleChange,
  error,
  Data,
  setData,
  CKEditor,
  ClassicEditor,
  handleKeyDown,
  DatePicker,
  dayjs,
}) {
  if (currentStep !== 1) {
    return null;
  }
  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Basic Information</h2>
      <form className="border_names">
        <div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              *Add House :
            </label>
            <div className="col-sm-8">
              <input
                type="radio"
                name="basic_info.house"
                value="Council"
                checked={data.basic_info.house === "Council"}
                onChange={handleChange}
                className={`form-check-input`}
              />

              <label className={`form-check-label`} htmlFor="flexRadioDefault1">
                Council
              </label>

              <input
                className={`form-check-input`}
                type="radio"
                name="basic_info.house"
                value="Assembly"
                checked={data.basic_info.house === "Assembly"}
                onChange={handleChange}
              />

              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Assembly
              </label>

              {error?.basic_info?.house ? (
                <p className="red-error mt-3">{error?.basic_info?.house}</p>
              ) : (
                <></>
              )}
            </div>
          </div>

          {data.basic_info.house === "Assembly" && (
            <div className="form-group row">
              <label
                htmlFor="inputPassword3"
                className="col-sm-4 col-form-label"
              >
                Assembly Number :
              </label>
              <div className="col-sm-8">
                <select
                  className={`form-control ${error?.basic_info?.assembly_number ? "activeError" : ""
                    }`}
                  name="basic_info.assembly_number"
                  value={data.basic_info.assembly_number ? data.basic_info.assembly_number._id : data.basic_info.assembly_number}
                  onChange={handleChange}
                >
                  <option hidden>Select Assembly Number</option>
                  {Data.assembly.length > 0 ? (
                    Data.assembly.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.assembly_number}
                      </option>
                    ))
                  ) : (
                    <option hidden>Select Assembly Number</option>
                  )}
                </select>

                {error?.basic_info?.assembly_number ? (
                  <p className="red-error">
                    {error?.basic_info?.assembly_number}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}

          {data.basic_info.house === "Council" && (
            <>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Constituency From :
                </label>
                <div className="col-sm-8">
                  <DatePicker
                    name="basic_info.constituency_from"
                    label="Select constituency from"
                    defaultValue={data.basic_info.constituency_from || dayjs("")}
                    onChange={(date) => {
                      setData((prev) => ({
                        ...prev,
                        basic_info: {
                          ...prev.basic_info,
                          constituency_from: date.format(),
                        },
                      }));
                    }}
                    format="DD/MM/YYYY"
                    minDate={dayjs("1937-01-01")}
                    maxDate={dayjs(new Date().toISOString().split("T")[0])}
                    className={`form-control`}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Constituency To :
                </label>
                <div className="col-sm-8">
                  <DatePicker
                    name="basic_info.constituency_to"
                    label="Select constituency to"
                    defaultValue={data.basic_info.constituency_to || dayjs("")}
                    onChange={(date) => {
                      setData((prev) => ({
                        ...prev,
                        basic_info: {
                          ...prev.basic_info,
                          constituency_to: date.format(),
                        },
                      }));
                    }}
                    format="DD/MM/YYYY"
                    minDate={
                      data.basic_info.constituency_from && isValidDate(data.basic_info.constituency_from)
                        ? dayjs(
                          new Date(data.basic_info.constituency_from)
                            .toISOString()
                            .split("T")[0]
                        )
                        : dayjs("1937-01-01")
                    }
                    maxDate={dayjs(new Date().toISOString().split("T")[0])}
                    className={`form-control`}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
            *Add Profile :
          </label>
          <div className="col-sm-8">
            <div className="custom-file">
              <input
                type="file"
                title={data.basic_info.profile?.filename || data.basic_info.profile.name || "Please choose a file"}
                name="basic_info.profile"
                accept="image/png, image/jpeg, image.jpg"
                onChange={handleChange}
                className="custom-file-input"
                id="customFile"
              />

              {error?.basic_info?.profile ? (
                <p className="red-error mt-3">{error?.basic_info?.profile}</p>
              ) : (
                <></>
              )}

              <label
                style={{ zIndex: "0" }}
                className={`custom-file-label ${error?.basic_info?.profile ? "activeError" : ""}`}
                htmlFor="customFile"
              >
                Image -{" "}
                {data.basic_info.profile ? data.basic_info.profile?.filename || data.basic_info.profile.name : ""}
              </label>
            </div>
            <p className="photo_disclaimer">
              *Only upload JPEG/JPG/PNG format assets
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
            *Add Jeevan Parichay :
          </label>
          <div className="col-sm-8">
            <div className="custom-file">
              <input
                type="file"
                title={data.jeevan_parichay?.filename || data.jeevan_parichay?.name || "Please choose a file"}
                name="jeevan_parichay"
                accept="application/pdf"
                onChange={handleChange}
                className="custom-file-input"
                id="customFile"
              />

              {error?.jeevan_parichay ? (
                <p className="red-error mt-3">{error?.jeevan_parichay}</p>
              ) : (
                <></>
              )}

              <label
                style={{ zIndex: "0" }}
                className={`custom-file-label ${error?.jeevan_parichay ? "activeError" : ""}`}
                htmlFor="customFile"
              >
                Document -{" "}
                {data.jeevan_parichay ? data.jeevan_parichay?.filename || data.jeevan_parichay?.name : ""}
              </label>
            </div>
            <p className="photo_disclaimer">
              *Only upload PDF format document
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Add Name :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.name"
              defaultValue={data.basic_info.name}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.name ? "activeError" : ""}`}
              placeholder="Enter Name"
            />
            {error?.basic_info?.name ? (
              <p className="red-error mt-3">{error?.basic_info?.name}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Add Surname :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.surname"
              defaultValue={data.basic_info.surname}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.surname ? "activeError" : ""}`}
              placeholder="Enter Surname"
            />
            {error?.basic_info?.surname ? (
              <p className="red-error mt-3">{error?.basic_info?.surname}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Add Constituency :
          </label>
          <div className="col-sm-8">
            <select
              className={`form-control ${error?.basic_info?.constituency ? "activeError" : ""}`}
              name="basic_info.constituency"
              value={data.basic_info.constituency._id || data.basic_info.constituency}
              onChange={handleChange}
            >
              <option hidden>Select Constituency</option>
              {Data.constituency.length > 0 ? (
                Data.constituency.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.council.constituency_name !== ""
                      ? item.council.constituency_name
                      : item.assembly.constituency_name}
                  </option>
                ))
              ) : (
                <option hidden>Select Constituency</option>
              )}
            </select>
            {error?.basic_info?.constituency ? (
              <p className="red-error mt-3">
                {error?.basic_info?.constituency}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Add Party :
          </label>
          <div className="col-sm-8">
            <select
              className={`form-control ${error?.basic_info?.party ? "activeError" : ""
                }`}
              name="basic_info.party"
              value={data.basic_info.party._id || data.basic_info.party}
              onChange={handleChange}
            >
              <option hidden>Select Party</option>
              {Data.party.length > 0 ? (
                Data.party.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.english.party_name}
                  </option>
                ))
              ) : (
                <option hidden>Select Party</option>
              )}
            </select>
            {error?.basic_info?.party ? (
              <p className="red-error mt-3">{error?.basic_info?.party}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Add Gender :
          </label>
          <div className="col-sm-8">
            <select
              className={`form-control ${error?.basic_info?.gender ? "activeError" : ""
                }`}
              name="basic_info.gender"
              value={data.basic_info.gender._id || data.basic_info.gender}
              onChange={handleChange}
            >
              <option hidden>Select Gender</option>
              {Data.gender.length > 0 ? (
                Data.gender.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.marathi.gender}
                  </option>
                ))
              ) : (
                <option hidden>Select Gender</option>
              )}
            </select>
            {error?.basic_info?.gender ? (
              <p className="red-error mt-3">{error?.basic_info?.gender}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Add District :
          </label>
          <div className="col-sm-8">
            <select
              className={`form-control ${error?.basic_info?.district ? "activeError" : ""
                }`}
              name="basic_info.district"
              value={data.basic_info.district._id || data.basic_info.district}
              onChange={handleChange}
            >
              <option hidden>Select District</option>
              {Data.district.length > 0 ? (
                Data.district.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.english.district}
                  </option>
                ))
              ) : (
                <option hidden>Select District</option>
              )}
            </select>
            {error?.basic_info?.district ? (
              <p className="red-error mt-3">{error?.basic_info?.district}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add First Time Elected ? :
          </label>
          <div className="col-sm-8">
            <select
              className={`form-control ${error?.basic_info?.first_time_elected ? "activeError" : ""}`}
              name="basic_info.first_time_elected"
              value={data.basic_info.first_time_elected}
              onChange={handleChange}
            >
              <option hidden>Select Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            {error?.basic_info?.first_time_elected ? (
              <p className="red-error mt-3">
                {error?.basic_info?.first_time_elected}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Date of Birth :
          </label>
          <div className="col-sm-8">
            <DatePicker
              name="basic_info.date_of_birth"
              label="Select Date of Birth"
              value={dayjs(data?.basic_info?.date_of_birth) || dayjs("")}
              onChange={(date) => {
                setData((prev) => ({
                  ...prev,
                  basic_info: {
                    ...prev.basic_info,
                    date_of_birth: date.format(),
                  },
                }));
              }}
              format="DD/MM/YYYY"
              minDate={dayjs("1937-01-01")}
              maxDate={dayjs(new Date().toISOString().split("T")[0])}
              className={`form-control`}
            />

            {error?.basic_info?.date_of_birth ? (
              <p className="red-error mt-3">
                {error?.basic_info?.date_of_birth}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Place of Birth :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.place_of_birth"
              defaultValue={data.basic_info.place_of_birth}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.place_of_birth ? "activeError" : ""
                }`}
              placeholder="Enter Place of Birth"
            />
            {error?.basic_info?.place_of_birth ? (
              <p className="red-error mt-3">
                {error?.basic_info?.place_of_birth}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Education :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.education"
              defaultValue={data.basic_info.education}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.education ? "activeError" : ""
                }`}
              placeholder="Enter Education"
            />
            {error?.basic_info?.education ? (
              <p className="red-error mt-3">{error?.basic_info?.education}</p>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Language :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.language"
              defaultValue={data.basic_info.language}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.language ? "activeError" : ""
                }`}
              placeholder="Enter Language"
            />
            {error?.basic_info?.language ? (
              <p className="red-error mt-3">{error?.basic_info?.language}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Marital Status :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.marital_status"
              defaultValue={data.basic_info.marital_status}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.marital_status ? "activeError" : ""
                }`}
              placeholder="Enter Marital Status"
            />
            {error?.basic_info?.marital_status ? (
              <p className="red-error mt-3">
                {error?.basic_info?.marital_status}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Children :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.children"
              defaultValue={data.basic_info.children}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.children ? "activeError" : ""
                }`}
              placeholder="Enter Children"
            />
            {error?.basic_info?.children ? (
              <p className="red-error mt-3">{error?.basic_info?.children}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Business :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.business"
              defaultValue={data.basic_info.business}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.business ? "activeError" : ""
                }`}
              placeholder="Enter Business"
            />
            {error?.basic_info?.business ? (
              <p className="red-error mt-3">{error?.basic_info?.business}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Hobby :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.hobby"
              defaultValue={data.basic_info.hobby}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.hobby ? "activeError" : ""
                }`}
              placeholder="Enter Hobby"
            />
            {error?.basic_info?.hobby ? (
              <p className="red-error mt-3">{error?.basic_info?.hobby}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Foreign Journey :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.foreign_migration"
              defaultValue={data.basic_info.foreign_migration}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.foreign_migration ? "activeError" : ""
                }`}
              placeholder="Enter Foreign Journey"
            />
            {error?.basic_info?.foreign_migration ? (
              <p className="red-error mt-3">
                {error?.basic_info?.foreign_migration}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Address :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.address"
              defaultValue={data.basic_info.address}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.address ? "activeError" : ""
                }`}
              placeholder="Enter Address"
            />
            {error?.basic_info?.address ? (
              <p className="red-error mt-3">{error?.basic_info?.address}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Address 1 :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.address1"
              defaultValue={data.basic_info.address1}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.address1 ? "activeError" : ""
                }`}
              placeholder="Enter Address 1"
            />
            {error?.basic_info?.address1 ? (
              <p className="red-error mt-3">{error?.basic_info?.address1}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Mobile Number :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.mobile_number"
              // min={10}
              // max={10}
              defaultValue={data.basic_info.mobile_number}
              onChange={handleChange}
              // onKeyDown={handleKeyDown}
              className={`form-control ${error?.basic_info?.mobile_number ? "activeError" : ""
                }`}
              placeholder="Enter Mobile Number"
            />
            {error?.basic_info?.mobile_number ? (
              <p className="red-error mt-3">
                {error?.basic_info?.mobile_number}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Email Address :
          </label>
          <div className="col-sm-8">
            <input
              type="email"
              name="basic_info.email"
              defaultValue={data.basic_info.email}
              onChange={handleChange}
              className={`form-control ${error?.basic_info?.email ? "activeError" : ""
                }`}
              placeholder="Enter Email Address"
            />
            {error?.basic_info?.email ? (
              <p className="red-error mt-3">{error?.basic_info?.email}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Awards :
          </label>
          <div className="col-sm-8">
            <CKEditor
              editor={ClassicEditor}
              data={data?.basic_info?.awards}
              className={`form-control ${error?.basic_info?.awards ? "activeError" : ""}`}
              name="english.about_us-description"
              onChange={(event, value) =>
                setData((prev) => ({
                  ...prev,
                  basic_info: {
                    ...prev.basic_info,
                    awards: value.getData(),
                  },
                }))
              }
              config={{ placeholder: "Enter Award" }}
            />
            {error?.basic_info?.awards ? (
              <p className="red-error mt-3">{error?.basic_info?.awards}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Add Other Information :
          </label>
          <div className="col-sm-8">
            <CKEditor
              editor={ClassicEditor}
              data={data?.basic_info?.other_info}
              className={`form-control ${error?.basic_info?.other_info ? "activeError" : ""}`}
              name="english.about_us-description"
              onChange={(event, value) =>
                setData((prev) => ({
                  ...prev,
                  basic_info: {
                    ...prev.basic_info,
                    other_info: value.getData(),
                  },
                }))
              }
              config={{ placeholder: "Enter Other Information" }}
            />
            {error?.basic_info?.other_info ? (
              <p className="red-error mt-3">{error?.basic_info?.other_info}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default BasicInformation;
