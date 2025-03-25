import React from "react";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";
import { formatDateForInput } from "lib/dateEnUsFormat";

function EditPoliticalJourney({
  currentStep,
  data,
  setData,
  handleChange,
  addDiv,
  removeDiv,
  divCount,
  Data,
  handleKeyDown,
  DatePicker,
  dayjs,
}) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Legislative Journey</h2>
      <form>
        {data?.political_journey &&
          data?.political_journey?.map((item, index) => (
            <div className="formss border_names" key={index}>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Date :
                </label>
                <div className="col-sm-8">
                  <DatePicker
                    name={`political_journey.date.${index}`}
                    label="Select your date"
                    value={dayjs(item?.date)}
                    onChange={(date) =>
                      setData((prev) => {
                        const politicals = [...prev.political_journey];
                        politicals[index] = {
                          ...politicals[index],
                          date: date.format(),
                        };
                        prev.political_journey = politicals;
                        return prev;
                      })
                    }
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
                  Edit Title :
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name={`political_journey.title.${index}`}
                    defaultValue={item.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Presiding Officer :
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    name={`political_journey.presiding.${index}`}
                    value={item?.presiding?._id}
                    onChange={handleChange}
                  >
                    <option hidden>Select Presiding Officer</option>
                    {Data?.officer?.length > 0 ? (
                      Data?.officer.map((it) => (
                        <option key={it._id} value={it._id}>
                          {it.name}
                        </option>
                      ))
                    ) : (
                      <option hidden>Select Presiding Officer</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Legislative Position :
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    name={`political_journey.legislative_position.${index}`}
                    value={item?.legislative_position?._id}
                    onChange={handleChange}
                  >
                    <option hidden>Select Legislative Position</option>
                    {Data?.position?.length > 0 ? (
                      Data?.position?.map((it) => (
                        <option key={it._id} value={it._id}>
                          {it.name}
                        </option>
                      ))
                    ) : (
                      <option hidden>Select Legislative Position</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Designation :
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    name={`political_journey.designation.${index}`}
                    value={item?.designation?._id}
                    onChange={handleChange}
                  >
                    <option hidden>Select Designation</option>
                    {Data?.designation?.length > 0 ? (
                      Data?.designation?.map((it) => (
                        <option key={it._id} value={it._id}>
                          {it.name}
                        </option>
                      ))
                    ) : (
                      <option hidden>Select Designation</option>
                    )}
                  </select>
                </div>
              </div>
              {index === 0 && (
                <div onClick={addDiv} className="addSubButton">
                  <img
                    src={addwhite}
                    // style={{ height: "25px", width: "25px" }}
                    alt="add"
                  />
                </div>
              )}
              {index !== 0 && (
                <div onClick={() => removeDiv(index)} className="addSubButton">
                  <img src={remove} alt="Remove" />
                </div>
              )}
            </div>
          ))}
      </form>
    </div>
  );
}

export default EditPoliticalJourney;
