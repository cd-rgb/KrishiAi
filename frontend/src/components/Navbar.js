import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-gradient"
      style={{
        backgroundColor: "#28a745",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span
            className="material-icons text-white me-2"
            style={{ fontSize: "2rem" }}
          >
            agriculture
          </span>
          <span className="fs-4 fw-bold text-white">KrishiAI</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
                style={{ transition: "all 0.3s ease", margin: "0 1rem" }}
              >
                {t("Home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/crop-recommendation" ? "active" : ""
                }`}
                to="/crop-recommendation"
                style={{ transition: "all 0.3s ease", margin: "0 1rem" }}
              >
                {t("Crop Recommendation")}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/cost-estimation" ? "active" : ""
                }`}
                to="/cost-estimation"
                style={{ transition: "all 0.3s ease", margin: "0 1.5rem" }}
              >
                {t("Cost Estimation")}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "white", transition: "all 0.3s ease" }}
              >
                {t("Language")}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="languageDropdown"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="en"
                    onClick={changeLanguage}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="hi"
                    onClick={changeLanguage}
                  >
                    हिन्दी (Hindi)
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="mr"
                    onClick={changeLanguage}
                  >
                    मराठी (Marathi)
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="ta"
                    onClick={changeLanguage}
                  >
                    தமிழ் (Tamil)
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    value="pa"
                    onClick={changeLanguage}
                  >
                    ਪੰਜਾਬੀ (Punjabi)
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
