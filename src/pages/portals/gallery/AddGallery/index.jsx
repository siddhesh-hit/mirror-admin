import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { postApi } from "services/axios";
import { paths } from "services/paths";

const AddGallery = () => {
  const [serverData, setServerData] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;
    if (
      files[0].type.startsWith("image/png") ||
      files[0].type.startsWith("image/jpeg") ||
      files[0].type.startsWith("image/jpg") ||
      files[0].type.startsWith("video/mp4") ||
      files[0].type.startsWith("video/webm") ||
      files[0].type.startsWith("video/ogg")
    ) {
      if (files[0].size > maxAllowedSize) {
        alert("Upload the file of size less than 2MB.");
      } else {
        console.log(files);
        setServerData(files[0]);
      }
    } else {
      alert("Only upload JPEG/JPG/PNG format assets");
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();

    formData.append("gallery_image", serverData);

    await postApi("gallery", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Gallery added successfully");
          setTimeout(() => {
            navigate(paths.viewGallery);
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
                <Link className="addpagess" to={paths.viewGallery}>
                  <img src={back} alt="back" style={{ width: 25 }} />
                  Go back
                </Link>
                <h4 className="second-title">• Photos and Videos Gallery</h4>
                <form className="form-horizontal">
                  <div className="card-body border_names">
                    <div className="form-group row mb-0">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Image/Video :
                      </label>
                      <div className="col-sm-6">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={
                              serverData
                                ? serverData.name || "Please choose a file"
                                : "Please choose a file"
                            }
                            accept="image/png, image/jpeg, image/jpg, video/mp4, video/webm, video/ogg"
                            name="assets"
                            onChange={handleChange}
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Image/Video - {serverData ? serverData.name : ""}
                          </label>
                        </div>
                        <p className="photo_disclaimer">
                          {" "}
                          (For Image*) Only upload JPEG/JPG/PNG format image.
                          <br />
                          (For Video*) Only upload MP4/WEBM/OGG format video.
                        </p>
                      </div>
                    </div>
                  </div>
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

export default AddGallery;
