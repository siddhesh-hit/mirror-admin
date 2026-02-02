import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import back from "assets/back.svg";

import { postApi } from 'services/axios';
import { paths } from 'services/paths';
import { api } from 'services/api';

const AddLOB = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [data, setData] = useState({
        name: "", alias: "", house: ""
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const mutation = useMutation({
        mutationKey: [`lob_${data.name}`],
        mutationFn: async () => {
            const res = await postApi(api.lob, data);
            return res;
        },
        onSuccess: (response) => {
            if (response.data.success) {
                toast.success("LOB added successfully!");
                // Invalidate both the list and the specific item
                queryClient.invalidateQueries({ queryKey: ["lob"] });
                queryClient.invalidateQueries({ queryKey: [`lob_${data.name}`] });
                navigate(paths.viewLOB);
            } else {
                throw new Error("Failed to add the data!")
            }
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    const handleSubmit = () => mutation.mutate();

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <Link to={paths.viewLOB} className="addpagess">
                    <img src={back} style={{ width: "25px" }} alt="add" />
                    Go back
                </Link>
                <h4 className="page-title">• Add LOB</h4>
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
                                                *Add LOB Name :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={handleChange}
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
                                                *Add LOB Alias :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="alias"
                                                    onChange={handleChange}
                                                    className="form-control mb-3"
                                                    placeholder="Enter LOB Alias"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                                                *Add House :
                                            </label>
                                            <div className="col-sm-9 d-flex">
                                                <input
                                                    type="radio"
                                                    name="house"
                                                    value="council"
                                                    checked={data.house === "council"}
                                                    onChange={handleChange}
                                                    className={`form-check-input`}
                                                    id="flexRadioDefault1"
                                                />

                                                <label className={`form-check-label`} htmlFor="flexRadioDefault1">
                                                    Council
                                                </label>

                                                <input
                                                    className={`form-check-input`}
                                                    type="radio"
                                                    name="house"
                                                    value="assembly"
                                                    checked={data.house === "assembly"}
                                                    onChange={handleChange}
                                                    id="flexRadioDefault2"
                                                />

                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Assembly
                                                </label>
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

export default AddLOB