import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getApi } from "services/axios";
import { formatEnUsDate } from "lib/dateEnUsFormat";

import add from "assets/view.svg";
import useDebounce from "hooks/useDebounce";
import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import Loader from "components/common/Loader";
import { paths } from "services/paths";

const ViewAudit = () => {
  const [search, setSearch] = useState({
    user: "",
    message: "",
    page: 0,
    limit: 10,
  });

  const debouncedMessage = useDebounce(search.message, 400);

  const fetchData = async () => {
    let route = search.user
      ? `audit?perPage=${search.page}&perLimit=${search.limit}&message=${search.message}&userId=${search.user}`
      : `audit?perPage=${search.page}&perLimit=${search.limit}&message=${search.message}`

    let res = await getApi(route)
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['audits', search.page, search.limit, debouncedMessage, search.user],
    queryFn: fetchData
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.viewAllUserAudit} className="addpagess">
            <img style={{ width: "25px" }} src={add} alt="add" />
            View User Specific Audit
          </Link>
          <h4 className="page-title">• View All Audits</h4>

          <div className="usetype">
            <h3>•Select User Type</h3>
            <select
              className="form-control mb-4"
              name="election_data.constituency"
              value={search.user}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  user: e.target.value,
                }))
              }
            >
              <option hidden>Select Profile</option>
              <option value={"user"}>User</option>
              <option value={"guest"}>Guest</option>
            </select>

            <TotalEntries
              returnCount={(data) =>
                setSearch((prev) => ({
                  ...prev,
                  limit: data,
                }))
              }
              returnSearch={(data) =>
                setSearch((prev) => ({
                  ...prev,
                  message: data,
                }))
              }
              searchQuery="the activity"
            />

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
                        <th>User Ip</th>
                        <th>Client Side</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data && data.data?.length > 0 ? (
                        data.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>
                                {search.page * search.limit + index + 1}
                              </h4>
                            </td>
                            <td>{item?.userId?.full_name || "Guest"}</td>
                            <td>{item?.statusCode}</td>
                            <td style={{ width: "40%" }}>{item?.message}</td>
                            <td>{item?.userIp}</td>
                            <td>{item?.clientSide || "localHost"}</td>
                            <td>{formatEnUsDate(item.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {data?.count > 0 && (
                    <Paginate
                      totalCount={data.count}
                      perPage={search.limit}
                      handlePageChange={(page) => {
                        setSearch((prev) => ({
                          ...prev,
                          page,
                        }));
                      }}
                      initialPage={search.page}
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

export default ViewAudit;
