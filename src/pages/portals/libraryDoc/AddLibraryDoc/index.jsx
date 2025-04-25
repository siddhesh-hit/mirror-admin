import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "assets/add.svg";
import remove from "assets/remove.svg";

import { postApi } from "services/axios";
import { paths } from "services/paths";

const AddLibraryDoc = () => {
  const [divCount, setDivCount] = useState(1);
  const [serverData, setServerData] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const addDiv = () => {
    setDivCount(divCount + 1);
  };

  const removeDiv = () => {
    if (divCount > 1) {
      setDivCount(divCount - 1);
      setServerData((prev) => prev.slice(0, divCount - 1));
    }
  };

  const handleChange = (e, index) => {
    const { files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (files[0].type.startsWith("application/pdf")) {
      if (files[0].size > maxAllowedSize) {
        alert("Upload the file of size less than 2MB.");
      } else {
        if (index < divCount) {
          setServerData((prev) => {
            const newData = [...prev];
            newData[index] = files[0];
            return newData;
          });
        }
      }
    } else {
      alert("Only upload PDF format files.");
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    serverData.forEach((item) => {
      formData.append("gallery_image", item);
    });

    await postApi("gallery", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Library docs added successfully");
          setTimeout(() => {
            navigate(paths.viewAllLibrary);
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });

    setSubmit(false);
  };

  console.log(serverData);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div>
                <h4 className="second-title">• Library Document</h4>
                <form className="form-horizontal">
                  {[...Array(divCount)].map((_, index) => (
                    <div className="card-body" key={index}>
                      <div className="form-group row mb-0">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-3 col-form-label"
                        >
                          Add PDF :
                        </label>
                        <div className="col-sm-7">
                          <div className="custom-file">
                            <input
                              type="file"
                              title={
                                serverData[index]
                                  ? serverData[index].name ||
                                  "Please choose a file"
                                  : "Please choose a file"
                              }
                              name="assets"
                              accept="application/pdf"
                              onChange={(e) => handleChange(e, index)}
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Documents -{" "}
                              {serverData[index] ? serverData[index].name : ""}
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          {index === 0 && (
                            <div onClick={addDiv} style={{ cursor: "pointer" }}>
                              <img className="add" alt="Add" src={add} />
                            </div>
                          )}
                          {index !== 0 && (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={removeDiv}
                            >
                              <img src={remove} alt="Remove" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <button className="submit123 mt-5" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLibraryDoc;
