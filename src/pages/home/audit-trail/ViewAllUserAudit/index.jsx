import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@tanstack/react-query";

import Loader from "components/common/Loader";

import { getApi, getApiForBlob } from "services/axios";
import { api } from "services/api";
import AuditTable from "components/pages/home/audit-trail/Table";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

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
    queryKey: [`user_${id}`, userAudits.auth.current, userAudits.auth.message],
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
    queryKey: [`debate_${id}`, userAudits.debate.current, userAudits.debate.message],
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
    queryKey: [`member_${id}`, userAudits.member.current, userAudits.member.message],
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
    queryKey: [`session_${id}`, userAudits.session.current, userAudits.session.message],
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

  if (userData.isError || debateData.isError || memberData.isError || sessionData.isError) {
    throw new Error("Failed to fetch the data!")
  };

  const handleDownload = async (type) => {
    const querystring = new URLSearchParams({
      userId: id, endPoints: type
    });

    try {
      switch (type) {
        case "auth": {
          querystring.delete("endPoints");
          querystring.append("endPoints", "user/log");
          toast.info("Downloading auth data...");

          // const res = await getApi(`${api.auditUserDownload}?${querystring}`);
          const res = await getApiForBlob(`${api.auditUserDownload}?${querystring}`);
          const filename = res?.headers?.['content-disposition']?.split('filename=')?.[1]?.replace(/"/g, '');
          const url = window.URL.createObjectURL(res.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);

          toast.success(`Data downloaded successfully as ${filename}`);
          break;
        }
        case "debate": {
          querystring.delete("endPoints");
          querystring.append("endPoints", "Debate");
          toast.info("Downloading debate data...");

          const res = await getApiForBlob(`${api.auditUserDownload}?${querystring}`);
          const filename = res?.headers?.['content-disposition']?.split('filename=')?.[1]?.replace(/"/g, '');
          const url = window.URL.createObjectURL(res.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);

          toast.success(`Data downloaded successfully as ${filename}`);
          break;
        }
        case "member": {
          querystring.delete("endPoints");
          querystring.append("endPoints", "Member");
          toast.info("Downloading member data...");

          const res = await getApiForBlob(`${api.auditUserDownload}?${querystring}`);
          const filename = res?.headers?.['content-disposition']?.split('filename=')?.[1]?.replace(/"/g, '');

          const url = window.URL.createObjectURL(res.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);

          toast.success(`Data downloaded successfully as ${filename}`);
          break;
        }
        case "session": {
          querystring.delete("endPoints");
          querystring.append("endPoints", "Session");
          toast.info("Downloading session data...");

          const res = await getApiForBlob(`${api.auditUserDownload}?${querystring}`);
          const filename = res?.headers?.['content-disposition']?.split('filename=')?.[1]?.replace(/"/g, '');

          const url = window.URL.createObjectURL(res.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);

          toast.success(`Data downloaded successfully as ${filename}`);
          break;
        }

        default:
          toast.error("Invalid type");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to download the data");
    }
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Audits in Graph</h4>

          <BarChart
            xAxis={[{ id: "barCategories", data: ["User", "Debate", "Member", "Session"], scaleType: "band" }]}
            series={[{
              data: [
                userData?.data?.count || 0,
                debateData?.data?.count || 0,
                memberData?.data?.count || 0,
                sessionData?.data?.count || 0
              ]
            }]}
            width={500}
            height={300}
          />
        </div>
      </div>

      {
        userData.isFetching
          ? <div className="d-flex justify-content-center align-items-center mt-4">
            <Spinner animation="border" role="status" />
          </div>
          : <AuditTable
            data={userData.data}
            setUsrAud={setUsrAud}
            userAudits={userAudits}
            PER_PAGE_COUNT={PER_PAGE_COUNT}
            header={"• View All Login/Logout Audits"}
            type={"auth"}
            handleDownload={() => handleDownload("auth")}
          />
      }

      {debateData.isFetching
        ? <div className="d-flex justify-content-center align-items-center mt-4">
          <Spinner animation="border" role="status" />
        </div>
        : <AuditTable
          data={debateData.data}
          setUsrAud={setUsrAud}
          userAudits={userAudits}
          PER_PAGE_COUNT={PER_PAGE_COUNT}
          header={"• View All Debate Audits"}
          type={"debate"}
          handleDownload={() => handleDownload("debate")}
        />
      }

      {memberData.isFetching
        ? <div className="d-flex justify-content-center align-items-center mt-4">
          <Spinner animation="border" role="status" />
        </div>
        : <AuditTable
          data={memberData.data}
          setUsrAud={setUsrAud}
          userAudits={userAudits}
          PER_PAGE_COUNT={PER_PAGE_COUNT}
          header={"• View All Member Audits"}
          type={"member"}
          handleDownload={() => handleDownload("member")}
        />
      }
      {sessionData.isFetching
        ? <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
          <Spinner animation="border" role="status" />
        </div>
        : <AuditTable
          data={sessionData.data}
          setUsrAud={setUsrAud}
          userAudits={userAudits}
          PER_PAGE_COUNT={PER_PAGE_COUNT}
          header={"• View All Session Audits"}
          type={"session"}
          handleDownload={() => handleDownload("session")}
        />
      }
    </div>
  );
};

export default ViewAllUserAudit;
