import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "assets/back.svg";

import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const EditSessionField = () => {
  const [data, setData] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname?.split("/");
  const id = location.pathname?.split("/")[pathnameArray.length - 1];

  const handleChange = (e) => {
    let { name, value } = e.target;
    let [lang, field] = name.split(".");

    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setSubmit(true);
    await putApi("sessionField", id, data)
      .then((res) => {
        if (res.data.success) {
          navigate(paths.viewSessionField);
          toast.success("Session Field updated!");
        }
      })
      .catch((err) => console.log(err));
    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApiById(`sessionField`, id)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewSessionField}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Edit Session Field</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form onSubmit={handleSubmit} className="form-horizontal">
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Session Field :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="marathi.name"
                            defaultValue={data?.marathi?.name}
                            onChange={handleChange}
                            className="form-control "
                            placeholder="Enter Marathi Session Field"
                          />
                          <input
                            type="text"
                            name="english.name"
                            defaultValue={data?.english?.name}
                            onChange={handleChange}
                            className="form-control mt-3"
                            placeholder="Enter English Session Field"
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
    </div >
  );
};

export default EditSessionField;
