import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import add from "assets/add.svg";

import { getApiById } from "services/axios";
import { paths } from "services/paths";

const ViewBiologicalInformation = () => {
  const [data, setData] = useState([]);

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

  const { id } = useParams();

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
        <h4>{graph.english[category][0].partyName}</h4>
      </td>
      <td>
        <h4>{graph.marathi[category][0].partyName}</h4>
      </td>
      <td>
        <h4>{graph.english[category][0].partyMember}</h4>
      </td>
      <td>
        <h4>{graph.marathi[category][0].partyMember}</h4>
      </td>
    </tr>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.addBiologicalInformation} className="addpagess">
          <img src={add} alt="add" />
          Add Biographical Information
        </Link>
        <h4 className="page-title">• View Biographical Information</h4>
        <div className="card card-info">
          <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
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
        </div>
      </div>
    </div>
  );
};

export default ViewBiologicalInformation;
