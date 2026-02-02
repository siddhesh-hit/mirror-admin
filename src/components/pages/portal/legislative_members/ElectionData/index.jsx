import React from "react";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";

function ElectionData({
  currentStep,
  data,
  handleChange,
  addDiv,
  removeDiv,
  divCount,
  Data,
  handleKeyDown,
}) {
  if (currentStep !== 3) {
    return null;
  }

  const arrayName = data.election_data?.member_election_result?.length > 0 ? data.election_data?.member_election_result : [...Array(divCount)];
  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Election Data</h2>
      <form>
        <div className="formss">
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              Add Constituency :
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                name="election_data.constituency"
                value={typeof data?.election_data?.constituency === "object" ? data?.election_data?.constituency?._id : data?.election_data?.constituency}
                onChange={handleChange}
              >
                <option hidden value={""}>
                  Select Constituency
                </option>
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
              Add Total Electorate :
            </label>
            <div className="col-sm-8">
              <input
                type="string"
                min={0}
                name="election_data.total_electorate"
                defaultValue={data.election_data?.total_electorate}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Total Electorate Number"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              Add Total Valid Voting :
            </label>
            <div className="col-sm-8">
              <input
                type="string"
                min={0}
                name="election_data.total_valid_voting"
                defaultValue={data.election_data?.total_valid_voting}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Total Valid Voting"
              />
            </div>
          </div>
        </div>
        {arrayName.map((_, index) => (
          <div className="border_name" key={index}>
            <div className="" style={{ padding: "0px 20px" }}>
              <h2 className="stepper-form mb-2 mt-5">
                • Members Election Result
              </h2>
              <div className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-4 col-form-label"
                    >
                      Add Candidate Name :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name={`election_data.member_election_result.candidate_name.${index}`}
                        defaultValue={data.election_data?.member_election_result[index]?.candidate_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Candidate Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-4 col-form-label"
                    >
                      Add Votes :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="string"
                        name={`election_data.member_election_result.votes.${index}`}
                        defaultValue={data.election_data?.member_election_result[index]?.votes}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=" Enter Votes"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-4 col-form-label"
                    >
                      Add Party :
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        name={`election_data.member_election_result.party.${index}`}
                        value={
                          data?.election_data?.member_election_result?.length > 0
                            ? typeof data?.election_data?.member_election_result[index]?.party === "object"
                              ? data?.election_data?.member_election_result[index]?.party?._id
                              : data?.election_data?.member_election_result[index]?.party
                            : ""
                        }
                        onChange={handleChange}
                      >
                        <option hidden value={""}>
                          Select Party
                        </option>
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
                </div>
              </div>
            </div>

            {index === 0 && (
              <div onClick={addDiv} className="addSubButton mb-4">
                <img src={addwhite} alt="add" />
              </div>
            )}
            {index !== 0 && (
              <div onClick={() => removeDiv(index)} className="addSubButton mb-4" >
                <img src={remove} alt="Remove" />
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}

export default ElectionData;