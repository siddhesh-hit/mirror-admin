import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postApi } from "services/axiosInterceptors";

import addwhite from "assets/addwhite.svg";
import remove from "assets/remove.svg";
import back from "assets/back.svg";
import AddBanner from "components/pages/portal/legislative_assembly/AddBanner";
import AddPublication from "components/pages/portal/legislative_assembly/AddPublication";
import AddStructure from "components/pages/portal/legislative_assembly/AddStructure";
import AddProfile from "components/pages/portal/legislative_assembly/AddProfile";

const AddLegislativeAssembly = () => {
  const [divCount4, setDivCount4] = useState(1);
  const [divCount5, setDivCount5] = useState(1);
  const [error, setError] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    english: {
      description: "",
      legislative_council: [
        {
          council_name: "",
          council_description: "",
        },
      ],
      structure: {
        name: "",
        type: "",
        term_limit: "",
        seats: "",
      },
    },
    marathi: {
      description: "",
      legislative_council: [
        {
          council_name: "",
          council_description: "",
        },
      ],
      structure: {
        name: "",
        type: "",
        term_limit: "",
        seats: "",
      },
    },
    structure_profile: "",
    banner_image: "",
    legislative_council: [{ council_profile: "" }],
    publication: [
      {
        english: {
          name: "",
          document: "",
        },
        marathi: {
          name: "",
          document: "",
        },
      },
    ],
  });

  const navigate = useNavigate();

  const addCouncil = () => {
    let newCouncil = {
      council_name: "",
      council_description: "",
    };

    let newCouncilProfile = {
      council_profile: "",
    };

    setData((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        legislative_council: [...prev.english.legislative_council, newCouncil],
      },
      legislative_council: [...prev.legislative_council, newCouncilProfile],
      marathi: {
        ...prev.marathi,
        legislative_council: [...prev.marathi.legislative_council, newCouncil],
      },
    }));

    setDivCount4(divCount4 + 1);
    alert("You've added one field");
  };

  const removeCouncil = (index) => {
    if (divCount4 > 1) {
      let list1 = [...data.english.legislative_council];
      let list2 = [...data.marathi.legislative_council];
      let list3 = [...data.legislative_council];

      list1.splice(index, 1);
      list2.splice(index, 1);
      list3.splice(index, 1);

      setData((prev) => ({
        ...prev,
        english: {
          ...prev.english,
          legislative_council: list1,
        },
        marathi: {
          ...prev.marathi,
          legislative_council: list2,
        },
        legislative_council: list3,
      }));

      setDivCount4(divCount4 - 1);
    }
    alert("You've removed one field");
  };

  const addPublication = () => {
    let newPublication = {
      english: { name: "", document: "" },
      marathi: { name: "", document: "" },
    };

    setData((prev) => ({
      ...prev,
      publication: [...prev.publication, newPublication],
    }));

    setDivCount5(divCount5 + 1);
    alert("You've added one field");
  };

  const removePublication = (index) => {
    if (divCount5 > 1) {
      let list = [...data.publication];
      list.splice(index, 1);

      setData((prev) => ({
        ...prev,
        publication: list,
      }));

      setDivCount5(divCount5 - 1);
    }
    alert("You've removed one field");
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
          setData((data) => ({
            ...data,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      setData((prev) => ({
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
          setData((prev) => ({
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
      setData((prev) => ({
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
          setData((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      setData((prev) => ({
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

          setData((prev) => ({
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
      setData((prev) => ({
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

  const handleSubmit = async () => {
    // const { isValid, errors } = validateData(data, council);

    // if (!isValid) {
    //   setError(errors);
    //   toast.error("It seems some fields are empty check the red boxes!");
    //   return;
    // } else {

    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("profile", data.structure_profile);
    formData.append("banner_image", data.banner_image);

    data.legislative_council.map((item) => {
      formData.append("legislative_profile", item.council_profile);
    });

    data.publication.map((item) => {
      if (item.english) {
        formData.append("publication_docs_en", item.english.document);
      }
      if (item.marathi) {
        formData.append("publication_docs_mr", item.marathi.document);
      }
    });

    await postApi("sabha", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("VidhanSabha added successfully");
          setTimeout(() => {
            navigate("/ViewAllLegislativeAssembly");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
    // }

    setSubmit(false);
  };

  const handleEditorBannerChange = (event, value, name, index) => {
    const [lang, field] = name.split(".");
    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleEditorProfileChange = (event, value, name) => {
    const [lang, field, index, subField] = name.split(".");
    setData((prev) => ({
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
  };
  return (
    <div className="content-wrapper pt-4">
      <AddBanner
        data={data}
        handleChange={handleChange}
        error={error}
        back={back}
        handleEditorBannerChange={handleEditorBannerChange}
      />

      <AddPublication
        data={data}
        handleChange={handlePublicationChange}
        error={error}
        divCount={divCount5}
        addPublication={addPublication}
        removePublication={removePublication}
        addwhite={addwhite}
        remove={remove}
      />

      <AddStructure
        data={data}
        handleChange={handleStructureChange}
        error={error}
      />

      <AddProfile
        data={data}
        handleChange={handleLegislativeChange}
        error={error}
        divCount={divCount4}
        addCouncil={addCouncil}
        removeCouncil={removeCouncil}
        addwhite={addwhite}
        remove={remove}
        handleSubmit={handleSubmit}
        handleEditorProfileChange={handleEditorProfileChange}
      />
    </div>
  );
};

export default AddLegislativeAssembly;
