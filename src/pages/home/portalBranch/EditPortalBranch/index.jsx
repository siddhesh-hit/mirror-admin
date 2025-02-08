import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "assets/back.svg";

import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const EditPortalBranch = () => {
  const [data, setData] = useState({
    marathi: {
      name: "",
    },
    english: {
      name: "",
    },
    for: "",
  });
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname?.split("/");
  const id = location.pathname?.split("/")[pathnameArray.length - 1];

  const fetchData = async () => {
    await getApiById("portalBranch", id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.english.name.trim() === "" || data.marathi.name.trim() === "") {
      toast.error("Please enter a valid branch name");
      return;
    }

    if (data.for === "") {
      toast.error("Please select a valid option");
      return;
    }

    if (isSubmitted) return;
    setSubmit(true);

    await putApi("portalBranch", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Updated Portal Branch");
          setTimeout(() => {
            navigate(paths.viewPortalBranch);
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewPortalBranch}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Edit Portal Branch</h4>
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
                          Edit Portal Branch :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="marathi.name"
                            className="form-control"
                            placeholder="Enter Portal Branch name in marathi"
                            defaultValue={data?.marathi?.name}
                            onChange={(e) =>
                              setData({
                                ...data,
                                marathi: { name: e.target.value },
                              })
                            }
                          />
                          <input
                            type="text"
                            name="english.name"
                            className="form-control my-2"
                            placeholder="Enter Portal Branch name in english"
                            defaultValue={data?.english?.name}
                            onChange={(e) =>
                              setData({
                                ...data,
                                english: { name: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit For Portal / User :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            value={data.for}
                            name="for"
                            onChange={(e) =>
                              setData({ ...data, for: e.target.value })
                            }
                          >
                            <option value="" hidden>
                              Select Option
                            </option>
                            <option value="Portal">Portal</option>
                            <option value="CMS">CMS</option>
                          </select>
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

export default EditPortalBranch;
