import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@tanstack/react-query";

import Loader from "components/common/Loader";

import { getApi } from "services/axios";
import { api } from "services/api";
import AuditTable from "components/pages/home/audit-trail/Table";

const ViewAllUserAudit = () => {
  const [userAudits, setUsrAud] = useState({
    auth: { current: 0, message: "" },
    debate: { current: 0, message: "" },
    member: { current: 0, message: "" },
    session: { current: 0, message: "" },
  });

  const { id } = useParams();
  const PER_PAGE_COUNT = 10;

  const userData = useQuery({
    queryKey: [`user`, userAudits.auth.current, userAudits.auth.message],
    queryFn: async () => {
      const querystring = new URLSearchParams({
        perPage: userAudits.auth.current,
        userId: id,
        endPoints: "user/log",
        message: userAudits.auth.message
      });

      const res = await getApi(`${api.auditUser}?${querystring}`);
      return res.data;
    }
  });

  const debateData = useQuery({
    queryKey: [`debate`, userAudits.debate.current, userAudits.debate.message],
    queryFn: async () => {
      const querystring = new URLSearchParams({
        perPage: userAudits.debate.current,
        userId: id,
        endPoints: "Debate",
        message: userAudits.debate.message
      });

      const res = await getApi(`${api.auditUser}?${querystring}`);
      return res.data;
    }
  });

  const memberData = useQuery({
    queryKey: [`member`, userAudits.member.current, userAudits.member.message],
    queryFn: async () => {
      const querystring = new URLSearchParams({
        perPage: userAudits.member.current,
        userId: id,
        endPoints: "Member",
        message: userAudits.member.message
      });

      const res = await getApi(`${api.auditUser}?${querystring}`);
      return res.data;
    }
  });

  const sessionData = useQuery({
    queryKey: [`session`, userAudits.session.current, userAudits.session.message],
    queryFn: async () => {
      const querystring = new URLSearchParams({
        perPage: userAudits.session.current,
        userId: id,
        endPoints: "Session",
        message: userAudits.session.message
      });

      const res = await getApi(`${api.auditUser}?${querystring}`);
      return res.data;
    }
  });

  if (userData.isFetching || debateData.isFetching || memberData.isFetching || sessionData.isFetching) {
    return <Loader />
  };

  if (userData.isError || debateData.isError || memberData.isError || sessionData.isError) {
    throw new Error("Failed to fetch the data!")
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Audits in Graph</h4>

          <BarChart
            xAxis={[{ id: "barCategories", data: ["User", "Debate", "Member", "Session"], scaleType: "band" }]}
            series={[{ data: [userData.data.count, debateData.data.count, memberData.data.count, sessionData.data.count] }]}
            width={500}
            height={300}
          />
        </div>
      </div>

      <AuditTable
        data={userData.data}
        setUsrAud={setUsrAud}
        userAudits={userAudits}
        PER_PAGE_COUNT={PER_PAGE_COUNT}
        header={"• View All Login/Logout Audits"}
        type={"auth"}
      />

      <AuditTable
        data={debateData.data}
        setUsrAud={setUsrAud}
        userAudits={userAudits}
        PER_PAGE_COUNT={PER_PAGE_COUNT}
        header={"• View All Debate Audits"}
        type={"debate"}
      />

      <AuditTable
        data={memberData.data}
        setUsrAud={setUsrAud}
        userAudits={userAudits}
        PER_PAGE_COUNT={PER_PAGE_COUNT}
        header={"• View All Member Audits"}
        type={"member"}
      />

      <AuditTable
        data={sessionData.data}
        setUsrAud={setUsrAud}
        userAudits={userAudits}
        PER_PAGE_COUNT={PER_PAGE_COUNT}
        header={"• View All Session Audits"}
        type={"session"}
      />
    </div>
  );
};

export default ViewAllUserAudit;
