import React from 'react';
import { Pie } from 'react-chartjs-2';
import { createPieChartData } from '../chartConfig';
import { useTranslation } from 'react-i18next';

function CostBreakdown({ result }) {
  const { t } = useTranslation();

  if (!result) return null;

  const chartData = createPieChartData(result.breakdown);
  const totalCost = parseInt(result['Total Cost Estimate'].replace('₹', '').replace(',', ''));

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h2 className="card-title mb-4 text-center">{t('Cost Breakdown')}</h2>
      <h3 className="text-success mb-4 text-center">{result['Total Cost Estimate']}</h3>
      <div className="row">
        <div className="col-md-6">
          <table className="table table-striped table-bordered">
            <tbody>
              {Object.entries(result.breakdown).map(([key, value]) => (
                <tr key={key}>
                  <td className="fw-bold">{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
              <tr className="table-success">
                <td className="fw-bold">{t('Total')}</td>
                <td>{result['Total Cost Estimate']}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div style={{ width: '300px', height: '300px' }}>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostBreakdown;