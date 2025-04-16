import React from 'react';
import { Link } from 'react-router-dom';
import farm1 from '../assets/farm1.jpg';
// import farm2 from '../assets/farm2.jpeg';
import farm4 from '../assets/farm4.jpg';
import farm3 from '../assets/farm3.jpg';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="container my-5">
        {/* Hero Section */}
        <div className="hero-section text-center text-white p-5 rounded shadow-lg animate__animated animate__fadeIn" style={{ background: 'linear-gradient(135deg, #28a745, #218838)' }}>
          <h1 className="display-3 mb-3">{t('Welcome to KrishiAI')}</h1>
          <p className="lead mb-4">{t('Empower Your Farm with Smart Cost Insights')}</p>
          <div className="row g-3 mb-4 justify-content-center">
            <div className="col-md-4">
              <img src={farm1} alt={t('Farm Field')} className="img-fluid rounded shadow-sm animate__animated animate__zoomIn" />
            </div>
            <div className="col-md-4">
              <img src={farm4} alt={t('Farm Irrigation')} className="img-fluid rounded shadow-sm animate__animated animate__zoomIn" />
            </div>
            <div className="col-md-4">
              <img src={farm3} alt={t('Farm Harvest')} className="img-fluid rounded shadow-sm animate__animated animate__zoomIn" />
            </div>
          </div>
          <p className="mb-4">
            {t('KrishiAI helps farmers estimate agricultural costs with precision. Input your farm details to get a detailed cost breakdown for land preparation, seeds, fertilizers, and more.')}
          </p>
          <Link to="/cost-estimation" className="btn btn-light btn-lg px-4 py-2 shadow animate__animated animate__pulse infinite" style={{ background: '#ffffffcc' }}>
            {t('Start Estimating Costs')}
          </Link>
        </div>

        {/* Our Mission Section */}
        <div className="mission-section my-5 p-4 rounded shadow-lg bg-light">
          <h2 className="text-success mb-4">{t('Our Mission')}</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="lead">
                {t('At KrishiAI, our mission is to empower farmers with cutting-edge technology to optimize agricultural costs and improve productivity. We aim to bridge the gap between traditional farming practices and modern data-driven decisions.')}
              </p>
            </div>
            <div className="col-md-6">
              <img src={farm1} alt={t('Mission Image')} className="img-fluid rounded shadow-sm" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section my-5 p-4 rounded shadow-lg" style={{ background: '#e9ecef' }}>
          <h2 className="text-primary mb-4">{t('Features')}</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-calculator-fill display-4 text-success mb-3"></i>
                  <h5 className="card-title">{t('Accurate Cost Estimation')}</h5>
                  <p className="card-text">{t('Get precise cost breakdowns for every aspect of farming with our AI-powered tool.')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-gear-fill display-4 text-success mb-3"></i>
                  <h5 className="card-title">{t('Customizable Inputs')}</h5>
                  <p className="card-text">{t('Tailor your inputs to match your farm\'s unique conditions and resources.')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-bar-chart-fill display-4 text-success mb-3"></i>
                  <h5 className="card-title">{t('Visual Insights')}</h5>
                  <p className="card-text">{t('View your cost distribution with interactive charts for better decision-making.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us-section my-5 p-4 rounded shadow-lg bg-light">
          <h2 className="text-success mb-4">{t('Why Choose Us')}</h2>
          <div className="row align-items-center">
            <div className="col-md-6 order-md-2">
              <img src={farm3} alt={t('Why Choose Us Image')} className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6 order-md-1">
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><i className="bi bi-check-circle text-success me-2"></i>{t('AI-Driven Precision')}</li>
                <li className="list-group-item"><i className="bi bi-clock-history text-success me-2"></i>{t('Time-Saving Tools')}</li>
                <li className="list-group-item"><i className="bi bi-people-fill text-success me-2"></i>{t('Farmer-Centric Support')}</li>
                <li className="list-group-item"><i className="bi bi-shield-lock text-success me-2"></i>{t('Secure Data Handling')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;