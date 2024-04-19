// ExpertCallGraph.js
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ExpertCallGraph = ({ callData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    renderChart(callData);
  }, [callData]);

  const renderChart = (callData) => {
    const expertCalls = {};

    callData.forEach(call => {
      const expertId = call.expert.$oid;
      expertCalls[expertId] = (expertCalls[expertId] || 0) + 1;
    });

    const labels = Object.keys(expertCalls);
    const counts = Object.values(expertCalls);

    const ctx = document.getElementById('expertCallChart');

    if (chart) {
      chart.destroy();
    }

    if (ctx) {
      setChart(new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Calls per Expert',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Expert ID',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Calls',
              },
            },
          },
        },
      }));
    }
  };

  return (
    <div>
      <h2>Number of Calls per Expert</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <canvas id="expertCallChart"></canvas>
      </div>
    </div>
  );
};

export default ExpertCallGraph;
