import Select from "react-select";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from "react-router-dom";

import back from "assets/back.svg";
import Loader from "components/common/Loader";

import { patchApi, getApiById, getApi } from 'services/axios';
import { paths } from 'services/paths';
import { api } from 'services/api';

const EditLOBType = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [data, setData] = useState({
        name: "", alias: "", lob_id: ""
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        mutationKey: [`lobType_${id}`],
        mutationFn: async () => {
            const res = await patchApi(api.lobType, id, { ...data, lob_id: data.lob_id?._id ? data.lob_id?._id : data.lob_id });
            return res;
        },
        onSuccess: (response) => {
            if (response.data.success) {
                toast.success("LOB Type updated successfully!");
                // Invalidate both the list and the specific item
                queryClient.invalidateQueries({ queryKey: ["lobType"] });
                queryClient.invalidateQueries({ queryKey: [`lobType_${id}`] });
                queryClient.invalidateQueries({ queryKey: ["lobTypeActive"] });
                navigate(paths.viewLOB);
            } else {
                throw new Error("Failed to update the data!")
            }
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleSubmit = () => mutation.mutate();

    const lob = useQuery({
        queryKey: ["lob"],
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
        queryKey: [`lobType_${id}`],
        queryFn: async () => {
            const res = await getApiById(api.lobType, id);
            if (res.data.success) {
                return res.data.data;
            };
            return null;
        },
        enabled: !!id,
    });

    // Sync query data to local state
    useEffect(() => {
        if (lobType.data) {
            setData({
                name: lobType.data.name || "",
                alias: lobType.data.alias || "",
                lob_id: lobType.data.lob_id || "",
            });
        }
    }, [lobType.data]);

    if (lob.isLoading || lobType.isLoading) return <Loader />;
    if (lob.isError) return toast.error("Failed to fetch LOB data!");
    if (lobType.isError) return toast.error("Failed to fetch LOB Type data!");

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <Link to={paths.viewLOB} className="addpagess">
                    <img src={back} style={{ width: "25px" }} alt="add" />
                    Go back
                </Link>
                <h4 className="page-title">• Edit LOB</h4>
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
                                                *Edit LOB Name :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={handleChange}
                                                    value={data?.name || ""}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit LOB Alias :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="alias"
                                                    onChange={handleChange}
                                                    value={data?.alias || ""}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Alias"
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
                                                    name="lob"
                                                    options={lob.data}
                                                    value={
                                                        data.lob_id?._id
                                                            ? { value: data?.lob_id?._id, label: data?.lob_id?.name + " (" + data?.lob_id?.house + ")" }
                                                            : { value: data.lob_id, label: lob.data.find(item => item.value === data.lob_id)?.label }
                                                    }
                                                    onChange={(e) => setData((prev) => ({ ...prev, lob_id: e.value }))}
                                                    className=""
                                                    classNamePrefix="select"
                                                    placeholder="Select LOB"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button
                        className="submit123 mt-4"
                        onClick={() => handleSubmit()}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLOBType