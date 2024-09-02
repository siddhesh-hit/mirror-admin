import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "assets/add.svg";
import frame from "assets/Frame.svg";
import back from "assets/back.svg";

import { API } from "lib/api";

import { useDataFetchingForBothApis } from "lib/useDataFetchingForBothApis";
import Loading from "components/common/Loader";
import { formatEnUsDate } from "lib/dateEnUsFormat";

const ViewSessionCalendar = () => {
  const { data, loading, error } = useDataFetchingForBothApis("session");
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllCalendar" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• View Session Calendar</h4>
        <div className="card card-info">
          <table className="table table-striped mb-0 table-bordered view_vidhan_mandal ">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Session</th>
                <th>Topic Name</th>
                <th>Houses</th>
                <th>Year</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && (
                <tr>
                  <td>{1}</td>
                  <td>
                    <p>{data?.session?.name}</p>
                  </td>
                  <td>
                    <p>{data?.topic_name}</p>
                  </td>
                  <td>
                    <p>{data?.houses}</p>
                  </td>
                  <td>
                    <p>{new Date(data?.year).getFullYear()}</p>
                  </td>
                  <td>
                    <p>{formatEnUsDate(data?.from_date)}</p>
                  </td>
                  <td>
                    <p>{formatEnUsDate(data?.to_date)}</p>
                  </td>
                  <td>
                    {data.documents.length > 0 ? (
                      data.documents.map((doc, index) => {
                        return (
                          <a
                            key={index}
                            href={
                              API.baseUrl +
                              doc?.document.destination +
                              "/" +
                              doc?.document.filename
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>{doc?.title}</Tooltip>
                              )}
                              placement="top"
                            >
                              <img src={frame} alt="" />
                            </OverlayTrigger>
                          </a>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    <Link to={`/EditSessionCalendar?id=${data._id}`}>
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>Edit the data.</Tooltip>
                        )}
                        placement="bottom"
                      >
                        <i className="fa fa-edit"></i>
                      </OverlayTrigger>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSessionCalendar;
