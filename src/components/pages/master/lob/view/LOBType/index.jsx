import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { removeTailingId } from 'data/RouteStructure';
import Paginate from "components/common/Pagination";
import TotalEntries from 'components/common/TotalEntries';

const LOBType = ({ data, paths, handleDelete, pageOptions, setPageOptions }) => {

    return (
        <React.Fragment>
            <TotalEntries
                returnCount={(data) =>
                    setPageOptions((prev) => ({
                        ...prev,
                        lobType: { ...prev.lobType, page: data },
                    }))
                }
                returnSearch={(data) =>
                    setPageOptions((prev) => ({
                        ...prev,
                        lobType: { ...prev.lobType, topic_name: data }
                    }))
                }
                searchQuery="the topic name"
            />
            <div className="card card-info">
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Alias</th>
                                    <th>LOB</th>
                                    <th>House</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data && data?.data?.length > 0 ? (
                                    data?.data?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h4>{pageOptions.current * pageOptions.page + index + 1}</h4>
                                            </td>
                                            <td>
                                                <h4>{item.name ? item.name : "-"}</h4>
                                            </td>
                                            <td>
                                                <h4>{item.alias ? item.alias : "-"}</h4>
                                            </td>
                                            <td>
                                                <h4>{item.lob?.name ? item.lob?.name : "-"}</h4>
                                            </td>
                                            <td>
                                                <h4>{item?.lob?.house ? item?.lob?.house : "-"}</h4>
                                            </td>
                                            <td>
                                                <h4>{item.isActive ? "Active" : "Inactive"}</h4>
                                            </td>
                                            <td>
                                                <Link to={`${removeTailingId(paths.editLOBType)}/${item._id}`}>
                                                    <OverlayTrigger
                                                        delay={{ hide: 450, show: 300 }}
                                                        overlay={(props) => (
                                                            <Tooltip {...props}>Edit the data.</Tooltip>
                                                        )}
                                                        placement="bottom"
                                                    >
                                                        <i className="fa fa-edit" />
                                                    </OverlayTrigger>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link onClick={() => handleDelete(item._id, "lobType")}>
                                                    <OverlayTrigger
                                                        delay={{ hide: 450, show: 300 }}
                                                        overlay={(props) => (
                                                            <Tooltip {...props}>Delete the data.</Tooltip>
                                                        )}
                                                        placement="top"
                                                    >
                                                        <i className="fa fa-trash" />
                                                    </OverlayTrigger>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </table>
                        {
                            data?.count > 0 && (
                                <Paginate
                                    totalCount={data?.count}
                                    perPage={pageOptions.page}
                                    handlePageChange={(currentPage) => {
                                        setPageOptions((prev) => ({
                                            ...prev,
                                            lobType: {
                                                ...prev.lobType,
                                                current: currentPage,
                                            },
                                        }));
                                    }}
                                    initialPage={pageOptions.current}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LOBType;