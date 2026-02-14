import { useEffect, useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import Paginate from "components/common/Pagination";
import TotalEntries from "components/common/TotalEntries";
import Loader from "components/common/Loader";

import add from "assets/add.svg";

import { getApi, postApi, deleteApi } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";
import { formatEnUsDate } from "lib/dateEnUsFormat";
import { api } from "services/api";

const ViewAllLegislativeMember = () => {
  const [data, setData] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    "basic_info.name": "",
    house: "All",
    assembly: "All",
    constituency_from: null,
    constituency_to: null,
  });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateError, setDateError] = useState("");
  const [isSubmitted, setSubmit] = useState({
    post: false,
    del: false,
  });


  const members = useQuery({
    queryKey: ["members", pageOptions.house, pageOptions.assembly, pageOptions.current, pageOptions.page, pageOptions["basic_info.name"]],
    queryFn: async () => {
      const houseFilter = pageOptions.house !== "All" ? pageOptions.house : "";

      const queryString = new URLSearchParams({
        perPage: pageOptions.current,
        perLimit: pageOptions.page,
        name: pageOptions["basic_info.name"],
        house: houseFilter,
        assembly_number: pageOptions.assembly !== "All" ? pageOptions.assembly : "",
        fromdate: pageOptions.constituency_from ? dayjs(pageOptions.constituency_from).format("YYYY-MM-DD") : "",
        todate: pageOptions.constituency_to ? dayjs(pageOptions.constituency_to).format("YYYY-MM-DD") : "",
      });

      const res = await getApi(api.member + `?${queryString}`);
      if (res.data.success) return res.data.data;
      return [];
    },
  })

  const assemblies = useQuery({
    queryKey: ["assemblies"],
    queryFn: async () => {
      const res = await getApi(api.assembly);
      return res.data.success ? res.data.data : [];
    },
  });

  const handleArchiveSubmit = async (data) => {
    let newData = {
      data_object: data,
      action: "Archive",
      state: "Archived",
      modelName: "Member",
      modelId: data._id,
    };

    if (isSubmitted.post) return;

    setSubmit((prev) => ({
      ...prev,
      post: true,
    }));

    await postApi(`/archive`, newData)
      .then((res) => {
        if (res.data.success) {
          toast.success("An entry archived!");
          members.refetch();
        }
      })
      .catch((err) => console.log(err));

    setSubmit((prev) => ({
      ...prev,
      post: false,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      if (isSubmitted.del) return;

      setSubmit((prev) => ({
        ...prev,
        del: true,
      }));
      await deleteApi("member", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Delete request forwaded!");
            members.refetch();
          }
        })
        .catch((err) => toast.error("Failed to delete the member."));

      setSubmit((prev) => ({
        ...prev,
        del: false,
      }));
    }
  };

  if (assemblies.isLoading || members.isLoading) return <Loader />;
  if (members.isError) return toast.error("Something went wrong while fetching member data!");
  if (assemblies.isError) return toast.error("Something went wrong while fetching assemblies!");

  console.log(members?.data)

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.addLegislativeMember} className="addpagess">
            <img src={add} alt="add" />
            Add Legislative Member
          </Link>

          <h4 className="page-title">• View All Legislative Members</h4>
          <TotalEntries
            returnCount={(data) => setPageOptions((prev) => ({ ...prev, page: data }))}
            returnSearch={(data) => setPageOptions((prev) => ({ ...prev, "basic_info.name": data }))}
            searchQuery="the name"
          />
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Name</th>
                      <th>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" className="p-0 text-dark text-decoration-none">
                            House
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => setPageOptions((prev) => ({ ...prev, house: "All", current: 0 }))}
                              active={pageOptions.house === "All"}
                            >
                              All
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setPageOptions((prev) => ({ ...prev, house: "Assembly", current: 0 }))}
                              active={pageOptions.house === "Assembly"}
                            >
                              Assembly
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setPageOptions((prev) => ({ ...prev, house: "Council", current: 0 }))}
                              active={pageOptions.house === "Council"}
                            >
                              Council
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </th>
                      <th>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" className="p-0 text-dark text-decoration-none">
                            Assembly No.
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => setPageOptions((prev) => ({ ...prev, assembly: "All", current: 0 }))}
                              active={pageOptions.assembly === "All"}
                            >
                              All
                            </Dropdown.Item>
                            {assemblies.data?.length > 0 && assemblies.data.map((assembly) => (
                              <Dropdown.Item
                                key={assembly._id}
                                onClick={() => setPageOptions((prev) => ({ ...prev, assembly: assembly._id, current: 0 }))}
                                active={pageOptions.assembly === assembly._id}
                              >
                                {assembly.assembly_number}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </th>
                      <th>
                        <Dropdown show={showDateFilter} onToggle={(isOpen) => setShowDateFilter(isOpen)}>
                          <Dropdown.Toggle variant="link" className="p-0 text-dark text-decoration-none">
                            Constituency Tenure
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="p-3" style={{ minWidth: "320px" }}>
                            <div className="mb-3">
                              <DatePicker
                                label="From Date"
                                value={pageOptions.constituency_from}
                                onChange={(date) => {
                                  setPageOptions((prev) => ({ ...prev, constituency_from: date, current: 0 }));
                                  // Validate: From date should not be after To date
                                  if (pageOptions.constituency_to && date && dayjs(date).isAfter(dayjs(pageOptions.constituency_to))) {
                                    setDateError("From date cannot be after To date");
                                  } else {
                                    setDateError("");
                                  }
                                }}
                                format="DD/MM/YYYY"
                                maxDate={pageOptions.constituency_to || dayjs()}
                                slotProps={{
                                  textField: {
                                    size: "small",
                                    fullWidth: true,
                                    onClick: (e) => e.stopPropagation(),
                                  },
                                  popper: {
                                    onClick: (e) => e.stopPropagation(),
                                  }
                                }}
                              />
                            </div>
                            <div className="mb-3">
                              <DatePicker
                                label="To Date"
                                value={pageOptions.constituency_to}
                                onChange={(date) => {
                                  setPageOptions((prev) => ({ ...prev, constituency_to: date, current: 0 }));
                                  // Validate: To date should not be before From date
                                  if (pageOptions.constituency_from && date && dayjs(date).isBefore(dayjs(pageOptions.constituency_from))) {
                                    setDateError("To date cannot be before From date");
                                  } else {
                                    setDateError("");
                                  }
                                }}
                                format="DD/MM/YYYY"
                                minDate={pageOptions.constituency_from}
                                maxDate={dayjs()}
                                slotProps={{
                                  textField: {
                                    size: "small",
                                    fullWidth: true,
                                    onClick: (e) => e.stopPropagation(),
                                  },
                                  popper: {
                                    onClick: (e) => e.stopPropagation(),
                                  }
                                }}
                              />
                            </div>
                            {dateError && (
                              <div className="alert alert-danger py-1 px-2 mb-2 small">
                                {dateError}
                              </div>
                            )}
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-secondary flex-fill"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPageOptions((prev) => ({ ...prev, constituency_from: null, constituency_to: null, current: 0 }));
                                  setDateError("");
                                  setShowDateFilter(false);
                                  members.refetch();
                                }}
                              >
                                Clear
                              </button>
                              <button
                                className="btn btn-sm btn-primary flex-fill"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!dateError) {
                                    setShowDateFilter(false);
                                    if (pageOptions.house === "Assembly" || pageOptions.house === "All") {
                                      toast.error("Please change house!");
                                    } else {
                                      members.refetch();
                                    }
                                  }
                                }}
                                disabled={!!dateError}
                              >
                                Apply
                              </button>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>Archive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      members?.data && members?.data?.length > 0
                        ? members?.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>
                                {pageOptions.current * pageOptions.page + index + 1}
                              </h4>
                            </td>
                            <td>
                              {item.basic_info.name + " " + item.basic_info.surname}
                            </td>
                            <td>
                              {item.basic_info.house}
                            </td>
                            <td>
                              {item.basic_info?.assembly_number ? item.basic_info?.assembly_number?.assembly_number : "-"}
                            </td>
                            <td>
                              {
                                item.basic_info?.constituency_from && item.basic_info?.constituency_to
                                  ? formatEnUsDate(item.basic_info?.constituency_from) + " to " + formatEnUsDate(item.basic_info?.constituency_to)
                                  : "-"
                              }
                            </td>
                            <td>
                              <Link to={`${removeTailingId(paths.viewMemberProfile)}/${item._id}`}>
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => <Tooltip {...props}>View the data.</Tooltip>}
                                  placement="bottom"
                                >
                                  <i className="fa fa-eye" aria-hidden="true" />
                                </OverlayTrigger>
                              </Link>
                            </td>
                            <td>
                              <Link to={`${removeTailingId(paths.editLegislativeMember)}/${item._id}`}>
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => <Tooltip {...props}>Edit the data.</Tooltip>}
                                  placement="bottom"
                                >
                                  <i className="fa fa-edit" />
                                </OverlayTrigger>
                              </Link>
                            </td>
                            <td>
                              <Link onClick={() => handleDelete(item._id)}>
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => <Tooltip {...props}>Delete the data.</Tooltip>}
                                  placement="top"
                                >
                                  <i className="fa fa-trash" />
                                </OverlayTrigger>
                              </Link>
                            </td>
                            <td>
                              <button onClick={() => handleArchiveSubmit(item)}>
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => <Tooltip {...props}>Archive the data.</Tooltip>}
                                  placement="bottom"
                                >
                                  <i className="fa fa-archive" aria-hidden="true" />
                                </OverlayTrigger>
                              </button>
                            </td>
                          </tr>
                        ))
                        : <tr>
                          <td colSpan={9} className="text-center">No data found</td>
                        </tr>
                    }
                  </tbody>
                </table>
                {members?.count > 0 && (
                  <Paginate
                    perPage={pageOptions.page}
                    totalCount={members?.count}
                    initialPage={pageOptions.current}
                    handlePageChange={(currentPage) => setPageOptions((prev) => ({ ...prev, current: currentPage }))}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllLegislativeMember;
