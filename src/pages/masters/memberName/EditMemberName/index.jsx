import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import ReactSelect from "react-select";

import add from "assets/add.svg";
import remove from "assets/remove.svg";
import back from "assets/back.svg";

import { getApi, getApiById, putApi } from "services/axios";
import { formatDateForInput, isValidDate } from "lib/dateEnUsFormat";

const EditMemberName = () => {
    const [isSubmitted, setSubmitted] = useState(false);
    const [data, setData] = useState({
        name: "",
        nickname: "",
        assembly_journey: [
            {
                house: "Assembly",
                party: "",
                constituency: "",
                district: "",
                assembly: "",
                designation: "",
                ministry: "",
                from_year: "",
                to_year: "",
            },
        ],
        council_journey: [
            {
                house: "Council",
                party: "",
                constituency: "",
                designation: "",
                ministry: "",
                from_year: "",
                to_year: "",
            },
        ],
    });
    const [options, setOptions] = useState({
        party: [],
        assembly_constituency: [],
        council_constituency: [],
        district: [],
        assembly: [],
        designation: [],
        ministry: [],
        defaultValues: {
            party: {},
            assembly_constituency: {},
            council_constituency: {},
            district: {},
            assembly: {},
            designation: {},
            ministry: {},
        },
    });

    const navigate = useNavigate();
    const location = useLocation();

    const handleAddOrRemove = (type, index) => {
        switch (type) {
            case "AddAssembly":
                let assemblyJourney = {
                    house: "Assembly",
                    party: null,
                    constituency: null,
                    district: null,
                    assembly: null,
                    designation: null,
                    ministry: null,
                    from_year: null,
                    to_year: null,
                };

                setData((prev) => ({
                    ...prev,
                    assembly_journey: [...prev.assembly_journey, assemblyJourney],
                }));

                alert("You've added one assembly journey field");

                break;

            case "RemoveAssembly":
                if (data.assembly_journey.length > 0) {
                    setData((prev) => {
                        const assemblies = { ...prev };

                        if (assemblies.assembly_journey.length > 0) {
                            assemblies.assembly_journey.splice(index, 1);
                        }

                        return assemblies;
                    });
                }
                alert("You've removed one assembly journey field");

                break;

            case "AddCouncil":
                let councilJourney = {
                    house: "Council",
                    party: null,
                    constituency: null,
                    designation: null,
                    ministry: null,
                    from_year: null,
                    to_year: null,
                };

                setData((prev) => ({
                    ...prev,
                    council_journey: [...prev.council_journey, councilJourney],
                }));

                alert("You've added one council journey field");

                break;

            case "RemoveCouncil":
                if (data.council_journey.length > 0) {
                    setData((prev) => {
                        const councils = { ...prev };

                        if (councils.council_journey.length > 0) {
                            councils.council_journey.splice(index, 1);
                        }

                        return councils;
                    });
                }
                alert("You've removed one council journey field");

                break;

            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, index, subField] = name?.split(".");

        if (index) {
            setData((prev) => {
                const oldData = { ...prev };
                oldData[field][index][subField] = value;

                return oldData;
            });
        } else {
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSelectChange = (data, name) => {
        const id = data.value;
        const [field, index, subField] = name.split(".");

        console.log(data, name);

        setData((prev) => {
            let oldData = { ...prev };
            oldData[field][index][subField] = id;

            console.log(oldData);
            return oldData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (data.assembly_journey.length > 0 && data.assembly_journey[0].assembly) {
            let newData = [...data.assembly_journey];

            newData.forEach((item) => {
                const assembly = options.assembly.find(
                    (as) => as.value === item.assembly
                );
                item.from_year = assembly.start_date;
                item.to_year = assembly.end_date;
            });

            data.assembly_journey = newData;
        }

        await putApi("/memberName", location.search.split("=")[1], data)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Member name registered");
                    navigate("/ViewMemberName");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.data.response.message);
            });
        setSubmitted(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getApiById("/memberName", location.search.split("=")[1])
                .then((res) => {
                    if (res.data.success) {
                        setData(res.data.data);
                    }
                })
                .catch((err) => console.log(err));

            await getApi("/party/option")
                .then((res) => {
                    if (res.data.success) {
                        setOptions((prev) => ({
                            ...prev,
                            party: res.data.data.map((item) => {
                                return {
                                    value: item._id,
                                    label: item.marathi.party_name,
                                };
                            }),
                        }));
                    }
                })
                .catch((err) => console.log(err));

            await getApi("/constituency/option")
                .then((res) => {
                    if (res.data.success) {
                        setOptions((prev) => ({
                            ...prev,
                            assembly_constituency: res.data.data
                                .filter((item) => item.isHouse === "Assembly")
                                .map((item) => ({
                                    value: item._id,
                                    label: item.assembly.constituency_name,
                                })),
                            council_constituency: res.data.data
                                .filter((item) => item.isHouse === "Council")
                                .map((item) => ({
                                    value: item._id,
                                    label: item.council.constituency_name,
                                })),
                        }));
                    }
                })
                .catch((err) => console.log(err));

            await getApi("/district/option")
                .then((res) => {
                    if (res.data.success) {
                        setOptions((prev) => ({
                            ...prev,
                            district: res.data.data.map((item) => {
                                return {
                                    value: item._id,
                                    label: item.marathi.district,
                                };
                            }),
                        }));
                    }
                })
                .catch((err) => console.log(err));

            await getApi("/assembly/option")
                .then((res) => {
                    if (res.data.success) {
                        setOptions((prev) => ({
                            ...prev,
                            assembly: res.data.data.map((item) => {
                                return {
                                    value: item._id,
                                    label: item.assembly_name,
                                    start_date: item.start_date,
                                    end_date: item.end_date,
                                };
                            }),
                        }));
                    }
                })
                .catch((err) => console.log(err));

            await getApi("/designation/option")
                .then((res) => {
                    if (res.data.success) {
                        setOptions((prev) => ({
                            ...prev,
                            designation: res.data.data.map((item) => {
                                return {
                                    value: item._id,
                                    label: item.name,
                                };
                            }),
                        }));
                    }
                })
                .catch((err) => console.log(err));

            await getApi("/ministry/option")
                .then((res) => {
                    if (res.data.success) {
                        setOptions((prev) => ({
                            ...prev,
                            ministry: res.data.data.map((item) => {
                                return {
                                    value: item._id,
                                    label: item.ministry_name,
                                };
                            }),
                        }));
                    }
                })
                .catch((err) => console.log(err));
        };

        fetchData();
    }, []);

    return (
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <Link to="/ViewMemberName" className="addpagess">
                    <img src={back} style={{ width: "25px" }} alt="add" />
                    Go back
                </Link>
                <h4 className="page-title">• Edit Member Name</h4>
                <div className="card card-info">
                    <div className="row mb-4 mt-4">
                        <div className="col-lg-10">
                            <form className="form-horizontal" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="formada border_names">
                                        <div className="form-group row mb-5">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit Member Name :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name={`name`}
                                                    defaultValue={data.name}
                                                    onChange={handleChange}
                                                    className={`form-control mb-3`}
                                                    placeholder="Surname-Salutation-Firstname-Middlename"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-5">
                                            <label
                                                htmlFor="inputPassword3"
                                                className="col-sm-3 col-form-label"
                                            >
                                                *Edit Nickname of Member :
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name={`nickname`}
                                                    defaultValue={data.nickname}
                                                    onChange={handleChange}
                                                    className={`form-control mb-3`}
                                                    placeholder="If there's any nickname, else ignore this"
                                                />
                                            </div>
                                        </div>

                                        <h4 className="page-title">• Add Assembly Journey</h4>

                                        {data.assembly_journey.map((item, index) => (
                                            <div className="col-lg-12 border_names" key={index}>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit House :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            name={`assembly_journey.${index}.house`}
                                                            defaultValue={item.house}
                                                            className={`form-control mb-3`}
                                                            placeholder="Enter House"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Party :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.party.find(
                                                                (pa) => pa.value === item.party
                                                            )}
                                                            name={`assembly_journey.${index}.party`}
                                                            options={options.party}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `assembly_journey.${index}.party`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Constituency :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.assembly_constituency.find(
                                                                (pa) => pa.value === item.constituency
                                                            )}
                                                            name={`assembly_journey.${index}.constituency`}
                                                            options={options.assembly_constituency}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `assembly_journey.${index}.constituency`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit District :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.district.find(
                                                                (pa) => pa.value === item.district
                                                            )}
                                                            name={`assembly_journey.${index}.district`}
                                                            options={options.district}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `assembly_journey.${index}.district`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Assembly Number :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.assembly.find(
                                                                (pa) => pa.value === item.assembly
                                                            )}
                                                            name={`assembly_journey.${index}.assembly`}
                                                            options={options.assembly}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `assembly_journey.${index}.assembly`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Designation :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.designation.find(
                                                                (pa) => pa.value === item.designation
                                                            )}
                                                            name={`assembly_journey.${index}.designation`}
                                                            options={options.designation}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `assembly_journey.${index}.designation`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Ministry :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.ministry.find(
                                                                (pa) => pa.value === item.ministry
                                                            )}
                                                            name={`assembly_journey.${index}.ministry`}
                                                            options={options.ministry}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `assembly_journey.${index}.ministry`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit From Year :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <DatePicker
                                                            name={`assembly_journey.${index}.from_year`}
                                                            label="Select From year"
                                                            value={dayjs(
                                                                item.assembly
                                                                    ? formatDateForInput(
                                                                        options?.assembly?.find(
                                                                            (as) => as.value === item.assembly
                                                                        )?.start_date
                                                                    )
                                                                    : ""
                                                            )}
                                                            onChange={(date) => {
                                                                setData((prev) => {
                                                                    let oldData = { ...prev };
                                                                    oldData.assembly_journey[index].from_year =
                                                                        date.format();
                                                                    return oldData;
                                                                });
                                                            }}
                                                            format="DD/MM/YYYY"
                                                            minDate={dayjs("1937-01-01")}
                                                            maxDate={dayjs(
                                                                new Date().toISOString().split("T")[0]
                                                            )}
                                                            className={`form-control`}
                                                            disabled={item.assembly}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit To Year :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <DatePicker
                                                            name={`assembly_journey.${index}.to_year`}
                                                            label="Select To year"
                                                            value={dayjs(
                                                                item.assembly
                                                                    ? formatDateForInput(
                                                                        options?.assembly?.find(
                                                                            (as) => as.value === item.assembly
                                                                        )?.end_date
                                                                    )
                                                                    : ""
                                                            )}
                                                            onChange={(date) => {
                                                                setData((prev) => {
                                                                    let oldData = { ...prev };
                                                                    oldData.assembly_journey[index].to_year =
                                                                        date.format();
                                                                    return oldData;
                                                                });
                                                            }}
                                                            format="DD/MM/YYYY"
                                                            minDate={dayjs("1937-01-01")}
                                                            maxDate={dayjs(
                                                                new Date().toISOString().split("T")[0]
                                                            )}
                                                            className={`form-control`}
                                                            disabled={item.assembly}
                                                        />
                                                    </div>
                                                </div>
                                                {index === 0 && (
                                                    <div
                                                        onClick={() => handleAddOrRemove("AddAssembly")}
                                                        className="addSubButton"
                                                    >
                                                        <img className="add" alt="Add" src={add} />
                                                    </div>
                                                )}
                                                {index !== 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleAddOrRemove("RemoveAssembly", index)
                                                        }
                                                        className="addSubButton"
                                                    >
                                                        <img src={remove} alt="Remove" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        <h4 className="page-title mt-5">• Add Council Journey</h4>

                                        {data.council_journey.map((item, index) => (
                                            <div className="col-lg-12 border_names" key={index}>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit House :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            name={`council_journey.${index}.house`}
                                                            defaultValue={item.house}
                                                            className={`form-control mb-3`}
                                                            placeholder="Enter House"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Party :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.party.find(
                                                                (pa) => pa.value === item.party
                                                            )}
                                                            name={`council_journey.${index}.party`}
                                                            options={options.party}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `council_journey.${index}.party`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Constituency :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.council_constituency.find(
                                                                (pa) => pa.value === item.constituency
                                                            )}
                                                            name={`council_journey.${index}.constituency`}
                                                            options={options.council_constituency}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `council_journey.${index}.constituency`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Designation :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.designation.find(
                                                                (pa) => pa.value === item.designation
                                                            )}
                                                            name={`council_journey.${index}.designation`}
                                                            options={options.designation}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `council_journey.${index}.designation`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit Ministry :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isSearchable={true}
                                                            value={options.ministry.find(
                                                                (pa) => pa.value === item.ministry
                                                            )}
                                                            name={`council_journey.${index}.ministry`}
                                                            options={options.ministry}
                                                            onChange={(data) =>
                                                                handleSelectChange(
                                                                    data,
                                                                    `council_journey.${index}.ministry`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit From Year :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <DatePicker
                                                            name={`council_journey.${index}.from_year`}
                                                            label="Select From year"
                                                            value={dayjs(formatDateForInput(item.from_year))}
                                                            onChange={(date) => {
                                                                setData((prev) => {
                                                                    let oldData = { ...prev };
                                                                    oldData.council_journey[index].from_year =
                                                                        date.format();
                                                                    return oldData;
                                                                });
                                                            }}
                                                            format="DD/MM/YYYY"
                                                            minDate={dayjs("1937-01-01")}
                                                            maxDate={dayjs(
                                                                new Date().toISOString().split("T")[0]
                                                            )}
                                                            className={`form-control`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-5">
                                                    <label
                                                        htmlFor="inputPassword3"
                                                        className="col-sm-3 col-form-label"
                                                    >
                                                        *Edit To Year :
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <DatePicker
                                                            name={`council_journey.${index}.to_year`}
                                                            label="Select To year"
                                                            value={dayjs(formatDateForInput(item.to_year))}
                                                            onChange={(date) => {
                                                                setData((prev) => {
                                                                    let oldData = { ...prev };
                                                                    oldData.council_journey[index].to_year =
                                                                        date.format();
                                                                    return oldData;
                                                                });
                                                            }}
                                                            format="DD/MM/YYYY"
                                                            minDate={dayjs(
                                                                item.from_year && isValidDate(item.from_year) ? item.from_year : "1937-01-01"
                                                            )}
                                                            maxDate={dayjs(
                                                                new Date().toISOString().split("T")[0]
                                                            )}
                                                            className={`form-control`}
                                                        />
                                                    </div>
                                                </div>
                                                {index === 0 && (
                                                    <div
                                                        onClick={() => handleAddOrRemove("AddCouncil")}
                                                        className="addSubButton"
                                                    >
                                                        <img className="add" alt="Add" src={add} />
                                                    </div>
                                                )}
                                                {index !== 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleAddOrRemove("RemoveCouncil", index)
                                                        }
                                                        className="addSubButton"
                                                    >
                                                        <img src={remove} alt="Remove" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="submit123 mt-4" type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMemberName;
