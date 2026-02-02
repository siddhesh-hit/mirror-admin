import Select from "react-select";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import back from "assets/back.svg";
import Loader from "components/common/Loader";

import { postApi, getApi, getApiById, patchApi } from 'services/axios';
import { paths } from 'services/paths';
import { api } from 'services/api';

const EditLOBSubType = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [data, setData] = useState({
        name: "", alias: "", lob_id: "", lob_type_id: ""
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const mutation = useMutation({
        mutationKey: [`lobSubType_${id}`],
        mutationFn: async () => {
            const res = await patchApi(api.lobSubType, id, data);
            return res;
        },
        onSuccess: (response) => {
            if (response.data.success) {
                toast.success("LOB Sub Type updated successfully!");
                // Invalidate both the list and the specific item
                queryClient.invalidateQueries({ queryKey: ["lobSubType"] });
                queryClient.invalidateQueries({ queryKey: [`lobSubType_${id}`] });
                navigate(paths.viewLOB);
            } else {
                throw new Error("Failed to update the data!")
            }
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const lob = useQuery({
        queryKey: ["lobActive"],
        queryFn: async () => {
            const res = await getApi(api.lobActive);
            if (res.data.success) {
                return res.data.data.map(item => {
                    return {
                        value: item._id,
                        label: item.name + " (" + item.house + ")",
                    };
                });
            } else {
                return [];
            }
        },
    });

    const lobType = useQuery({
        queryKey: ["lobTypeActive"],
        queryFn: async () => {
            const res = await getApi(api.lobTypeActive);
            if (res.data.success) {
                return res.data.data.map(item => {
                    return {
                        value: item._id,
                        lob_id: item.lob?._id,
                        label: item.name + " (" + item.lob?.house + ")",
                    };
                });
            } else {
                return [];
            }
        },
    });

    const lobSubType = useQuery({
        queryKey: [`lobSubType_${id}`],
        queryFn: async () => {
            const res = await getApiById(api.lobSubType, id);
            if (res.data.success) {
                return res.data.data;
            };
            return null;
        },
        enabled: !!id,
    });

    // Sync query data to local state
    useEffect(() => {
        if (lobSubType.data) {
            setData({
                name: lobSubType.data.name || "",
                alias: lobSubType.data.alias || "",
                lob_id: lobSubType.data.lob_id?._id || "",
                lob_type_id: lobSubType.data.lob_type_id?._id || "",
            });
        }
    }, [lobSubType.data]);

    if (lob.isLoading || lobType.isLoading || lobSubType.isLoading) return <Loader />;
    if (lob.isError) return toast.error("Failed to fetch LOB data!");
    if (lobType.isError) return toast.error("Failed to fetch LOB Type data!");
    if (lobSubType.isError) return toast.error("Failed to fetch LOB Sub Type data!");

    const handleSubmit = () => mutation.mutate();

    const handleLOBChange = (e, type) => {
        switch (type) {
            case "lob":
                console.log(e)
                setData((prev) => ({ ...prev, lob_id: e.value, lob_type_id: "" }));
                break;
            case "lobType":
                console.log(e)
                if (data.lob_id) {
                    setData((prev) => ({ ...prev, lob_type_id: e.value }));
                } else {
                    setData((prev) => ({ ...prev, lob_id: e.lob_id, lob_type_id: e.value }));
                }
                break;
            default:
                break;
        };
    };

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <Link to={paths.viewLOB} className="addpagess">
                    <img src={back} style={{ width: "25px" }} alt="add" />
                    Go back
                </Link>
                <h4 className="page-title">• Add LOB Sub Type</h4>
                <div className="card card-info">
                    <div className="row mb-4 mt-4">
                        <div className="col-lg-9">
                            <form className="form-horizontal">
                                <div className="card-body">
                                    <div className="formada border_names">
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit LOB Sub Type Name :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Sub Type Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit LOB Sub Type Alias :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="alias"
                                                    value={data.alias}
                                                    onChange={handleChange}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Sub Type Alias"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit LOB :
                                            </label>
                                            <div className="col-sm-9">
                                                <Select
                                                    name="lob_id"
                                                    options={lob.data}
                                                    value={data.lob_id ? lob.data.find(item => item.value === data.lob_id) : null}
                                                    onChange={(e) => handleLOBChange(e, "lob")}
                                                    // isClearable={isClearable}
                                                    className=""
                                                    classNamePrefix="select"
                                                    placeholder="Select LOB"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit LOB Type :
                                            </label>
                                            <div className="col-sm-9">
                                                <Select
                                                    name="lob_type_id"
                                                    value={data.lob_type_id ? lobType.data.find(item => item.value === data.lob_type_id) : null}
                                                    options={
                                                        data.lob_id
                                                            ? lobType.data.filter(item => item.lob_id === data.lob_id)
                                                            : lobType.data
                                                    }
                                                    onChange={(e) => handleLOBChange(e, "lobType")}
                                                    className=""
                                                    classNamePrefix="select"
                                                    placeholder="Select LOB Type"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button className="submit123 mt-4" onClick={() => handleSubmit()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLOBSubType