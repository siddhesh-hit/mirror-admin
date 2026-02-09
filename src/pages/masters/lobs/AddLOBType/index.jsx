import Select from "react-select";
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import back from "assets/back.svg";
import Loader from "components/common/Loader";

import { postApi, getApi } from 'services/axios';
import { paths } from 'services/paths';
import { api } from 'services/api';

const AddLOBType = () => {
    const navigate = useNavigate();
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
        mutationKey: [`lobType_${data.name}`],
        mutationFn: async () => {
            const res = await postApi(api.lobType, data);
            return res;
        },
        onSuccess: (response) => {
            if (response.data.success) {
                toast.success("LOB Type added successfully!");
                // Invalidate both the list and the specific item
                queryClient.invalidateQueries({ queryKey: ["lobType"] });
                queryClient.invalidateQueries({ queryKey: [`lobType_${data.name}`] });
                queryClient.invalidateQueries({ queryKey: ["lobTypeActive"] });
                navigate(paths.viewLOB);
            } else {
                throw new Error("Failed to add the data!")
            }
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const lob = useQuery({
        queryKey: ["lobActive"],
        queryFn: async () => {
            const queryString = new URLSearchParams({ for: "admin" });
            const res = await getApi(`${api.lob}?${queryString}`);
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

    if (lob.isLoading) return <Loader />;
    if (lob.isError) return toast.error("Failed to fetch LOB data!");

    const handleSubmit = () => mutation.mutate();

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <Link to={paths.viewLOB} className="addpagess">
                    <img src={back} style={{ width: "25px" }} alt="add" />
                    Go back
                </Link>
                <h4 className="page-title">• Add LOB Type</h4>
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
                                                *Add LOB Type Name :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={handleChange}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Type Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Add LOB Type Alias :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="alias"
                                                    onChange={handleChange}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Type Alias"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Add LOB :
                                            </label>
                                            <div className="col-sm-9">
                                                <Select
                                                    name="lob"
                                                    options={lob.data}
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
                    <button className="submit123 mt-4" onClick={() => handleSubmit()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddLOBType