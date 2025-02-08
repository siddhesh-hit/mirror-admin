import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import back from "assets/back.svg";

import { getApiById } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewFeedback = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const pathnameArray = location.pathname?.split("/");
  const id = location.pathname?.split("/")[pathnameArray.length - 1];
  const fetchData = async () => {
    await getApiById("feedback", id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllFeedback} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• View Feedbacks</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>1</td>
                      <td>{data.full_name}</td>
                      <td>{data.email}</td>
                      <td>{data.subject}</td>
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

export default ViewFeedback;
