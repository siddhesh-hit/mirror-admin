import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import add from "assets/back.svg";
import { routes, auth } from "data/RouteStructure";
import { getApi } from "services/axios";

const AddTask = () => {
  const [user, setUser] = useState([]);

  const options = routes.map((item) => {
    let data = {
      value: item,
      label: item,
    };
    return data;
  });

  useEffect(() => {
    const fetchData = async () => {
      await getApi("user")
        .then((res) => setUser(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={"/ViewTask"}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Add Task Management</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Select Department :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option hidden>Select Department</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Select User :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option hidden>Select User</option>
                            {user &&
                              user?.map((item, index) => (
                                <option key={index} value={item._id}>
                                  {item.full_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Task Name :
                        </label>
                        <div className=" col-sm-8">
                          <Select
                            isMulti
                            name="colors"
                            options={options}
                            onChange={(e) => console.log(e)}
                            className=""
                            classNamePrefix="select"
                            placeholder="Select CMS Pages"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Activity :
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            placeholder="Enter Description"
                            className="form-control"
                            rows="3"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Task Approval Authority :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option hidden>
                              Select Task Approval Authority
                            </option>
                            {auth.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
