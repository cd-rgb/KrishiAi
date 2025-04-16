import React, { useState } from "react";
import { predictCosts } from "../services/api";
import "./InputForm.css"; // Add custom CSS file
import { useTranslation } from 'react-i18next';

function InputForm({ setResult }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    "Crop Type": "",
    "Crop Season": "",
    "Farm Size (acres)": "",
    "Soil Type": "",
    "Region": "",
    "Labor Availability": "",
    "Water Availability": "",
    "Pesticide Type": "",
    "Fertilizer Type": "",
    "Labor Cost Per Day": "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await predictCosts(formData);
      setResult(response);
      setError("");
    } catch (err) {
      setError(t("Failed to fetch prediction. Please try again."));
      setResult(null);
    }
  };

  // Custom validation function (basic implementation)
  const validateForm = () => {
    const inputs = document.querySelectorAll("input[required]");
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    });
    return isValid;
  };

  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await handleSubmit(e);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4 ">
      <h2 className="card-title mb-4 text-center text-success">
        {t("Enter Farm Details")}
      </h2>
      <form onSubmit={handleSubmitWithValidation} className="needs-validation" noValidate>
        {/* Crop Details Section */}
        <div className="card bg-light p-3 mb-4 custom-section crop-section">
          <h4 className="card-title mb-3 text-primary">{t("Crop Details")}</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="Crop Type" className="form-label">
                {t("Crop Type")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Crop Type"
                name="Crop Type"
                value={formData["Crop Type"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter a crop type.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Crop Season" className="form-label">
                {t("Crop Season")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Crop Season"
                name="Crop Season"
                value={formData["Crop Season"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter a crop season.")}</div>
            </div>
          </div>
        </div>

        {/* Farm Details Section */}
        <div className="card bg-light p-3 mb-4 custom-section farm-section">
          <h4 className="card-title mb-3 text-primary">{t("Farm Details")}</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="Farm Size (acres)" className="form-label">
                {t("Farm Size (acres)")}
              </label>
              <input
                type="number"
                className="form-control"
                id="Farm Size (acres)"
                name="Farm Size (acres)"
                value={formData["Farm Size (acres)"]}
                onChange={handleChange}
                required
                min="0"
              />
              <div className="invalid-feedback">{t("Please enter a valid farm size (minimum 0).")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Soil Type" className="form-label">
                {t("Soil Type")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Soil Type"
                name="Soil Type"
                value={formData["Soil Type"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter a soil type.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Region" className="form-label">
                {t("Region")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Region"
                name="Region"
                value={formData.Region}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter a region.")}</div>
            </div>
          </div>
        </div>

        {/* Resource Details Section */}
        <div className="card bg-light p-3 mb-4 custom-section resource-section">
          <h4 className="card-title mb-3 text-primary">{t("Resource Details")}</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="Labor Availability" className="form-label">
                {t("Labor Availability")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Labor Availability"
                name="Labor Availability"
                value={formData["Labor Availability"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter labor availability.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Water Availability" className="form-label">
                {t("Water Availability")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Water Availability"
                name="Water Availability"
                value={formData["Water Availability"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter water availability.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Pesticide Type" className="form-label">
                {t("Pesticide Type")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Pesticide Type"
                name="Pesticide Type"
                value={formData["Pesticide Type"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter a pesticide type.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Fertilizer Type" className="form-label">
                {t("Fertilizer Type")}
              </label>
              <input
                type="text"
                className="form-control"
                id="Fertilizer Type"
                name="Fertilizer Type"
                value={formData["Fertilizer Type"]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">{t("Please enter a fertilizer type.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Labor Cost Per Day" className="form-label">
                {t("Labor Cost Per Day")}
              </label>
              <input
                type="number"
                className="form-control"
                id="Labor Cost Per Day"
                name="Labor Cost Per Day"
                value={formData["Labor Cost Per Day"]}
                onChange={handleChange}
                required
                min="0"
              />
              <div className="invalid-feedback">{t("Please enter a valid labor cost (minimum 0).")}</div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100 mb-3">
          {t("Estimate Costs")}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default InputForm;