import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { portalPaths, masterPaths, homePaths, removeIdFromPathname } from "data/RouteStructure";
import logo from "assets/logo.svg";

const Menu = () => {
  const location = useLocation();

  const [masterOpen, setMasterOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  const [navbar, setNavbar] = useState({ master: false, portal: false });

  const handleChange = (arg) => {
    if (arg === "master") {
      setNavbar((prev) => ({ ...prev, master: !navbar.master }));
    } else {
      setNavbar((prev) => ({ ...prev, portal: !navbar.portal }));
    }
  };

  useEffect(() => {
    if ((location && portalPaths.some((obj) => obj.path === location.pathname)) || portalPaths.some((path) => path.child.includes(removeIdFromPathname(location.pathname)))) {
      setPortalOpen(true);
    } else {
      setPortalOpen(false);
    }

    if ((location && masterPaths.some((obj) => obj.path === location.pathname)) || masterPaths.some((path) => path.child.includes(removeIdFromPathname(location.pathname)))) {
      setMasterOpen(true);
    } else {
      setMasterOpen(false);
    }
  }, [location]);

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/Dashboard" className="brand-link">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: "1" }}
          />
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar nav-legacy flex-column"
              data-widget="treeview"
              role="menu"
            >
              <li className="navs-header">Access MLS Portal</li>

              <NavLink
                to="/Dashboard"
                className="nav-link main borders"
                style={{ padding: "18px 20px" }}
              >
                <li className="nav-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 9C9 8.4477 9.4477 8 10 8H16C16.5523 8 17 8.4477 17 9V16C17 16.5523 16.5523 17 16 17H10C9.4477 17 9 16.5523 9 16V9Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 2C1 1.44772 1.44772 1 2 1H5C5.55228 1 6 1.44772 6 2V16C6 16.5523 5.55228 17 5 17H2C1.44772 17 1 16.5523 1 16V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 2C9 1.44772 9.4477 1 10 1H16C16.5523 1 17 1.44772 17 2V4C17 4.55228 16.5523 5 16 5H10C9.4477 5 9 4.55228 9 4V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  &nbsp;&nbsp;&nbsp;<p>Dashboard</p>
                </li>
              </NavLink>

              <li
                onClick={() => handleChange("master")}
                className={`nav-item has-treeview borders ${navbar.master ? "menu-open" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <a className="nav-link main">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 9C9 8.4477 9.4477 8 10 8H16C16.5523 8 17 8.4477 17 9V16C17 16.5523 16.5523 17 16 17H10C9.4477 17 9 16.5523 9 16V9Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 2C1 1.44772 1.44772 1 2 1H5C5.55228 1 6 1.44772 6 2V16C6 16.5523 5.55228 17 5 17H2C1.44772 17 1 16.5523 1 16V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 2C9 1.44772 9.4477 1 10 1H16C16.5523 1 17 1.44772 17 2V4C17 4.55228 16.5523 5 16 5H10C9.4477 5 9 4.55228 9 4V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  &nbsp;&nbsp;&nbsp;
                  <p>
                    Master <i className="fas fa-angle-right right" />
                  </p>
                </a>
                <ul className={`nav nav-treeview dots ${masterOpen ? "d-block" : ""}`}>
                  {masterPaths.map((item, index) => {
                    let active = location && item.child.includes(removeIdFromPathname(location.pathname));
                    return (
                      <Link
                        key={index}
                        className={`naav ${active ? "active" : ""}`}
                        to={item.path}
                      >
                        <li className="nav-item">
                          <i className="fa fa-circle" aria-hidden="true"></i>
                          {item.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </li>

              <li className="navs-header">CMS</li>
              <li
                onClick={() => handleChange("portal")}
                className={`nav-item has-treeview borders ${navbar.portal ? "menu-open" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <a className="nav-link main">
                  <i className="fas fa-flag" />
                  &nbsp;&nbsp;&nbsp;
                  <p>
                    MLS Portal pages <i className="fas fa-angle-right right" />
                  </p>
                </a>
                <ul className={`nav nav-treeview dots ${portalOpen ? "d-block" : ""}`}>
                  {portalPaths.map((item, index) => {
                    let active = location && item.child.includes(removeIdFromPathname(location.pathname));
                    return (
                      <Link
                        key={index}
                        className={`naav ${active ? "active" : ""}`}
                        to={item.path}
                      >
                        <li className="nav-item">
                          <i className="fa fa-circle" aria-hidden="true"></i>
                          {item.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </li>

              {homePaths?.map((item, index) => {
                let active = location && item.child.includes(removeIdFromPathname(location.pathname));

                return (
                  <li
                    className={`nav-item borders ${active ? "active" : ""}`}
                    key={index}
                  >
                    <Link
                      to={item.path}
                      className={`nav-link main ${active ? "active" : ""}`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 9C9 8.4477 9.4477 8 10 8H16C16.5523 8 17 8.4477 17 9V16C17 16.5523 16.5523 17 16 17H10C9.4477 17 9 16.5523 9 16V9Z"
                          stroke="#000088"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 2C1 1.44772 1.44772 1 2 1H5C5.55228 1 6 1.44772 6 2V16C6 16.5523 5.55228 17 5 17H2C1.44772 17 1 16.5523 1 16V2Z"
                          stroke="#000088"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 2C9 1.44772 9.4477 1 10 1H16C16.5523 1 17 1.44772 17 2V4C17 4.55228 16.5523 5 16 5H10C9.4477 5 9 4.55228 9 4V2Z"
                          stroke="#000088"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      &nbsp;&nbsp;&nbsp;
                      <p style={{ lineHeight: "1.4" }}>{item.name}</p>
                    </Link>
                  </li>
                );
              })}

              <li className="nav-item borders">
                <Link to="/Dashboard" className="nav-link main">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 9C9 8.4477 9.4477 8 10 8H16C16.5523 8 17 8.4477 17 9V16C17 16.5523 16.5523 17 16 17H10C9.4477 17 9 16.5523 9 16V9Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 2C1 1.44772 1.44772 1 2 1H5C5.55228 1 6 1.44772 6 2V16C6 16.5523 5.55228 17 5 17H2C1.44772 17 1 16.5523 1 16V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 2C9 1.44772 9.4477 1 10 1H16C16.5523 1 17 1.44772 17 2V4C17 4.55228 16.5523 5 16 5H10C9.4477 5 9 4.55228 9 4V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  &nbsp;&nbsp;&nbsp;<p>MIS Report</p>
                </Link>
              </li>

              <li className="nav-item borders">
                <Link to="/Dashboard" className="nav-link main">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 9C9 8.4477 9.4477 8 10 8H16C16.5523 8 17 8.4477 17 9V16C17 16.5523 16.5523 17 16 17H10C9.4477 17 9 16.5523 9 16V9Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 2C1 1.44772 1.44772 1 2 1H5C5.55228 1 6 1.44772 6 2V16C6 16.5523 5.55228 17 5 17H2C1.44772 17 1 16.5523 1 16V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 2C9 1.44772 9.4477 1 10 1H16C16.5523 1 17 1.44772 17 2V4C17 4.55228 16.5523 5 16 5H10C9.4477 5 9 4.55228 9 4V2Z"
                      stroke="#000088"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  &nbsp;&nbsp;&nbsp;<p>System Info</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
export default Menu;
