import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import add from "assets/add.svg";

import { getApiById } from "services/axiosInterceptors";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewHouse = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await getApiById("mandal", "656db61a7c1658e8340891be")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addHouse} className="addpagess">
          <img src={add} alt="add" />
          Add New
        </Link>

        <h4 className="page-title">• View House</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>House Name</th>
                    <th>विधान सभागृहाचे नाव</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <h4>Legislative Council</h4>
                    </td>
                    <td>
                      <h4>विधान परिषद</h4>
                    </td>

                    <td>
                      <a>
                        <i
                          className="fa fa-trash"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </a>
                      <Link to={removeTailingId(paths.editHouse)}>
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHouse;
