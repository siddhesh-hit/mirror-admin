import React from "react";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";

function EditElectionData({
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

  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Election Data</h2>
      <form className="">
        <div className="formss">
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              Edit Constituency :
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                name="election_data.constituency"
                value={data?.election_data?.constituency?._id || ""}
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
              Edit Total Electorate :
            </label>
            <div className="col-sm-8">
              <input
                type="string"
                name="election_data.total_electorate"
                defaultValue={data.election_data.total_electorate}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Total Electorate Number"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              Edit Total Valid Voting :
            </label>
            <div className="col-sm-8">
              <input
                type="string"
                name="election_data.total_valid_voting"
                defaultValue={data.election_data.total_valid_voting}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Total Valid Voting"
              />
            </div>
          </div>
        </div>
        {data?.election_data &&
          data?.election_data?.member_election_result?.map((item, index) => (
            <div className="border_names" key={index}>
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
                        Edit Candidate Name :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name={`election_data.member_election_result.candidate_name.${index}`}
                          defaultValue={item.candidate_name}
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
                        Edit Votes :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="string"
                          name={`election_data.member_election_result.votes.${index}`}
                          defaultValue={item.votes}
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
                        Edit Party :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name={`election_data.member_election_result.party.${index}`}
                          value={item?.party?._id || ""}
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
                  </div>
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

        {data?.election_data?.member_election_result?.length === 0 && (
          <div onClick={addDiv} className="addSubButton">
            <img
              src={addwhite}
              // style={{ height: "25px", width: "25px" }}
              alt="add"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default EditElectionData;
