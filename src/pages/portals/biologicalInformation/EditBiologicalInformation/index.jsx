import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const EditBiologicalInformation = () => {
  const [graph, setGraph] = useState({
    marathi: {
      partyRuling: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
      partyOpposition: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
      partyOther: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
      partyVacant: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
    },
    english: {
      partyRuling: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
      partyOpposition: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
      partyOther: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
      partyVacant: [
        {
          partyName: "",
          partyMember: "",
        },
      ],
    },
  });
  const [isToggled, setIsToggled] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const renderTableRow = (
    category,
    header,
    englishName,
    marathiName,
    englishMember,
    marathiMember
  ) => (
    <tr key={category}>
      <td>
        <h4>{header}</h4>
      </td>
      <td>
        <h4>सरकार (MVA)</h4>
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          name={`english-${category}.[0].partyName`}
          defaultValue={graph.english[category][0].partyName}
          onChange={(e) => handleGraphChange(e)}
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          name={`marathi-${category}.[0].partyName`}
          defaultValue={graph.marathi[category][0].partyName}
          onChange={(e) => handleGraphChange(e)}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          name={`english-${category}.[0].partyMember`}
          defaultValue={graph.english[category][0].partyMember}
          onChange={(e) => handleGraphChange(e)}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          name={`marathi-${category}.[0].partyMember`}
          defaultValue={graph.marathi[category][0].partyMember}
          onChange={(e) => handleGraphChange(e)}
        />
      </td>
    </tr>
  );

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.split("=")[1];

  const convertToNumber = (value) => {
    const match = value.match(/\[(\d+)\]/);
    const number = match ? parseInt(match[1], 10) : null;

    return number;
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setGraph((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleGraphChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split("-");
    const [parent, index, child] = subField.split(".");

    // console.log(name, value, field, subField, parent, index, child);

    setGraph((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [parent]: prev[field][parent].map((item, i) =>
          i === convertToNumber(index)
            ? {
              ...item,
              [child]: value,
            }
            : item
        ),
      },
    }));
  };

  const handleGraphSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    await putApi("graph", id, graph)
      .then((res) => {
        if (res.data.success) {
          toast.success("Information updated successfully");
          setTimeout(() => {
            navigate(paths.viewAllBiologicalInformation);
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });

    setSubmit(false);
  };

  const fetchData = async () => {
    await getApiById("graph", id)
      .then((res) => {
        setGraph((prev) => ({
          ...prev,
          marathi: {
            partyRuling: res.data.data.marathi.partyRuling,
            partyOpposition: res.data.data.marathi.partyOpposition,
            partyOther: res.data.data.marathi.partyOther,
            partyVacant: res.data.data.marathi.partyVacant,
          },
          english: {
            partyRuling: res.data.data.english.partyRuling,
            partyOpposition: res.data.data.english.partyOpposition,
            partyOther: res.data.data.english.partyOther,
            partyVacant: res.data.data.english.partyVacant,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Edit Biographical Information</h4>
      </div>
      <div className="card-body">
        <div className="tab-content" id="custom-tabs-one-tabContent">
          <div className="col-lg-12">
            <table className="table table-striped table-bordered mb-0 view_vidhan_mandal editt">
              <thead>
                <tr>
                  <th className="heighttab">Party (English)</th>
                  <th className="heighttab">Party (Marathi)</th>
                  <th className="heighttab">Party Name (English)</th>
                  <th className="heighttab">Party Name (Marathi)</th>
                  <th>Member Count (English)</th>
                  <th>Member Count (Marathi)</th>
                </tr>
              </thead>
              {graph.marathi && graph.english && (
                <tbody>
                  {renderTableRow(
                    "partyRuling",
                    "Government (MVA)",
                    "partyName",
                    "partyName",
                    "partyMember",
                    "partyMember"
                  )}
                  {renderTableRow(
                    "partyOpposition",
                    "Opposition (NDA)",
                    "partyName",
                    "partyName",
                    "partyMember",
                    "partyMember"
                  )}
                  {renderTableRow(
                    "partyOther",
                    "Other",
                    "partyName",
                    "partyName",
                    "partyMember",
                    "partyMember"
                  )}
                  {renderTableRow(
                    "partyVacant",
                    "Vacant",
                    "partyName",
                    "partyName",
                    "partyMember",
                    "partyMember"
                  )}
                </tbody>
              )}
            </table>
            <div className="form-group row mt-5">
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
          </div>
          <button
            className="submit123 mt-5"
            onClick={() => handleGraphSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBiologicalInformation;
