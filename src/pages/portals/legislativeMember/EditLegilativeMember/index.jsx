import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { getApi, getApiById, putApi } from "services/axios";
import { basicInfoSchema, politicalJourneySchema, electionDataSchema } from "lib/validator";

import back from "assets/back.svg";
import EditBasicInformation from "components/pages/portal/legislative_members/EditBasicInformation";
import EditPoliticalJourney from "components/pages/portal/legislative_members/EditPoliticaljourney";
import EditElectionData from "components/pages/portal/legislative_members/EditElectionData";
import { paths } from "services/paths";

const EditLegislativeMember = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [divCount, setDivCount] = useState(1); // Initialize with one div
  const [divCountElect, setDivCountElect] = useState(1);
  const [error, setError] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    basic_info: {
      house: "",
      assembly_number: "",
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

  const [Data, seObjects] = useState({
    constituency: [],
    assembly: [],
    district: [],
    party: [],
    gender: [],
    district: [],
    officer: [],
    position: [],
    designation: [],
  });

  const navigate = useNavigate();
  const { id } = useParams();

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
        errors = politicalJourneySchema(data.political_journey);
        break;
      default:
        throw new Error("Invalid step");
    }

    return errors;
  };

  // In the `nextStep` function:
  const nextStep = async () => {
    // const errors = await validateStep(currentStep, data);
    // console.log(errors);
    // if (errors) {
    //   // Handle errors (e.g., show toast, set error state, etc.)
    //   toast.error(errors); // Show the first error message
    //   return;
    // }

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
      political_journey: [...prev.political_journey, object],
    }));

    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    if (data.political_journey.length > 1) {
      let object = [...data.political_journey];
      object.splice(index, 1);

      console.log(object)

      setData((prev) => ({
        ...prev,
        political_journey: object,
      }));
    }
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
        ...prev.election_data,
        member_election_result: [
          ...prev.election_data.member_election_result,
          object,
        ],
      },
    }));

    setDivCountElect(divCountElect + 1);
    alert("You've added one field");
  };

  const removeDivElect = (index) => {
    if (data.election_data.member_election_result.length > 1) {
      let object = [...data.election_data.member_election_result];
      object.splice(index, 1);

      setData((prev) => ({
        ...prev,
        election_data: {
          ...prev.election_data,
          member_election_result: object,
        },
      }));
    }
    alert("You've removed one field");
  };

  const fetchData = async () => {
    await getApiById("member", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));

    for (let key in Data) {
      await getApi(key + "/option")
        .then((res) => {
          seObjects((prevData) => ({ ...prevData, [key]: res.data.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, files, value, checked } = e.target;
    const [field, subField] = name.split(".");

    const maxAllowedSize = 2.5 * 1024 * 1024;
    const maxPDFAllowedSize = 20 * 1024 * 1024;

    // console.log(name, value, checked);

    if (checked) {
      setData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          house: value,
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
    try {
      // let errors = await electionDataSchema(data.election_data);
      // if (errors) {
      //   toast.error(errors);
      //   return;
      // }
      if (isSubmitted) return;
      setSubmit(true);

      if (data.basic_info.house === "Council") {
        data.basic_info.assembly_number = "";
      }

      // Check if political journey has any meaningful data
      const isPoliticalJourneyEmpty = data.political_journey.filter(item =>
        item.date && item.designation && item.legislative_position && item.presiding && item.title
      );

      // Check if election data has meaningful data
      const hasValidElectionResults = data.election_data?.member_election_result?.some(result =>
        result.candidate_name || result.votes || result.party
      );

      const isElectionDataEmpty = !data.election_data ||
        (!data.election_data.total_electorate &&
          !data.election_data.total_valid_voting &&
          !hasValidElectionResults);

      const formData = new FormData();
      formData.append("profile", data.basic_info.profile);
      formData.append("jeevanParichay", data.jeevan_parichay);
      formData.append("basic_info", JSON.stringify(data.basic_info));
      formData.append("political_journey", JSON.stringify(isPoliticalJourneyEmpty.length > 0 ? isPoliticalJourneyEmpty : []));
      formData.append("election_data", JSON.stringify(isElectionDataEmpty ? {} : data.election_data));

      const res = await putApi("member", id, formData);
      if (res.data.success) {
        toast.success("Legislative Member updated successfully.");
        setTimeout(() => {
          navigate(paths.viewAllLegislativeMember);
        }, 1100);
      };

    } catch (error) {
      const errors = error.response.data.details;
      if (errors.length > 0) {
        errors.forEach(errMsg => toast.error(errMsg.message));
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setSubmit(false);
    }
  };

  const handleKeyDown = (e) => ["e", "E", "+"].includes(e.key) && e.preventDefault();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllLegislativeMember} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Legislative Member</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <div>
                <EditBasicInformation
                  currentStep={currentStep}
                  data={data}
                  handleChange={handleChange}
                  error={error}
                  Data={Data}
                  setData={setData}
                  CKEditor={CKEditor}
                  ClassicEditor={ClassicEditor}
                  handleKeyDown={handleKeyDown}
                  DatePicker={DatePicker}
                  dayjs={dayjs}
                />
                <EditPoliticalJourney
                  currentStep={currentStep}
                  data={data}
                  handleChange={handlePoliticalChange}
                  addDiv={addDiv}
                  removeDiv={removeDiv}
                  setData={setData}
                  divCount={divCount}
                  Data={Data}
                  handleKeyDown={handleKeyDown}
                  DatePicker={DatePicker}
                  dayjs={dayjs}
                />
                <EditElectionData
                  currentStep={currentStep}
                  data={data}
                  handleChange={handleElectionChange}
                  addDiv={addDivElect}
                  removeDiv={removeDivElect}
                  divCount={divCountElect}
                  Data={Data}
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
                  {currentStep == 3 && (
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

export default EditLegislativeMember;
