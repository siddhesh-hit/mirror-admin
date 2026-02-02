import React from 'react';

import Paginate from "components/common/Pagination";
import { formatEnUsDateTime } from 'lib/dateEnUsFormat';

const AuditTable = (props) => {
    const { data, setUsrAud, userAudits, PER_PAGE_COUNT, header, type, handleDownload } = props;

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="page-title">{header}</h4>

                    <button className="btn btn-primary" onClick={handleDownload}>
                        Download
                    </button>
                </div>

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
                                        {data?.data?.length > 0 && (
                                            data?.data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <h4>{(userAudits[type].current * PER_PAGE_COUNT) + index + 1}</h4>
                                                    </td>
                                                    <td>{item?.userId?.full_name || "Guest"}</td>
                                                    <td>{item?.statusCode}</td>
                                                    <td>{item?.message}</td>
                                                    <td>{item?.userIp}</td>
                                                    <td>{item?.clientSide || "localHost"}</td>
                                                    <td>{item?.createdAt ? formatEnUsDateTime(item?.createdAt) : "N/A"}</td>
                                                </tr>
                                            )))
                                        }
                                    </tbody>
                                </table>
                                {data?.count > 0 && (
                                    <Paginate
                                        totalCount={data?.count}
                                        perPage={PER_PAGE_COUNT}
                                        handlePageChange={(cp) => setUsrAud((prev) => ({ ...prev, [type]: { ...prev[type], current: cp } }))}
                                        initialPage={userAudits[type].current}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuditTable