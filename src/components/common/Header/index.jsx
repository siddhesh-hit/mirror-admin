import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import avatarUser from "assets/user.png";

import { getApiById, postApi, putApi } from "services/axios";
import { logout } from "sredux/authSlice";
import { decrypt } from "lib/encrypt";

import { formatEnUsDateTime } from "lib/dateEnUsFormat";

export default function Header() {
  const [userProfile, setUserProfile] = useState({});
  const [notify, setNt] = useState({});
  const [notification, setNotification] = useState([]);

  const [isSubmitted, setSubmit] = useState(false);

  const state = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isSubmitted) return;

    setSubmit(true);
    await postApi("user/logout", {})
      .then((res) => {
        if (res.data.success) {
          dispatch(logout());
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    setSubmit(false);
  };

  const fetchData = async (id) => {
    await getApiById("notification", id)
      .then((res) => {
        setNt(res.data.data);
        setNotification([...res.data.data.user_specific]);
      })
      .catch((err) => console.log(err));
  };

  const handleStatusSubmit = async () => {
    await putApi("notification", userProfile.notificationId, {})
      .then((res) => {
        setNt(res.data.data);
        setNotification([
          ...res.data.data.user_specific.sort(
            (a, b) => new Date(b.time_span) - new Date(a.time_span)
          ),
        ]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (state && state.user && decrypt(state.user)) {
      let deData = JSON.parse(decrypt(state.user));
      deData && setUserProfile(deData);
    } else {
      navigate("/");
    }
  }, [state]);

  useEffect(() => {
    userProfile.notificationId && fetchData(userProfile.notificationId);
  }, [userProfile]);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="##"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <div
            className="nav-link"
            data-toggle="dropdown"
            onClick={handleStatusSubmit}
          >
            <i className="far fa-bell"></i>
            <span className="badge badge-warning navbar-badge">
              {notify && notify?.isRead ? "" : "-"}
            </span>
          </div>
          <div
            className="dropdown-menu dropdown-menu-lg dropdown-menu-right notouifi"
            style={{ maxWidth: "100%", minWidth: "300px", background: "white" }}
          >
            {notification?.map((item, index) => (
              <div key={index} className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i>
                <span style={{ whiteSpace: "pre-line" }}>{item.name}</span>
                <span className="float-right text-muted text-sm">
                  {formatEnUsDateTime(item.time_span)}
                </span>
              </div>
            ))}
          </div>
        </li>

        <li className="nav-item dropdown">
          <div
            className="nav-link"
            data-toggle="dropdown"
            style={{ paddingTop: "3px" }}
          >
            <div className="user-panel pb-3 mb-3 d-flex align-content-center">
              <div className="image">
                <img
                  src={
                    userProfile?.user_image?.destination &&
                      userProfile?.user_image?.filename
                      ? process.env.REACT_APP_IMG_URL +
                      userProfile?.user_image?.destination +
                      "/" +
                      userProfile?.user_image?.filename
                      : avatarUser
                  }
                  className="elevation-2"
                  alt="User"
                  style={{
                    height: "2.1rem",
                    width: "2.1rem",
                    objectFit: "fill",
                    borderRadius: "100px",
                  }}
                />
              </div>
              <div className="info">
                <div
                  href="#"
                  className="d-block"
                  style={{ color: "rgb(92 92 92)" }}
                >
                  {userProfile?.full_name}{" "}
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div
              // to={}
              onClick={() => handleLogout()}
              className="dropdown-item"
            >
              <i className="fa fa-sign-out" aria-hidden="true" />
              Logout
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
