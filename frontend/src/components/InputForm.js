import React, { useState } from "react";
import { predictCosts } from "../services/api";
import "./InputForm.css"; // Add custom CSS file
import { useTranslation } from "react-i18next";

function InputForm({ setResult }) {
  const { t } = useTranslation();

  // State-to-district mapping
  const stateToDistricts = {
    Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
    Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem"],
  };

  const [formData, setFormData] = useState({
    "State": "",
    "District": "",
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

  const [districts, setDistricts] = useState([]); // State to hold districts for the selected state
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update districts when state changes
    if (name === "State") {
      setDistricts(stateToDistricts[value] || []); // Update districts based on selected state
      setFormData({ ...formData, State: value, District: "" }); // Reset district when state changes
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  const validateForm = () => {
    const inputs = document.querySelectorAll("select[required], input[required]");
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
        {/* State and District Section */}
        <div className="card bg-light p-3 mb-4 custom-section location-section">
          <h4 className="card-title mb-3 text-primary">{t("Location Details")}</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="State" className="form-label">
                {t("State")}
              </label>
              <select
                className="form-control"
                id="State"
                name="State"
                value={formData["State"]}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select State")}</option>
                {Object.keys(stateToDistricts).map((state) => (
                  <option key={state} value={state}>
                    {t(state)} {/* Translate state names */}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{t("Please select a state.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="District" className="form-label">
                {t("District")}
              </label>
              <select
                className="form-control"
                id="District"
                name="District"
                value={formData["District"]}
                onChange={handleChange}
                required
                disabled={!districts.length} // Disable if no districts are available
              >
                <option value="">{t("Select District")}</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {t(district)} {/* Translate district names */}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{t("Please select a district.")}</div>
            </div>
          </div>
        </div>

        {/* Crop Details Section */}
        <div className="card bg-light p-3 mb-4 custom-section crop-section">
          <h4 className="card-title mb-3 text-primary">{t("Crop Details")}</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="Crop Type" className="form-label">
                {t("Crop Type")}
              </label>
              <select
                className="form-control"
                id="Crop Type"
                name="Crop Type"
                value={formData["Crop Type"]}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select Crop Type")}</option>
                <option value="Wheat">{t("Wheat")}</option>
                <option value="Rice">{t("Rice")}</option>
                <option value="Maize">{t("Maize")}</option>
                <option value="Sugarcane">{t("Sugarcane")}</option>
                <option value="Cotton">{t("Cotton")}</option>
              </select>
              <div className="invalid-feedback">{t("Please select a crop type.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Crop Season" className="form-label">
                {t("Crop Season")}
              </label>
              <select
                className="form-control"
                id="Crop Season"
                name="Crop Season"
                value={formData["Crop Season"]}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select Crop Season")}</option>
                <option value="Rabi">{t("Rabi")}</option>
                <option value="Kharif">{t("Kharif")}</option>
                <option value="Zaid">{t("Zaid")}</option>
              </select>
              <div className="invalid-feedback">{t("Please select a crop season.")}</div>
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
              <select
                className="form-control"
                id="Soil Type"
                name="Soil Type"
                value={formData["Soil Type"]}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select Soil Type")}</option>
                <option value="Alluvial">{t("Alluvial")}</option>
                <option value="Black">{t("Black")}</option>
                <option value="Red">{t("Red")}</option>
                <option value="Laterite">{t("Laterite")}</option>
                <option value="Sandy">{t("Sandy")}</option>
              </select>
              <div className="invalid-feedback">{t("Please select a soil type.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Region" className="form-label">
                {t("Region")}
              </label>
              <select
                className="form-control"
                id="Region"
                name="Region"
                value={formData.Region}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select Region")}</option>
                <option value="North">{t("North")}</option>
                <option value="South">{t("South")}</option>
                <option value="East">{t("East")}</option>
                <option value="West">{t("West")}</option>
              </select>
              <div className="invalid-feedback">{t("Please select a region.")}</div>
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
              <select
                className="form-control"
                id="Labor Availability"
                name="Labor Availability"
                value={formData["Labor Availability"]}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select Labor Availability")}</option>
                <option value="High">{t("High")}</option>
                <option value="Medium">{t("Medium")}</option>
                <option value="Low">{t("Low")}</option>
              </select>
              <div className="invalid-feedback">{t("Please select labor availability.")}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="Water Availability" className="form-label">
                {t("Water Availability")}
              </label>
              <select
                className="form-control"
                id="Water Availability"
                name="Water Availability"
                value={formData["Water Availability"]}
                onChange={handleChange}
                required
              >
                <option value="">{t("Select Water Availability")}</option>
                <option value="High">{t("High")}</option>
                <option value="Medium">{t("Medium")}</option>
                <option value="Low">{t("Low")}</option>
              </select>
              <div className="invalid-feedback">{t("Please select water availability.")}</div>
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