import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import back from "assets/back.svg";

import { getApiById, putApi } from "services/axios";

import { paths } from "services/paths";

const EditGallery = () => {
  const [data, setData] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [serverData, setServerData] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchData = async () => {
    await getApiById("gallery", id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const maxAllowedSize = 2.5 * 1024 * 1024;
    const { files } = e.target;

    console.log(files)
    if (
      files[0].type.startsWith("image/png") ||
      files[0].type.startsWith("image/jpeg") ||
      files[0].type.startsWith("image/jpg")
    ) {
      if (files[0].size > maxAllowedSize) {
        alert("Upload the file of size less than 2MB.");
      } else {
        // Revoke previous preview URL if it exists
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }

        setServerData(files[0]);
        // Create preview URL for the uploaded file
        const url = URL.createObjectURL(files[0]);
        setPreviewUrl(url);
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

    await putApi("gallery", data._id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Gallery updated successfully");
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

  useEffect(() => {
    fetchData();
  }, []);

  // Cleanup preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
                <h4 className="second-title">
                  • Edit Photos and Videos Gallery
                </h4>
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="form-group row mb-0">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Edit Image/Video :
                      </label>
                      <div className="col-sm-8">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={
                              serverData?.name ? serverData?.name : data?.filename || "Please choose a file"
                            }
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleChange}
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Image/Video - {serverData?.name ? serverData?.name : data?.filename}
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
                    <div className="text-center">
                      {previewUrl ? (
                        <img
                          className="mt-5"
                          src={previewUrl}
                          style={{ width: "200px" }}
                          alt="img"
                        />
                      ) : (
                        <img
                          className="mt-5"
                          src={
                            process.env.REACT_APP_IMG_URL + data?.destination + "/" + data?.filename
                          }
                          style={{ width: "200px" }}
                          alt="img"
                        />
                      )}
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

export default EditGallery;
