import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";

import Paginate from "components/common/Pagination";

import { getApi } from "services/axiosInterceptors";
import { formatEnUsDateTime } from "lib/dateEnUsFormat";

const ViewUserAudit = () => {
  const [userAudits, setUsrAud] = useState({
    auth: {
      data: [],
      count: 0,
      current: 0,
      message: "",
    },
    debate: {
      data: [],
      count: 0,
      current: 0,
      message: "",
    },
    member: {
      data: [],
      count: 0,
      current: 0,
      message: "",
    },
    session: {
      data: [],
      count: 0,
      current: 0,
      message: "",
    },
  });

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchUserData = async () => {
    await getApi(
      `/audit/user?perPage=${userAudits.auth.current}&userId=${id}&endPoints=user/log&message=${userAudits.auth.message}`
    )
      .then((res) => {
        if (res.data.success) {
          setUsrAud((prev) => ({
            ...prev,
            auth: {
              ...prev.auth,
              data: res.data.data,
              count: res.data.count,
            },
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchDebateData = async () => {
    await getApi(
      `/audit/user?perPage=${userAudits.debate.current}&userId=${id}&endPoints=Debate&message=${userAudits.debate.message}`
    )
      .then((res) => {
        if (res.data.success) {
          setUsrAud((prev) => ({
            ...prev,
            debate: {
              ...prev.debate,
              data: res.data.data,
              count: res.data.count,
            },
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchMemberData = async () => {
    await getApi(
      `/audit/user?perPage=${userAudits.member.current}&userId=${id}&endPoints=Member&message=${userAudits.member.message}`
    )
      .then((res) => {
        if (res.data.success) {
          setUsrAud((prev) => ({
            ...prev,
            member: {
              ...prev.member,
              data: res.data.data,
              count: res.data.count,
            },
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchSessionData = async () => {
    await getApi(
      `/audit/user?perPage=${userAudits.session.current}&userId=${id}&endPoints=Session&message=${userAudits.session.message}`
    )
      .then((res) => {
        if (res.data.success) {
          setUsrAud((prev) => ({
            ...prev,
            session: {
              ...prev.session,
              data: res.data.data,
              count: res.data.count,
            },
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, [userAudits.auth.current, userAudits.auth.message]);

  useEffect(() => {
    fetchDebateData();
  }, [userAudits.debate.current, userAudits.debate.message]);

  useEffect(() => {
    fetchMemberData();
  }, [userAudits.member.current, userAudits.member.message]);

  useEffect(() => {
    fetchSessionData();
  }, [userAudits.session.current, userAudits.session.message]);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Audits in Graph</h4>

          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["User", "Debate", "Member", "Session"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [
                  userAudits.auth.count,
                  userAudits.debate.count,
                  userAudits.member.count,
                  userAudits.session.count,
                ],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>

      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Login/Logout Audits</h4>

          <div className="usetype">
            <div className="card card-info">
              <div className="row">
                <div className="col-lg-12">
                  <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Activity</th>
                        <th>UserIp</th>
                        <th>Client Side</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAudits.auth.data &&
                        userAudits.auth.data?.length > 0 ? (
                        userAudits.auth.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>{index + 1}</h4>
                            </td>
                            <td>{item?.userId?.full_name || "Guest"}</td>
                            <td>{item?.statusCode}</td>
                            <td>{item?.message}</td>
                            <td>{item?.userIp}</td>
                            <td>{item?.clientSide || "localHost"}</td>
                            <td>{formatEnUsDateTime(item?.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {userAudits.auth.count > 0 && (
                    <Paginate
                      totalCount={userAudits.auth.count}
                      perPage={10}
                      handlePageChange={(currentPage) => {
                        setUsrAud((prev) => ({
                          ...prev,
                          auth: {
                            ...prev.auth,
                            current: currentPage,
                          },
                        }));
                      }}
                      initialPage={userAudits.auth.current}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Debate Audits</h4>

          <div className="usetype">
            <div className="card card-info">
              <div className="row">
                <div className="col-lg-12">
                  <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Activity</th>
                        <th>UserIp</th>
                        <th>Client Side</th>
                        <th>Query</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAudits.debate.data &&
                        userAudits.debate.data?.length > 0 ? (
                        userAudits.debate.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>{index + 1}</h4>
                            </td>
                            <td>{item?.userId?.full_name || "Guest"}</td>
                            <td>{item?.statusCode}</td>
                            <td>{item?.message}</td>
                            <td>{item?.userIp}</td>
                            <td>{item?.clientSide || "localHost"}</td>
                            <td>
                              {typeof item?.query === "object" ? (
                                <ul>
                                  {Object.keys(item?.query).map((val, ind) => {
                                    let valueExists;
                                    item?.query[val]
                                      ? (valueExists = true)
                                      : (valueExists = false);

                                    return valueExists ? (
                                      <li key={ind}>
                                        {val} - {item?.query[val]}
                                      </li>
                                    ) : (
                                      <React.Fragment
                                        key={ind}
                                      ></React.Fragment>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <>No query</>
                              )}
                            </td>
                            <td>{formatEnUsDateTime(item?.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {userAudits.debate.count > 0 && (
                    <Paginate
                      totalCount={userAudits.debate.count}
                      perPage={10}
                      handlePageChange={(currentPage) => {
                        setUsrAud((prev) => ({
                          ...prev,
                          debate: {
                            ...prev.debate,
                            current: currentPage,
                          },
                        }));
                      }}
                      initialPage={userAudits.debate.current}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Member Audits</h4>

          <div className="usetype">
            <div className="card card-info">
              <div className="row">
                <div className="col-lg-12">
                  <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Activity</th>
                        <th>UserIp</th>
                        <th>Client Side</th>
                        <th>Query</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAudits.member.data &&
                        userAudits.member.data?.length > 0 ? (
                        userAudits.member.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>{index + 1}</h4>
                            </td>
                            <td>{item?.userId?.full_name || "Guest"}</td>
                            <td>{item?.statusCode}</td>
                            <td>{item?.message}</td>
                            <td>{item?.userIp}</td>
                            <td>{item?.clientSide || "localHost"}</td>
                            <td>
                              {typeof item?.query === "object" ? (
                                <ul>
                                  {Object.keys(item?.query).map((val, ind) => {
                                    let valueExists;
                                    item?.query[val]
                                      ? (valueExists = true)
                                      : (valueExists = false);

                                    return valueExists ? (
                                      <li key={ind}>
                                        {val} - {item?.query[val]}
                                      </li>
                                    ) : (
                                      <React.Fragment
                                        key={ind}
                                      ></React.Fragment>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <>No query</>
                              )}
                            </td>
                            <td>{formatEnUsDateTime(item?.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {userAudits.member.count > 0 && (
                    <Paginate
                      totalCount={userAudits.member.count}
                      perPage={10}
                      handlePageChange={(currentPage) => {
                        setUsrAud((prev) => ({
                          ...prev,
                          member: {
                            ...prev.member,
                            current: currentPage,
                          },
                        }));
                      }}
                      initialPage={userAudits.member.current}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Session Audits</h4>

          <div className="usetype">
            <div className="card card-info">
              <div className="row">
                <div className="col-lg-12">
                  <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Activity</th>
                        <th>UserIp</th>
                        <th>Client Side</th>
                        <th>Query</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAudits.session.data &&
                        userAudits.session.data?.length > 0 ? (
                        userAudits.session.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>{index + 1}</h4>
                            </td>
                            <td>{item?.userId?.full_name || "Guest"}</td>
                            <td>{item?.statusCode}</td>
                            <td>{item?.message}</td>
                            <td>{item?.userIp}</td>
                            <td>{item?.clientSide || "localHost"}</td>
                            <td>
                              {typeof item?.query === "object" ? (
                                <ul>
                                  {Object.keys(item?.query).map((val, ind) => {
                                    let valueExists;
                                    item?.query[val]
                                      ? (valueExists = true)
                                      : (valueExists = false);

                                    return valueExists ? (
                                      <li key={ind}>
                                        {val} - {item?.query[val]}
                                      </li>
                                    ) : (
                                      <React.Fragment
                                        key={ind}
                                      ></React.Fragment>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <>No query</>
                              )}
                            </td>
                            <td>{formatEnUsDateTime(item?.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {userAudits.session.count > 0 && (
                    <Paginate
                      totalCount={userAudits.session.count}
                      perPage={10}
                      handlePageChange={(currentPage) => {
                        setUsrAud((prev) => ({
                          ...prev,
                          session: {
                            ...prev.session,
                            current: currentPage,
                          },
                        }));
                      }}
                      initialPage={userAudits.session.current}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserAudit;
