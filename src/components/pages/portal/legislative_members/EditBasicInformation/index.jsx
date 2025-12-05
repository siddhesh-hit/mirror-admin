import { formatDateForInput, isValidDate } from "lib/dateEnUsFormat";

function EditBasicInformation({
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

  if (currentStep !== 1) return null;

  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Edit Basic Information</h2>
      <form className="border_names">
        <div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              *Edit House :
            </label>
            <div className="col-sm-8">
              <input
                className="form-check-input"
                type="radio"
                name="basic_info.house"
                value="Council"
                checked={data?.basic_info?.house === "Council"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Council
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="basic_info.house"
                value="Assembly"
                checked={data?.basic_info?.house === "Assembly"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Assembly
              </label>
            </div>
          </div>

          {data?.basic_info?.house === "Assembly" && (
            <div className="form-group row">
              <label
                htmlFor="inputPassword3"
                className="col-sm-4 col-form-label"
              >
                Assembly Number :
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="basic_info.assembly_number"
                  value={data?.basic_info?.assembly_number?._id}
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
              </div>
            </div>
          )}

          {data?.basic_info?.house === "Council" && (
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
                    value={dayjs(data?.basic_info?.constituency_from)}
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
                    value={dayjs(data?.basic_info?.constituency_to)}
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
            *Edit Profile :
          </label>
          <div className="col-sm-8">
            <div className="custom-file">
              <input
                type="file"
                title={
                  data?.basic_info?.profile?.filename ||
                  data?.basic_info?.profile?.name ||
                  "Please choose a file"
                }
                name="basic_info.profile"
                accept="image/png, image/jpeg, image.jpg"
                onChange={handleChange}
                className="custom-file-input"
                id="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Image -{" "}
                {data?.basic_info?.profile?.filename ||
                  data?.basic_info?.profile?.name}
              </label>
            </div>
            <p className="photo_disclaimer">
              {" "}
              *Only upload JPEG/JPG/PNG format assets
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
            *Edit Jeevan Parichay :
          </label>
          <div className="col-sm-8">
            <div className="custom-file">
              <input
                type="file"
                title={data?.jeevan_parichay?.filename || data?.jeevan_parichay?.name || "Please choose a file"}
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
                {data?.jeevan_parichay ? data?.jeevan_parichay?.filename || data?.jeevan_parichay?.name : ""}
              </label>
            </div>
            <p className="photo_disclaimer">
              *Only upload PDF format document
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Name :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.name"
              defaultValue={data?.basic_info?.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Surname :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.surname"
              defaultValue={data?.basic_info?.surname}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Surname"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Constituency :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.constituency"
              value={data?.basic_info?.constituency?._id}
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
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Party :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.party"
              value={data?.basic_info?.party?._id}
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
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Gender :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.gender"
              value={data?.basic_info?.gender?._id}
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
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit District :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.district"
              value={data?.basic_info?.district?._id}
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
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit First Time Elected ? :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.first_time_elected"
              value={data?.basic_info?.first_time_elected}
              onChange={handleChange}
            >
              <option hidden>Select Option</option>
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Date of Birth :
          </label>
          <div className="col-sm-8">
            <DatePicker
              name="basic_info.date_of_birth"
              label="Select Date of Birth"
              value={dayjs(data?.basic_info?.date_of_birth)}
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
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Place of Birth :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.place_of_birth"
              defaultValue={data?.basic_info?.place_of_birth}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Place of Birth"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Education :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.education"
              defaultValue={data?.basic_info?.education}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Education"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Language :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.language"
              defaultValue={data?.basic_info?.language}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Language"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Marital Status :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.marital_status"
              defaultValue={data?.basic_info?.marital_status}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Marital Status"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Children :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.children"
              defaultValue={data?.basic_info?.children}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Children"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Business :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.business"
              defaultValue={data?.basic_info?.business}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Business"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Hobby :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.hobby"
              defaultValue={data?.basic_info?.hobby}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Hobby"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Foreign Migration :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.foreign_migration"
              defaultValue={data?.basic_info?.foreign_migration}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Foreign Migration"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Address :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.address"
              defaultValue={data?.basic_info?.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter address"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Address 1 :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.address1"
              defaultValue={data?.basic_info?.address1}
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
            *Edit Mobile Number :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              // onKeyDown={handleKeyDown}
              name="basic_info.mobile_number"
              defaultValue={data?.basic_info?.mobile_number}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Mobile Number"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Email Address :
          </label>
          <div className="col-sm-8">
            <input
              type="email"
              name="basic_info.email"
              defaultValue={data?.basic_info?.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Email Address"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            *Edit Awards :
          </label>
          <div className="col-sm-8">
            <CKEditor
              editor={ClassicEditor}
              // data={editorData}
              className={`form-control ${error?.basic_info?.awards ? "activeError" : ""}`}
              data={data?.english?.awards}
              name="basic_info.awards"
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
            *Edit Other Information :
          </label>
          <div className="col-sm-8">
            <CKEditor
              editor={ClassicEditor}
              className={`form-control ${error?.basic_info?.other_info ? "activeError" : ""}`}
              data={data?.english?.other_info}
              name="basic_info.other_info"
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

export default EditBasicInformation;
