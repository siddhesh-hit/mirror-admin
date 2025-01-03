import React from "react";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";

function PoliticalJourney({
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
      <h2 className="stepper-form">• Political Journey</h2>
      <form>
        {[...Array(divCount)].map((_, index) => (
          <div className="formss border_names" key={index}>
            <div className="form-group row">
              <label
                htmlFor="inputPassword3"
                className="col-sm-4 col-form-label"
              >
                Add Date :
              </label>
              <div className="col-sm-8">
                <DatePicker
                  name={`political_journey.date.${index}`}
                  label="Select your date"
                  defaultValue={dayjs("")}
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
                Add Title :
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name={`political_journey.title.${index}`}
                  defaultValue={data.political_journey[index].title}
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
                Add Presiding Officer :
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name={`political_journey.presiding.${index}`}
                  onChange={handleChange}
                >
                  <option hidden>Select Presiding Officer</option>
                  {Data.officer.length > 0 ? (
                    Data.officer.map((it) => (
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
                Add Legislative Position :
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name={`political_journey.legislative_position.${index}`}
                  onChange={handleChange}
                >
                  <option hidden>Select Legislative Position</option>
                  {Data.position.length > 0 ? (
                    Data.position.map((it) => (
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
                Add Designation :
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name={`political_journey.designation.${index}`}
                  onChange={handleChange}
                >
                  <option hidden>Select Designation</option>
                  {Data.designation.length > 0 ? (
                    Data.designation.map((it) => (
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

export default PoliticalJourney;
