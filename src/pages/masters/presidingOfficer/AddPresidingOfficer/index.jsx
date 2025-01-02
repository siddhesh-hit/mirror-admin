import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import add from "assets/back.svg";
import { postApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const AddPresidingOfficer = () => {
  const [data, setData] = useState("");

  const navigate = useNavigate();
  const [isSubmitted, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setSubmit(true);
    if (data === "") {
      toast.error("Please enter the officer");
      return;
    }
    await postApi("officer", { name: data })
      .then((res) => {
        if (res.data.success) {
          toast.success("officer created!");
          setTimeout(() => {
            navigate(paths.viewPresidingOfficer);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });

    setSubmit(false);
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewPresidingOfficer}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Add Presiding Officer</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Presiding Officer :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Presiding Officer"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="submit123 mt-5">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPresidingOfficer;
