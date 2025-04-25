import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import back from "assets/back.svg";

import { getApiById, putApi } from "services/axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDateForInput } from "lib/dateEnUsFormat";
import { paths } from "services/paths";

const EditRajyapal = () => {
  const [data, setData] = useState();
  const [isToggled, setIsToggled] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const [speeches, setSpeeches] = useState([
    {
      year: "",
      values: [{ language: "", content: {} }],
    },
  ]);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    await getApiById("rajyapal", id)
      .then((res) => {
        setData(res.data.data);
        setSpeeches(res.data.data.speeches);
        setIsToggled(res.data.data.isActive);
        setIsCurrent(res.data.data.isCurrent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [subName, field] = name.split("_");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    // console.log(name, value, files, subName, field);
    if (files) {
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
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else if (name === "url") {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [subName]: {
          ...prev[subName],
          [field]: value,
        },
      }));
    }
  };

  const handleSpeechChange = (e) => {
    const { name, value, files } = e.target;
    const [field, speechIndex, languageIndex] = name.split("_");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    setSpeeches((prevSpeeches) => {
      const newSpeeches = [...prevSpeeches];

      if (field === "year") {
        newSpeeches[speechIndex] = {
          ...newSpeeches[speechIndex],
          year: value,
        };
      } else if (field === "language") {
        newSpeeches[speechIndex].values[languageIndex] = {
          ...newSpeeches[speechIndex].values[languageIndex],
          language: value.toLowerCase(),
        };
      } else if (field === "content" && files) {
        if (files[0]?.type.startsWith("application/pdf")) {
          if (files[0].size > maxAllowedSize) {
            alert("Upload the file of size less than 2MB.");
          } else {
            newSpeeches[speechIndex].values[languageIndex] = {
              ...newSpeeches[speechIndex].values[languageIndex],
              content: files[0],
            };
          }
        } else {
          alert("Only upload PDF format assets");
        }
      }

      return newSpeeches;
    });

    setData((prev) => ({
      ...prev,
      speeches: speeches,
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleCurrentToggle = () => {
    setIsCurrent(!isCurrent);
    setData((prev) => ({
      ...prev,
      isCurrent: !isCurrent,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    const formData = new FormData();

    let serverData = {
      marathi: {
        name: data.marathi.name,
        elected_date: data.marathi.electedDate
          ? data.marathi.electedDate
          : data.marathi.elected_date,
        gender: data.marathi.gender,
        place_of_birth: data.marathi.placeOfBirth
          ? data.marathi.placeOfBirth
          : data.marathi.place_of_birth,
        political_career: data.marathi.politicalCareer
          ? data.marathi.politicalCareer
          : data.marathi.political_career,
      },
      english: {
        name: data.english.name,
        elected_date: data.english.electedDate
          ? data.english.electedDate
          : data.english.elected_date,
        gender: data.english.gender,
        place_of_birth: data.english.placeOfBirth
          ? data.english.placeOfBirth
          : data.english.place_of_birth,
        political_career: data.english.politicalCareer
          ? data.english.politicalCareer
          : data.english.political_career,
      },
    };

    formData.append("english", JSON.stringify(serverData.english));
    formData.append("marathi", JSON.stringify(serverData.marathi));
    formData.append("url", JSON.stringify(data.url));
    formData.append("speeches", JSON.stringify(data.speeches));

    formData.append("banner", data.image);
    formData.append("isActive", data.isActive);
    formData.append("isCurrent", data.isCurrent);

    formData.append("isUpdated", true);

    for (let i = 0; i < data.speeches.length; i++) {
      data.speeches[i].values.map((item) => {
        let object = item.content;
        return formData.append("documents", object);
      });
    }

    await putApi("rajyapal", id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Rajyapal member updated successfully.");
          navigate(paths.viewAllRajyapal);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleEditorChange = (event, value, name, index) => {
    // const { name, value, files } = e.target;
    const [subName, field] = name.split("_");

    setData((prev) => ({
      ...prev,
      [subName]: {
        ...prev[subName],
        [field]: value?.getData(),
      },
    }));
  };
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllRajyapal} className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Rajyapal</h4>
        <div className="card card-info">
          <div className="row pb-4">
            <div className="col-lg-10">
              <div className="border_name">
                {data && data.english && data.marathi ? (
                  <form className="form-horizontal">
                    <div className="card-body">
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Profile Image :
                        </label>
                        <div className="col-sm-8">
                          <div className="custom-file">
                            <input
                              type="file"
                              name="image"
                              title={
                                data.image.filename ||
                                data.image.name ||
                                "Please choose a file"
                              }
                              accept="image/png, image/jpeg, image/jpg"
                              onChange={handleChange}
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              assets - {data.image.filename || data.image.name}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            {" "}
                            *Only upload JPEG/JPG/PNG format assets
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Name :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english_name"
                            defaultValue={data.english.name}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Name"
                          />
                          <input
                            type="text"
                            name="marathi_name"
                            defaultValue={data.marathi.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="नाव प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Elected Date :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="string"
                            name="english_electedDate"
                            defaultValue={data.english.elected_date}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Elected date"
                          />
                          <input
                            type="string"
                            name="marathi_electedDate"
                            defaultValue={data.marathi.elected_date}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="निवडलेली तारीख प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Date of birth :
                        </label>
                        <div className="col-sm-8">
                          <DatePicker
                            name="date_of_birth"
                            label="Select date of birth"
                            value={dayjs(data?.date_of_birth)}
                            onChange={(date) => {
                              setData((prev) => ({
                                ...prev,
                                date_of_birth: date.format(),
                              }));
                            }}
                            format="DD/MM/YYYY"
                            minDate={dayjs("1937-01-01")}
                            maxDate={dayjs(
                              new Date().toISOString().split("T")[0]
                            )}
                            className={`form-control mb-3 `}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Select Gender :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control select2 mb-3"
                            name="english_gender"
                            value={data.english.gender}
                            onChange={handleChange}
                          >
                            <option hidden>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                          <select
                            className="form-control select2 mb-3"
                            name="marathi_gender"
                            value={data.marathi.gender}
                            onChange={handleChange}
                          >
                            <option hidden>लिंग निवडा</option>
                            <option>पुरुष</option>
                            <option>स्त्री</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Place Of Birth :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="english_placeOfBirth"
                            defaultValue={data.english.place_of_birth}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Place Of Birth"
                          />
                          <input
                            type="text"
                            name="marathi_placeOfBirth"
                            defaultValue={data.marathi.place_of_birth}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="जन्मस्थान प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Political Career :
                        </label>
                        <div className="col-sm-8">
                          <CKEditor
                            editor={ClassicEditor}
                            data={data.english.political_career}
                            name="english_politicalCareer"
                            onChange={(event, editor) =>
                              handleEditorChange(
                                event,
                                editor,
                                "english_politicalCareer"
                              )
                            }
                          />
                          <CKEditor
                            editor={ClassicEditor}
                            data={data.marathi.political_career}
                            name="marathi_politicalCareer"
                            onChange={(event, editor) =>
                              handleEditorChange(
                                event,
                                editor,
                                "marathi_politicalCareer"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit URL :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="url"
                            defaultValue={data.url}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter URL"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contentofpages">
        <h4 className="page-title">• Edit Speeches</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-11">
              {speeches &&
                speeches.length > 0 &&
                speeches.map((speech, speechIndex) => (
                  <div className="row" key={speechIndex}>
                    <div className="col-lg-12">
                      <div className="col-lg-12 mb-5">
                        <div className="form-group row mt-5">
                          <label
                            htmlFor={`speech_year_${speechIndex}`}
                            className="col-sm-3 col-form-label"
                          >
                            Edit Year :
                          </label>
                          <div className="col-sm-9">
                            <DatePicker
                              name={`year_${speechIndex}`}
                              label="Select Speech Year"
                              value={dayjs(speech?.year)}
                              onChange={(date) => {
                                setSpeeches((prev) => {
                                  const speeches = [...prev];

                                  speeches[speechIndex] = {
                                    ...speeches[speechIndex],
                                    year: date.format(),
                                  };
                                  return speeches;
                                });
                              }}
                              format="DD/MM/YYYY"
                              minDate={dayjs("1937-01-01")}
                              maxDate={dayjs(
                                new Date().toISOString().split("T")[0]
                              )}
                              className={`form-control mb-3 `}
                            />
                          </div>
                        </div>
                      </div>
                      {speech.values.map((language, languageIndex) => (
                        <div className="row mb-4" key={languageIndex}>
                          <div className="col-lg-12">
                            <div className="legis_members mt-0">
                              <div
                                className="card-body"
                                style={{ pEditing: "25px 10px 25px" }}
                              >
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="form-group row mb-0">
                                      <label
                                        htmlFor={`speech_language_${speechIndex}_${languageIndex}`}
                                        className="col-sm-4 col-form-label"
                                      >
                                        Edit Language :
                                      </label>
                                      <div className="col-sm-8">
                                        <input
                                          type="text"
                                          name={`language_${speechIndex}_${languageIndex}`}
                                          defaultValue={language.language}
                                          onChange={handleSpeechChange}
                                          className="form-control mb-1"
                                          placeholder="Enter Speech Language "
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group row mb-0">
                                      <label
                                        htmlFor={`speech_pdf_${speechIndex}_${languageIndex}`}
                                        className="col-sm-4 col-form-label"
                                      >
                                        Edit PDF :
                                      </label>
                                      <div className="col-sm-8">
                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            title={
                                              language.content.filename ||
                                              language.content.name ||
                                              "Please choose a file"
                                            }
                                            name={`content_${speechIndex}_${languageIndex}`}
                                            accept="application/pdf"
                                            onChange={handleSpeechChange}
                                            className="custom-file-input"
                                            id={`customFile_${speechIndex}_${languageIndex}`}
                                          />
                                          <label
                                            className="custom-file-label"
                                            htmlFor={`customFile_${speechIndex}_${languageIndex}`}
                                          >
                                            PDF -{" "}
                                            {language.content.filename ||
                                              language.content.name}
                                          </label>
                                          <a
                                            className="dsldl"
                                            href={
                                              process.env.REACT_APP_IMG_URL +
                                              language.content.destination +
                                              "/" +
                                              language.content.filename
                                            }
                                            // className="pt-5"
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <OverlayTrigger
                                              delay={{ hide: 450, show: 300 }}
                                              overlay={(props) => (
                                                <Tooltip {...props}>
                                                  View the data.
                                                </Tooltip>
                                              )}
                                              placement="bottom"
                                            >
                                              <i
                                                className="fa fa-eye"
                                                aria-hidden="true"
                                              ></i>
                                            </OverlayTrigger>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-9">
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Status :
                </label>
                <div className="col-sm-8">
                  <div
                    className={`toggle-button ${isToggled ? "active" : ""}`}
                    onClick={handleToggle}
                  >
                    <div className={`slider ${isToggled ? "active" : ""}`} />
                    <div className="button-text">
                      {isToggled ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Current{" "}
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>
                        Only set active, when you want to show the current
                        Rajyapal.
                      </Tooltip>
                    )}
                    placement="bottom"
                  >
                    <i className="fa-regular fa-circle-question "></i>
                  </OverlayTrigger>{" "}
                  :
                </label>
                <div className="col-sm-8">
                  <div
                    className={`toggle-button ${isCurrent ? "active" : ""}`}
                    onClick={handleCurrentToggle}
                  >
                    <div className={`slider ${isCurrent ? "active" : ""}`} />
                    <div className="button-text">
                      {isCurrent ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="submit123 mt-5" onClick={() => handleSubmit()}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRajyapal;
