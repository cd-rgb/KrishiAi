import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CropRecommendation from '../components/CropRecommendation';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import '../styles/CropRecommendationPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CropRecommendationPage = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    N: 90,
    P: 42,
    K: 43,
    temperature: 24.5,
    humidity: 70.2,
    ph: 6.5,
    rainfall: 210,
    state: 'Punjab',
    district: 'Ludhiana',
    season: 'rabi',
    irrigation: 'groundwater',
    water_availability: 'high',
    soil_type: 'alluvial',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Response data:', data);
      if (data.recommendations) setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    fetchRecommendations();
  };

  // Chart data configuration
  const chartData = {
    labels: recommendations.map((rec) => rec.crop),
    datasets: [
      {
        label: t('Suitability Score (%)'),
        data: recommendations.map((rec) => rec.suitabilityScore * 3),
        backgroundColor: ['#2e7d32', '#66bb6a', '#a5d6a7'],
        borderColor: ['#205723', '#388e3c', '#81c784'],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `${t('Crop Suitability Comparison')} (Based on N:${formData.N}, P:${formData.P}, K:${formData.K}, Temp:${formData.temperature}°C)`,
        color: '#2e7d32',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const crop = context.label;
            const score = context.raw;
            return `${crop}: ${score}% ${t('suitability')} (Input: ${t('State')}=${formData.state}, ${t('Soil Type')}=${formData.soil_type})`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: t('Suitability Score (%)'),
          color: '#555555',
        },
        ticks: {
          color: '#555555',
        },
      },
      x: {
        title: {
          display: true,
          text: t('Crops'),
          color: '#555555',
        },
        ticks: {
          color: '#555555',
        },
      },
    },
  };

  return (
    <div className="crop-recommendation-page">
      <h1 className="page-title">{t('Crop Recommendation')}</h1>
      <form onSubmit={handleSubmit} className="recommendation-form">
        {/* Nutrient Levels Section */}
        <div className="form-section nutrients">
          <h3 className="section-title">{t('Nutrient Levels')}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="N">{t('Nitrogen (N)')}</label>
              <input
                type="number"
                id="N"
                name="N"
                value={formData.N}
                onChange={handleChange}
                placeholder={t('Nitrogen (N)')}
                step="1"
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="P">{t('Phosphorus (P)')}</label>
              <input
                type="number"
                id="P"
                name="P"
                value={formData.P}
                onChange={handleChange}
                placeholder={t('Phosphorus (P)')}
                step="1"
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="K">{t('Potassium (K)')}</label>
              <input
                type="number"
                id="K"
                name="K"
                value={formData.K}
                onChange={handleChange}
                placeholder={t('Potassium (K)')}
                step="1"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Environmental Conditions Section */}
        <div className="form-section environment">
          <h3 className="section-title">{t('Environmental Conditions')}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="temperature">{t('Temperature (°C)')}</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder={t('Temperature (°C)')}
                step="0.1"
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="humidity">{t('Humidity (%)')}</label>
              <input
                type="number"
                id="humidity"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                placeholder={t('Humidity (%)')}
                step="0.1"
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rainfall">{t('Rainfall (mm)')}</label>
              <input
                type="number"
                id="rainfall"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder={t('Rainfall (mm)')}
                step="1"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Location Details Section */}
        <div className="form-section location">
          <h3 className="section-title">{t('Location Details')}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">{t('State')}</label>
              <select id="state" name="state" value={formData.state} onChange={handleChange}>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="district">{t('District')}</label>
              <select id="district" name="district" value={formData.district} onChange={handleChange}>
                <option value="Ludhiana">Ludhiana</option>
                <option value="Pune">Pune</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Chennai">Chennai</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Patna">Patna</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
          </div>
        </div>

        {/* Crop & Season Section */}
        <div className="form-section crop">
          <h3 className="section-title">{t('Crop & Season')}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="season">{t('Crop Season')}</label>
              <select id="season" name="season" value={formData.season} onChange={handleChange}>
                <option value="rabi">Rabi</option>
                <option value="kharif">Kharif</option>
                <option value="zaid">Zaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Water Management Section */}
        <div className="form-section water">
          <h3 className="section-title">{t('Water Management')}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="water_availability">{t('Water Availability')}</label>
              <select
                id="water_availability"
                name="water_availability"
                value={formData.water_availability}
                onChange={handleChange}
              >
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="irrigation">{t('Irrigation Type')}</label>
              <select id="irrigation" name="irrigation" value={formData.irrigation} onChange={handleChange}>
                <option value="groundwater">Groundwater</option>
                <option value="canal">Canal Irrigation</option>
                <option value="river">River</option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler Irrigation</option>
                <option value="rainfed">Rainfed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Soil Details Section */}
        <div className="form-section soil">
          <h3 className="section-title">{t('Soil Details')}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="soil_type">{t('Soil Type')}</label>
              <select id="soil_type" name="soil_type" value={formData.soil_type} onChange={handleChange}>
                <option value="alluvial">Alluvial</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silty">Silty</option>
                <option value="peaty">Peaty</option>
                <option value="chalky">Chalky</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ph">{t('Soil pH')}</label>
              <input
                type="number"
                id="ph"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                placeholder={t('Soil pH')}
                step="0.1"
                min="0"
                max="14"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          {t('Get Recommendations')}
        </button>
      </form>
      <CropRecommendation recommendations={recommendations} />
      {recommendations.length > 0 && (
        <div className="chart-container" style={{ padding: '20px' }}>
          <h2 className="chart-title">{t('Suitability Comparison')}</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
      <button className="btn btn-primary mt-3" onClick={() => navigate('/cost-estimation')}>
        {t('Go to Cost Estimation')}
      </button>
    </div>
  );
};

export default CropRecommendationPage;