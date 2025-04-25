import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import back from "assets/back.svg";

import { postApi } from "services/axios";
import { toast } from "react-toastify";
import { paths } from "services/paths";

const UploadPortalUser = () => {
  const [json, setJs] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) return;
    setSubmit(true);

    let form = new FormData();
    form.append("json", json);
    await postApi("/user/import", form)
      .then((res) => {
        if (res.data.success) {
          toast.success("User Uploaded");
          navigate(paths.viewPortalUser);
        }
      })
      .catch(
        (err) => {
          console.log(err);
          toast(err.response.data.message);
        }
        // toast.error("Something went wrong, please check the format!")
      );

    setSubmit(false);
  };

  console.log(json);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to={paths.viewPortalUser} className="addpagess">
            <img style={{ width: "25px" }} src={back} alt="add" />
            Go back
          </Link>
          <h4 className="page-title">• Upload Portal User</h4>
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="card-body border_names">
              <div className="form-group row mb-0">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  Add Text File :
                </label>
                <div className="col-sm-6">
                  <div className="custom-file">
                    <input
                      type="file"
                      title={"Please choose a file"}
                      accept="text/plain"
                      name="assets"
                      onChange={(e) => {
                        const { files } = e.target;

                        if (
                          files[0] &&
                          files[0]?.type.startsWith("text/plain")
                        ) {
                          setJs(files[0]);
                        } else {
                          alert("Please upload file only in .txt format.");
                        }
                      }}
                      className="custom-file-input"
                      id="customFile"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Text File - {json ? json.name : ""}
                    </label>
                  </div>
                  <p className="photo_disclaimer">
                    *Only upload .txt format files.
                  </p>
                </div>
                <button
                  style={{ marginBottom: "0px" }}
                  className="submit123 mt-5"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <p>
            This Should be the file format -
            <pre>
              <code>
                {`[
    {
      "full_name": "Vain sidd",
      "houses": "Houses 3",
      "department": "Please select the english name from portal department master",
      "designation": "Please select the english name from portal branch master",
      "email": "newcheck@gmail.com",
      "password": "your password",
      "phone_number": "your phone",
      "gender": "Please select the name from gender master",
      "date_of_birth": "17-02-2002"
    }
]`}
              </code>
            </pre>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadPortalUser;
