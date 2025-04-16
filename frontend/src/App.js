import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CostEstimation from './pages/CostEstimation';
import Footer from './components/Footer';
import './i18n'; // Ensure i18n is imported
import CropRecommendationPage from './pages/CropRecommendationPage';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cost-estimation" element={<CostEstimation />} />
              <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
            </Routes>
            
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;