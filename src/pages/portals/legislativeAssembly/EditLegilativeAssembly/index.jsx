import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiById, putApi } from "services/axiosInterceptors";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";
import back from "assets/back.svg";
import EditBanner from "components/pages/portal/legislative_assembly/EditBanner";
import EditPublication from "components/pages/portal/legislative_assembly/EditPublication";
import EditStructure from "components/pages/portal/legislative_assembly/EditProfile";
import EditProfile from "components/pages/portal/legislative_assembly/EditProfile";
import { paths } from "services/paths";

const EditLegislativeAssembly = () => {
  const [divCount5, setDivCount5] = useState(1);
  const [server, setServer] = useState({});
  const [error, setError] = useState({});
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const location = useLocation();
  const id = location.search.split("=")[1];
  const navigate = useNavigate();

  const addCouncil = () => {
    let object = {
      council_name: "",
      council_description: "",
    };

    let profile = {
      council_profile: "",
    };

    setServer((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        legislative_council: [...prev.english.legislative_council, object],
      },
      legislative_council: [...prev.legislative_council, profile],
      marathi: {
        ...prev.marathi,
        legislative_council: [...prev.marathi.legislative_council, object],
      },
    }));
    // setDivCount4(divCount4 + 1);
    alert("You've added one field");
  };

  const removeCouncil = (index) => {
    let object1 = [...server.english.legislative_council];
    let object2 = [...server.marathi.legislative_council];
    let object3 = [...server.legislative_council];

    object1.splice(index, 1);
    object2.splice(index, 1);
    object3.splice(index, 1);

    setServer((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        legislative_council: object1,
      },
      legislative_council: object3,
      marathi: {
        ...prev.marathi,
        legislative_council: object2,
      },
    }));
    alert("You've removed one field");
  };

  const fetchData = async () => {
    let newPublication = {
      english: { name: "", document: "" },
      marathi: { name: "", document: "" },
    };

    await getApiById("sabha", id)
      .then((res) => {
        setServer(res.data.data);
        if (res.data.data.publication.length === 0) {
          setServer((prev) => ({
            ...prev,
            publication: [newPublication],
          }));
        }
        setIsToggled(res.data.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPublication = () => {
    let newPublication = {
      english: { name: "", document: "" },
      marathi: { name: "", document: "" },
    };

    setServer((prev) => ({
      ...prev,
      publication: [...prev.publication, newPublication],
    }));

    setDivCount5(divCount5 + 1);
    alert("You've added one field");
  };

  const removePublication = (index) => {
    if (divCount5 > 1) {
      let list = [...server.publication];
      list.splice(index, 1);

      setServer((prev) => ({
        ...prev,
        publication: list,
      }));

      setDivCount5(divCount5 - 1);
      alert("You've removed one field");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const [lang, field] = name.split(".");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (files) {
      if (
        files[0]?.type.startsWith("image/png") ||
        files[0]?.type.startsWith("image/jpeg") ||
        files[0]?.type.startsWith("image/jpg")
      ) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          setServer((data) => ({
            ...data,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      setServer((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: value,
        },
      }));
    }
  };

  const handlePublicationChange = (e) => {
    const { name, value, files } = e.target;
    const [field, index, lang, subField] = name.split(".");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (files) {
      if (files[0]?.type.startsWith("application/pdf")) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          console.log("aya", field, index, lang, subField, files);
          setServer((prev) => ({
            ...prev,
            [field]: prev[field].map((item, ind) =>
              ind === +index
                ? {
                  ...item,
                  [lang]: {
                    ...item[lang],
                    [subField]: files[0],
                  },
                }
                : item
            ),
          }));
        }
      } else {
        alert("Only upload PDF format files");
      }
    } else {
      setServer((prev) => ({
        ...prev,
        [field]: prev[field].map((item, ind) =>
          ind === +index
            ? {
              ...item,
              [lang]: {
                ...item[lang],
                [subField]: value,
              },
            }
            : item
        ),
      }));
    }
  };

  const handleStructureChange = (e) => {
    const { name, value, files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;

    const [lang, field, subField] = name.split(".");
    // english.structure.name

    if (files) {
      if (
        files[0]?.type.startsWith("image/png") ||
        files[0]?.type.startsWith("image/jpeg") ||
        files[0]?.type.startsWith("image/jpg")
      ) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          setServer((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      setServer((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: {
            ...prev[lang][field],
            [subField]: value,
          },
        },
      }));
    }
  };

  const handleLegislativeChange = (e) => {
    const { name, value, files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (files) {
      if (
        files[0]?.type.startsWith("image/png") ||
        files[0]?.type.startsWith("image/jpeg") ||
        files[0]?.type.startsWith("image/jpg")
      ) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          const [field, index] = name.split(".");

          setServer((prev) => ({
            ...prev,
            legislative_council: prev.legislative_council.map((item, ind) =>
              ind === +index
                ? {
                  ...item,
                  [field]: files[0],
                }
                : item
            ),
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      const [lang, field, index, subField] = name.split(".");
      setServer((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: prev[lang][field].map((item, ind) =>
            ind === +index
              ? {
                ...item,
                [subField]: value,
              }
              : item
          ),
        },
      }));
    }
  };

  const validateData = (data) => {
    const errors = {
      marathi: {
        description: "",
        legislative_council: [],
      },
      english: {
        description: "",
        legislative_council: [],
      },
      legislative_council: [],
    };

    let isValid = true;

    // Validate english & marathi description fields
    if (!data.marathi.description.trim()) {
      isValid = false;
      errors.marathi.description = "Title is required";
    }
    if (!data.english.description.trim()) {
      isValid = false;
      errors.english.description = "Title is required";
    }

    // Validate english & marathi legislative council fields
    ["english", "marathi"].forEach((lang) => {
      data[lang].legislative_council.forEach((item, index) => {
        let legislativeCouncilError = {};
        if (!item.council_description.trim()) {
          isValid = false;
          legislativeCouncilError.council_description =
            "Council description is required.";
        }

        if (!item.council_name.trim()) {
          isValid = false;
          legislativeCouncilError.council_name =
            "Council description is required.";
        }

        if (Object.keys(legislativeCouncilError).length > 0) {
          errors[lang].legislative_council[index] =
            legislativeCouncilError || {};
        }
      });
    });

    // Validate english & marathi legislative council fields
    data.legislative_council.forEach((item, index) => {
      let councilError = {};
      if (
        !item.council_profile &&
        !item.council_profile.name &&
        !item.council_profile.filename
      ) {
        isValid = false;
        councilError.council_profile = "Profile is required";
      }

      if (Object.keys(councilError).length > 0) {
        errors.legislative_council[index] = councilError || {};
      }
    });

    // Clean up empty error arrays
    Object.keys(errors).map((name) => {
      if (errors[name].length === 0) {
        delete errors[name];
      }
    });

    return { isValid, errors };
  };

  const handleSubmit = async () => {
    // const { isValid, errors } = validateData(server);

    // if (!isValid) {
    //   setError(errors);
    //   toast.error("It seems some fields are empty check the red boxes!");
    //   return;
    // } else {
    // let banner = server.banner_image;
    // formData.append("banner_image", banner);
    // for (let i = 0; i < server.legislative_council.length; i++) {
    //   const legislativeProfile = server.legislative_council[i].council_profile;
    //   // Append the actual file to the FormData
    //   formData.append("legislative_profile", legislativeProfile);
    // }

    if (isSubmitted) return;
    setSubmit(true);

    server.isUpdated = true;

    const formData = new FormData();

    formData.append("data", JSON.stringify(server));
    formData.append("profile", server.structure_profile);
    formData.append("banner_image", server.banner_image);

    server.legislative_council.map((item) => {
      formData.append("legislative_profile", item.council_profile);
    });

    server.publication.map((item) => {
      if (item.english) {
        formData.append("publication_docs_en", item.english.document);
      }
      if (item.marathi) {
        formData.append("publication_docs_mr", item.marathi.document);
      }
    });

    await putApi("sabha", id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Vidhansabha updated successfully");
          setTimeout(() => {
            navigate(paths.viewAllLegislativeAssembly);
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });

    setSubmit(false);

    // }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setServer((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(server);
  const handleEditorBannerChange = (event, value, name, index) => {
    const [lang, field] = name.split(".");
    setServer((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value.getData(),
      },
    }));
  };
  console.log(server);

  const handleEditorProfileChange = (event, value, name) => {
    const [lang, field, index, subField] = name.split(".");
    setServer((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: prev[lang][field].map((item, ind) =>
          ind === +index
            ? {
              ...item,
              [subField]: value.getData(),
            }
            : item
        ),
      },
    }));
  };
  return (
    <div className="content-wrapper pt-4">
      <EditBanner
        data={server}
        handleChange={handleChange}
        error={error}
        back={back}
        handleEditorBannerChange={handleEditorBannerChange}
      />

      <EditPublication
        data={server}
        handleChange={handlePublicationChange}
        error={error}
        divCount={divCount5}
        addPublication={addPublication}
        removePublication={removePublication}
        addwhite={addwhite}
        remove={remove}
      />

      <EditStructure
        data={server}
        handleChange={handleStructureChange}
        error={error}
      />

      <EditProfile
        data={server}
        handleChange={handleLegislativeChange}
        error={error}
        addCouncil={addCouncil}
        removeCouncil={removeCouncil}
        addwhite={addwhite}
        remove={remove}
        isToggled={isToggled}
        handleToggle={handleToggle}
        handleSubmit={handleSubmit}
        handleEditorProfileChange={handleEditorProfileChange}
      />
    </div>
  );
};

export default EditLegislativeAssembly;
