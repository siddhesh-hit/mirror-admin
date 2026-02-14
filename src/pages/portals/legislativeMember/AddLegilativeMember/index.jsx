import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Select from "react-select";
import { useQueries } from "@tanstack/react-query";

import { getApi, getApiById, postApi } from "services/axios";
import { basicInfoSchema, politicalJourneySchema, electionDataSchema } from "lib/validator";

import back from "assets/back.svg";
import BasicInformation from "components/pages/portal/legislative_members/BasicInformation";
import PoliticalJourney from "components/pages/portal/legislative_members/PoliticalJourney";
import ElectionData from "components/pages/portal/legislative_members/ElectionData";
import { paths } from "services/paths";
import Loader from "components/common/Loader";

const AddLegislativeMember = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [divCount, setDivCount] = useState(1);
  const [divCountElect, setDivCountElect] = useState(1);
  const [error, setError] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    basic_info: {
      house: "",
      assembly_number: "",
      constituency_from: "",
      constituency_to: "",
      profile: "",
      name: "",
      surname: "",
      constituency: "",
      party: "",
      gender: "",
      district: "",
      first_time_elected: "",
      date_of_birth: "",
      place_of_birth: "",
      education: "",
      language: "",
      marital_status: "",
      children: "",
      business: "",
      hobby: "",
      foreign_migration: "",
      address: "",
      address1: "",
      mobile_number: "",
      email: "",
      awards: "",
      other_info: "",
    },
    political_journey: [
      {
        date: "",
        title: "",
        presiding: "",
        legislative_position: "",
        designation: "",
      },
    ],
    election_data: {
      constituency: "",
      total_electorate: "",
      total_valid_voting: "",
      member_election_result: [
        {
          candidate_name: "",
          votes: "",
          party: "",
        },
      ],
    },
    jeevan_parichay: {}
  });

  const [selectedMemberId, setSMI] = useState(null);

  const navigate = useNavigate();

  const fetchData = async (type = "") => {
    switch (type) {
      case "constituency": {
        try {
          const assemblyNumber = typeof data.basic_info.assembly_number === "object" ? data.basic_info.assembly_number?._id : data.basic_info.assembly_number;
          const house = data.basic_info.house;
          const res = await getApi("constituency/option" + `?assembly.assembly_number=${assemblyNumber}&isHouse=${house}`)
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
        }
        break;
      };

      case "assembly": {
        try {
          const res = await getApi("assembly/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
        }
        break;
      };

      case "district": {
        try {
          const res = await getApi("district/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
        }
        break;
      };

      case "party": {
        try {
          const res = await getApi("party/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
        }
        break;
      };

      case "gender": {
        try {
          const res = await getApi("gender/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
          return [];
        }
        break;
      };

      case "officer": {
        try {
          const res = await getApi("officer/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
          return [];
        }
      };

      case "position": {
        try {
          const res = await getApi("position/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
          return [];
        }
      };

      case "designation": {
        try {
          const res = await getApi("designation/option")
          return res.data.success ? res.data.data : [];
        } catch (error) {
          console.log(error);
          return [];
        }
      };

      case "memberNames": {
        try {
          const res = await getApi("member/names")
          return res.data.success ? res.data.data.map(item => {
            return {
              value: item._id,
              label: item.full_name,
            }
          }) : [];
        } catch (error) {
          console.log(error);
          return [];
        }
      };

      default: {
        alert(`Wrong type ${type} passed to fetchData`);
        break;
      };
    }
  };

  const validateStep = async (step, data) => {
    let errors;
    console.log(step);
    switch (step) {
      case 1:
        if (
          data.basic_info.house === "Assembly" &&
          !data.basic_info.assembly_number
        ) {
          errors = "Assembly number is required";
          break;
        }

        if (
          data.basic_info.house === "Council" &&
          !data.basic_info.constituency_from
        ) {
          errors = "Constituency from is required";
          break;
        }

        if (
          data.basic_info.house === "Council" &&
          !data.basic_info.constituency_to
        ) {
          errors = "Constituency to is required";
          break;
        }
        errors = basicInfoSchema(data.basic_info);
        break;
      case 2:
        errors = politicalJourneySchema(data.political_journey || []);
        break;
      default:
        throw new Error("Invalid step");
    }

    return errors;
  };

  // In the `nextStep` function:
  const nextStep = async () => {
    const errors = await validateStep(currentStep, data);
    console.log(errors);
    if (errors) {
      // Handle errors (e.g., show toast, set error state, etc.)
      toast.error(errors); // Show the first error message
      return;
    }

    // If validation passed, go to the next step

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const addDiv = () => {
    let object = {
      date: "",
      title: "",
      presiding: "",
      legislative_position: "",
      designation: "",
    };

    setData((prev) => ({
      ...prev,
      political_journey: [...(prev.political_journey || []), object],
    }));

    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    if (divCount === 1 && data.political_journey?.length > 0) {
      let object = [...data.political_journey];
      object.splice(index, 1);

      setData((prev) => ({
        ...prev,
        political_journey: object,
      }));
    };

    if (divCount > 1 && data.political_journey) {
      let object = [...data.political_journey];
      object.splice(index, 1);

      setData((prev) => ({
        ...prev,
        political_journey: object,
      }));

      setDivCount(divCount - 1);
    };

    alert("You've removed one field");
  };

  const addDivElect = () => {
    let object = {
      candidate_name: "",
      votes: "",
      party: "",
    };

    setData((prev) => ({
      ...prev,
      election_data: {
        ...(prev.election_data || {}),
        member_election_result: [
          ...(prev.election_data?.member_election_result || []),
          object,
        ],
      },
    }));

    setDivCountElect(divCountElect + 1);
    alert("You've added one field");
  };

  const removeDivElect = (index) => {
    if (divCountElect === 1 && data?.election_data?.member_election_result?.length > 0) {
      let object = [...data.election_data.member_election_result];
      object.splice(index, 1);

      setData((prev) => ({
        ...prev,
        election_data: {
          ...prev.election_data,
          member_election_result: object,
        },
      }));
    };

    if (divCountElect > 1 && data?.election_data?.member_election_result) {
      let object = [...data.election_data.member_election_result];
      object.splice(index, 1);

      setData((prev) => ({
        ...prev,
        election_data: {
          ...prev.election_data,
          member_election_result: object,
        },
      }));

      setDivCountElect(divCountElect - 1);
    };

    alert("You've removed one field");
  };

  const handleChange = (e) => {
    const { name, files, value, checked } = e.target;
    const [field, subField] = name.split(".");

    const maxAllowedSize = 2.5 * 1024 * 1024;
    const maxPDFAllowedSize = 20 * 1024 * 1024;

    if (checked) {
      value === "Council"
        ? setData((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            house: value,
            assembly_number: "",
            constituency_from: "",
            constituency_to: "",
          },
        }))
        : setData((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            house: value,
            assembly_number: "",
            constituency_from: null,
            constituency_to: null,
          },
        }));
    } else {
      if (files) {
        if (subField === "profile") {
          if (
            files[0]?.type.startsWith("image/png") ||
            files[0]?.type.startsWith("image/jpeg") ||
            files[0]?.type.startsWith("image/jpg")
          ) {
            if (files[0].size > maxAllowedSize) {
              alert("Upload the file of size less than 2MB.");
            } else {
              setData((prev) => ({
                ...prev,
                [field]: {
                  ...prev[field],
                  [subField]: files[0],
                },
              }));
            }
          } else {
            alert("Only upload JPEG/JPG/PNG format assets");
          }
        };

        if (name === "jeevan_parichay") {
          if (files[0]?.type.startsWith("application/pdf")) {
            if (files[0].size > maxPDFAllowedSize) {
              alert("Upload the file of size less than 20MB.");
            } else {
              setData((prev) => ({
                ...prev,
                [name]: files[0],
              }));
            }
          } else {
            alert("Only upload PDF format document");
          }
        };
      } else {
        setData((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: value,
          },
        }));
      }
    }
  };

  const handlePoliticalChange = (e) => {
    const { name, value } = e.target;
    const [field, subField, index] = name.split(".");

    // console.log(e);
    // console.log(name, value, field, subField, index);

    setData((prev) => {
      const updatedPoliticalJourney = [...prev[field]];
      updatedPoliticalJourney[index] = {
        ...updatedPoliticalJourney[index],
        [subField]: value,
      };

      return {
        ...prev,
        [field]: updatedPoliticalJourney,
      };
    });
  };

  const handleElectionChange = (e) => {
    const { name, value } = e.target;
    const [field, subField, children, index] = name.split(".");

    // console.log(name, value, field, subField, children, index);

    if (!children && !index) {
      setData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setData((prev) => {
        const updatedElectionData = [...prev[field][subField]];
        updatedElectionData[index] = {
          ...updatedElectionData[index],
          [children]: value,
        };

        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: updatedElectionData,
          },
        };
      });
    }
  };

  const handleSubmit = async () => {
    console.log("first")
    try {
      let errors = await electionDataSchema(data.election_data || {});

      if (errors) {
        toast.error(errors);
        return;
      }

      if (isSubmitted) return;
      setSubmit(true);

      const formData = new FormData();
      if (data.basic_info.house === "Council") {
        data.basic_info.assembly_number = "";
      };

      // Check if political journey has any meaningful data
      const isPoliticalJourneyEmpty = data.political_journey ? data.political_journey.filter(item =>
        item.date && item.designation && item.legislative_position && item.presiding && item.title
      ) : [];

      // Check if election data has meaningful data
      const hasValidElectionResults = data.election_data?.member_election_result?.some(result =>
        result.candidate_name || result.votes || result.party
      );

      const isElectionDataEmpty = !data.election_data ||
        (!data.election_data?.total_electorate && !data.election_data?.total_valid_voting && !hasValidElectionResults);

      formData.append("profile", data.basic_info.profile);
      formData.append("jeevanParichay", data.jeevan_parichay);
      formData.append("basic_info", JSON.stringify(data.basic_info));
      formData.append(
        "political_journey",
        JSON.stringify(isPoliticalJourneyEmpty.length > 0 ? isPoliticalJourneyEmpty : [])
      );
      formData.append(
        "election_data",
        JSON.stringify(isElectionDataEmpty ? {} : data.election_data)
      );

      await postApi("member", formData)
        .then((res) => {
          if (res?.data?.success) {
            toast.success("Legislative Member added successfully.");
            setTimeout(() => {
              navigate(paths.viewAllLegislativeMember);
            }, 1100);
          } else {
            toast.error("Failed to add member. Please try again.");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred while adding the member.");
        });

      setSubmit(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An unexpected error occurred.");
      setSubmit(false);
    }
  };

  const handleGetMember = async (e) => {
    setSMI(e.value);

    const res = await getApiById("member", e.value);
    setData((prev) => ({
      ...prev,
      basic_info: res.data.data.basic_info,
      election_data: res.data.data.election_data || {
        constituency: "",
        total_electorate: "",
        total_valid_voting: "",
        member_election_result: [],
      },
      political_journey: res.data.data.political_journey || [
        {
          date: "",
          title: "",
          presiding: "",
          legislative_position: "",
          designation: "",
        },
      ],
    }))
  };

  const handleKeyDown = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const optionData = useQueries({
    queries: [
      {
        queryKey: ["constituency", data.basic_info.assembly_number, data.basic_info.house],
        queryFn: () => fetchData("constituency")
      },
      {
        queryKey: ["assembly"],
        queryFn: () => fetchData("assembly")
      },
      {
        queryKey: ["district"],
        queryFn: () => fetchData("district")
      },
      {
        queryKey: ["party"],
        queryFn: () => fetchData("party")
      },
      {
        queryKey: ["gender"],
        queryFn: () => fetchData("gender")
      },
      {
        queryKey: ["officer"],
        queryFn: () => fetchData("officer")
      },
      {
        queryKey: ["position"],
        queryFn: () => fetchData("position")
      },
      {
        queryKey: ["designation"],
        queryFn: () => fetchData("designation")
      },
      {
        queryKey: ["memberNames"],
        queryFn: () => fetchData("memberNames")
      },
    ],
    combine: (results) => {
      return {
        data: {
          constituency: results[0].data,
          assembly: results[1].data,
          district: results[2].data,
          party: results[3].data,
          gender: results[4].data,
          officer: results[5].data,
          position: results[6].data,
          designation: results[7].data,
          memberNames: results[8].data,
        },
        isLoading: results.some(res => res.isLoading),
        isError: results.some(res => res.isError)
      };
    },
  });

  if (optionData.isLoading) return <Loader />;
  if (optionData.isError) return toast.error("Something went wrong while fetching master data!");

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllLegislativeMember} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Legislative members </h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-4 col-form-label"
                  >
                    Member Name :
                  </label>
                  <div className=" col-sm-8">
                    <Select
                      isMulti={false}
                      name="colors"
                      value={
                        selectedMemberId
                          ? optionData?.data?.memberNames?.find(item => item.value === selectedMemberId)
                          : null
                      }
                      options={optionData?.data?.memberNames}
                      onChange={handleGetMember}
                      className=""
                      classNamePrefix="select"
                      placeholder="Select Member Name"
                    />
                  </div>
                </div>
                <BasicInformation
                  currentStep={currentStep}
                  data={data}
                  handleChange={handleChange}
                  error={error}
                  Data={optionData?.data}
                  setData={setData}
                  CKEditor={CKEditor}
                  ClassicEditor={ClassicEditor}
                  handleKeyDown={handleKeyDown}
                  DatePicker={DatePicker}
                  dayjs={dayjs}
                />
                <PoliticalJourney
                  currentStep={currentStep}
                  data={data}
                  setData={setData}
                  handleChange={handlePoliticalChange}
                  addDiv={addDiv}
                  removeDiv={removeDiv}
                  divCount={divCount}
                  Data={optionData?.data}
                  handleKeyDown={handleKeyDown}
                  DatePicker={DatePicker}
                  dayjs={dayjs}
                />
                <ElectionData
                  currentStep={currentStep}
                  data={data}
                  handleChange={handleElectionChange}
                  addDiv={addDivElect}
                  removeDiv={removeDivElect}
                  divCount={divCountElect}
                  Data={optionData?.data}
                  handleKeyDown={handleKeyDown}
                />
                <div className="stepper-buttons">
                  {currentStep > 1 && (
                    <button className="prevbutt" onClick={prevStep}>
                      Previous
                    </button>
                  )}
                  {currentStep <= 2 && (
                    <button className="nextbutt" onClick={nextStep}>
                      Next
                    </button>
                  )}
                  {currentStep === 3 && (
                    <button className="submitbutt" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLegislativeMember;
