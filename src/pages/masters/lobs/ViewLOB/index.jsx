import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useQueries, useQueryClient } from "@tanstack/react-query";

import add from "assets/add.svg";
import ViewLOBData from 'components/pages/master/lob/view/LOB';
import ViewLOBTypeData from 'components/pages/master/lob/view/LOBType';
import ViewLOBSubTypeData from 'components/pages/master/lob/view/LOBSubType';

import { api } from 'services/api';
import { paths } from 'services/paths';
import { getApi, deleteApi } from 'services/axios';

const ViewLOB = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [pageOptions, setPageOptions] = useState({
        lob: {
            current: 0,
            page: 10,
            count: 0,
            topic_name: "",
        },
        lobType: {
            current: 0,
            page: 10,
            count: 0,
            topic_name: "",
        },
        lobSubType: {
            current: 0,
            page: 10,
            count: 0,
            topic_name: "",
        }
    });

    const fetchAPIs = async (type = "") => {
        switch (type) {
            case "lob":
                {
                    try {
                        const queryString = new URLSearchParams({
                            perPage: pageOptions.lob.current,
                            perLimit: pageOptions.lob.page,
                            query: pageOptions.lob.topic_name,
                        });
                        const res = await getApi(`${api.lob}?${queryString}`);
                        return res.data.success ? res.data : [];
                    } catch (error) {
                        toast.error("Failed to fetch LOB data!")
                        return null;
                    }
                }
            case "lobType":
                {
                    try {
                        const queryString = new URLSearchParams({
                            perPage: pageOptions.lobType.current,
                            perLimit: pageOptions.lobType.page,
                            query: pageOptions.lobType.topic_name,
                        });
                        const res = await getApi(`${api.lobType}?${queryString}`);
                        return res.data.success ? res.data : [];
                    } catch (error) {
                        toast.error("Failed to fetch LOB Type data!")
                        return null;
                    }
                }
            case "lobSubType":
                {
                    try {
                        const queryString = new URLSearchParams({
                            perPage: pageOptions.lobSubType.current,
                            perLimit: pageOptions.lobSubType.page,
                            query: pageOptions.lobSubType.topic_name,
                        });
                        const res = await getApi(`${api.lobSubType}?${queryString}`);
                        return res.data.success ? res.data : [];
                    } catch (error) {
                        toast.error("Failed to fetch LOB Sub Type data!")
                        return null;
                    }
                }

            default:
                toast.error("Wrong API call!")
                return null;
        };

    };

    const data = useQueries({
        queries: [
            {
                queryKey: ["lob", pageOptions.lob.current, pageOptions.lob.page, pageOptions.lob.topic_name],
                queryFn: () => fetchAPIs("lob")
            },
            {
                queryKey: ["lobType", pageOptions.lobType.current, pageOptions.lobType.page, pageOptions.lobType.topic_name],
                queryFn: () => fetchAPIs("lobType")
            },
            {
                queryKey: ["lobSubType", pageOptions.lobSubType.current, pageOptions.lobSubType.page, pageOptions.lobSubType.topic_name],
                queryFn: () => fetchAPIs("lobSubType")
            },
        ],
        combine: (results) => {
            return {
                data: {
                    lob: results[0].data,
                    lobType: results[1].data,
                    lobSubType: results[2].data,
                },
                isLoading: results.some(res => res.isLoading),
                isError: results.some(res => res.isError)
            }
        },
    });

    const handleDelete = async (id, type) => {
        if (!window.confirm("Are you sure you want to delete it?")) return;

        switch (type) {
            case "lob":
                {
                    try {
                        const res = await deleteApi(api.lob, id);
                        if (res.data.success) {
                            toast.success("LOB deleted successfully!");
                            queryClient.invalidateQueries({ queryKey: ["lob"] });
                        }
                    } catch (error) {
                        toast.error("Failed to delete LOB!");
                    };
                    break;
                }
            case "lobType":
                {
                    try {
                        const res = await deleteApi(api.lobType, id);
                        if (res.data.success) {
                            toast.success("LOB Type deleted successfully!");
                            queryClient.invalidateQueries({ queryKey: ["lobType"] });
                        }
                    } catch (error) {
                        toast.error("Failed to delete LOB Type!");
                    };
                    break;
                }
            case "lobSubType":
                {
                    try {
                        const res = await deleteApi(api.lobSubType, id);
                        if (res.data.success) {
                            toast.success("LOB Sub Type deleted successfully!");
                            queryClient.invalidateQueries({ queryKey: ["lobSubType"] });
                        }
                    } catch (error) {
                        toast.error("Failed to delete LOB Sub Type!");
                    };
                    break;
                }

            default:
                toast.error("Wrong API call!");
                return null;
        };
    };

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <div>
                    <Link to={paths.addLOB} className="addpagess">
                        <img src={add} style={{ width: "25px" }} alt="add" />
                        Add LOB
                    </Link>
                    <h4 className="page-title">• View LOB</h4>
                    <ViewLOBData
                        data={data.data.lob}
                        paths={paths}
                        handleDelete={handleDelete}
                        pageOptions={pageOptions.lob}
                        setPageOptions={setPageOptions}
                    />
                </div>

                <hr />

                <div>
                    <Link to={paths.addLOBType} className="addpagess">
                        <img src={add} style={{ width: "25px" }} alt="add" />
                        Add LOB Type
                    </Link>
                    <h4 className="page-title">• View LOB Type</h4>
                    <ViewLOBTypeData
                        data={data.data.lobType}
                        paths={paths}
                        handleDelete={handleDelete}
                        pageOptions={pageOptions.lobType}
                        setPageOptions={setPageOptions}
                    />
                </div>

                <hr />

                <div>
                    <Link to={paths.addLOBSubType} className="addpagess">
                        <img src={add} style={{ width: "25px" }} alt="add" />
                        Add LOB Sub Type
                    </Link>
                    <h4 className="page-title">• View LOB Sub Type</h4>
                    <ViewLOBSubTypeData
                        data={data.data.lobSubType}
                        paths={paths}
                        handleDelete={handleDelete}
                        pageOptions={pageOptions.lobSubType}
                        setPageOptions={setPageOptions}
                    />
                </div>
            </div>
        </div >
    )
};

export default ViewLOB;