import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";
import { postApi } from "services/axiosInterceptors";
import { websiteName } from "data/RouteStructure";

const AddSeo = () => {
  const [data, setData] = useState({
    title: "",
    url: "/",
    description: "",
    keywords: "",
    // author: "",
  });
  const [isSubmitted, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    setSubmit(true);
    await postApi("seo", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("SEO created!");
          setTimeout(() => {
            navigate("/ViewSEO");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmit(false);
  };

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link className="addpagess" to={"/Viewseo"}>
          <img src={back} alt="back" style={{ width: 25 }} />
          Go back
        </Link>
        <h4 className="page-title">• Add Meta Tags</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="formada border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Website page :
                        </label>
                        <div className="col-sm-8">
                          <select
                            name="url"
                            onChange={handleChange}
                            className="form-control mb-3"
                            value={data.url}
                          >
                            <option hidden>Select Website to add SEO :</option>
                            {websiteName.map((item, index) => (
                              <option key={index} value={item.path}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Title :
                        </label>
                        <div className="col-sm-8">
                          <input
                            className="form-control mb-3"
                            type="text"
                            value={data.title}
                            name="title"
                            placeholder="Enter title name to show in website."
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Description:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            placeholder="Enter description to show in website."
                            value={data.description}
                            onChange={handleChange}
                            name="description"
                            className="form-control mb-3"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Keywords:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            value={data.keywords}
                            placeholder="Enter Keywords to show in website."
                            onChange={handleChange}
                            name="keywords"
                            className="form-control mb-3"
                          />
                        </div>
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
  );
};

export default AddSeo;
