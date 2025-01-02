import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import back from "assets/back.svg";

import { getApiById } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewHelpdesk = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("helpdesk", id)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
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
        <Link to={paths.viewAllHelpdesk} className="addpagess">
          <img src={back} alt="back" style={{ width: "25px" }} />
          Go back
        </Link>

        <h4 className="page-title">• View Helpdesk</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th className="heighttab">Address</th>
                    <th className="heighttab">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>1</td>
                      <td>{data.full_name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone_number}</td>
                      <td>{data.address}</td>
                      <td>{data.feedback}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHelpdesk;
