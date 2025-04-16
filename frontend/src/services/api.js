import axios from "axios";

const API_URL = "http://localhost:5000";

export const predictCosts = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/predict`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to predict costs");
  }
};

export const recommendCrops = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to recommend crops");
  }
};
