import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CropRecommendation.css';

const CropRecommendation = ({ recommendations }) => {
  const { t } = useTranslation();

  return (
    <div className="crop-recommendation-container">
      <h2 className="crop-title">{t('Top Recommended Crops')}</h2>
      <div className="crop-cards">
        {recommendations.map((rec, index) => (
          <div key={index} className="crop-card">
            <div className="crop-rank">#{rec.rank}</div>
            <div className="crop-icon">🌱</div>
            <h3 className="crop-name">{rec.crop}</h3>
            <div className="suitability-bar">
              <div
                className="suitability-fill"
                style={{ width: `${rec.suitabilityScore * 3}%` }}
              ></div>
            </div>
            <span className="suitability-score">{(rec.suitabilityScore * 3).toFixed(1)}%</span>
            <div className="crop-details">
              <div className="detail-item">
                <span className="icon">💰</span> {t(rec.profit.toLowerCase().replace(' ', '-')) || rec.profit}
              </div>
              <div className="detail-item">
                <span className="icon">📈</span> {t(rec.demand?.toLowerCase().replace(' ', '-')) || rec.demand}
              </div>
            </div>
            <div className="why-this-crop">
              <h4>{t('Why this crop?')}</h4>
              <ul>
                {rec.reasons.map((reason, i) => (
                  <li key={i}>{t(reason.replace(/[- ]/g, '-').toLowerCase()) || reason}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropRecommendation;