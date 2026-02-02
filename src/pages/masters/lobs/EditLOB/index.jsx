import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import back from "assets/back.svg";
import Loader from "components/common/Loader";

import { patchApi, getApiById } from 'services/axios';
import { paths } from 'services/paths';
import { api } from 'services/api';

const EditLOB = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [data, setData] = useState({
        name: "", alias: "", house: ""
    });

    const lob = useQuery({
        queryKey: [`lob_${id}`],
        queryFn: async () => {
            const res = await getApiById(api.lob, id);
            if (res.data.success) {
                return res.data.data;
            };
            return null;
        },
        enabled: !!id,
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        mutationKey: [`lob_${id}`],
        mutationFn: async () => {
            const res = await patchApi(api.lob, id, data);
            return res;
        },
        onSuccess: (response) => {
            if (response.data.success) {
                toast.success("LOB updated successfully!");
                // Invalidate both the list and the specific item
                queryClient.invalidateQueries({ queryKey: ["lob"] });
                queryClient.invalidateQueries({ queryKey: [`lob_${id}`] });
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

    // Sync query data to local state
    useEffect(() => {
        if (lob.data) {
            setData({
                name: lob.data.name || "",
                alias: lob.data.alias || "",
                house: lob.data.house.toLowerCase() || "",
            });
        }
    }, [lob.data]);

    if (lob.isLoading) return <Loader />;
    if (lob.isError) return toast.error("Something went wrong while fetching master data!");

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
                                            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                                                *Edit House :
                                            </label>
                                            <div className="col-sm-9 d-flex">
                                                <input
                                                    type="radio"
                                                    name="house"
                                                    value="council"
                                                    checked={data?.house === "council"}
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
                                                    checked={data?.house === "assembly"}
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

export default EditLOB