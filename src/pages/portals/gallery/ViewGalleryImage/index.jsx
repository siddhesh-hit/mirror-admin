import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import back from "assets/back.svg";

import { API } from "lib/api";
import { getApiById } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ViewGalleryAsset = () => {
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("gallery", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.viewAllGallery}>
            <img src={back} alt="back" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• View Gallery Image</h4>
          <div className="card card-info">
            {data?.mimetype?.startsWith("image") ? (
              <>
                <img
                  className="mt-5 mb-5"
                  style={{
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                  src={API.baseUrl + data?.destination + "/" + data?.filename}
                  alt="gallery"
                />
              </>
            ) : (
              <>
                <video
                  muted
                  controls
                  style={{
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                  src={API.baseUrl + data?.destination + "/" + data?.filename}
                ></video>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGalleryAsset;
