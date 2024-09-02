import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import back from "assets/back.svg";
import remove from "assets/remove.svg";
import addwhite from "assets/addwhite.svg";

import { postApi } from "services/axiosInterceptors";

const AddCommittee = () => {
  const [name, setName] = useState("");
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isSubmitted) return;

    setSubmit(true);
    await postApi("committee", { name: name })
      .then((res) => {
        console.log("res", res);
        if (res && res.data && res.data.success) {
          toast.success("Added Committee");
          setTimeout(() => {
            navigate("/ViewCommittee");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
    setSubmit(false);
  };
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewCommittee" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Committee</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    <div className="form-group row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Committee Name :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          className="form-control mb-3"
                          placeholder="Enter Committee name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-4" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCommittee;
