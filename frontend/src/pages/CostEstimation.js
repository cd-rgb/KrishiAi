import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import CostBreakdown from '../components/CostBreakdown';

function CostEstimation() {
  const [result, setResult] = useState(null);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <InputForm setResult={setResult} />
          <CostBreakdown result={result} />
        </div>
      </div>
    </div>
  );
}

export default CostEstimation;