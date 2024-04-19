// ExpertGraph.js
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ExpertGraph = () => {
  const [callData, setCallData] = useState([]);
  const [expertData, setExpertData] = useState({});
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [callDataResponse, expertDataResponse] = await Promise.all([
          fetchCallData(),
          fetchExpertData()
        ]);
        
        setCallData(callDataResponse);
        setExpertData(expertDataResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (callData.length > 0 && Object.keys(expertData).length > 0) {
      renderChart(callData, expertData);
    }
  }, [callData, expertData]);

  const fetchCallData = async () => {
    try {
      const response = await fetch('/api/calls');
      if (!response.ok) {
        throw new Error('Failed to fetch call data');
      }
      const callData = await response.json();
      return callData;
    } catch (error) {
      console.error('Error fetching call data:', error);
      return [];
    }
  };

  const fetchExpertData = async () => {
    try {
      const response = await fetch('/api/experts');
      if (!response.ok) {
        throw new Error('Failed to fetch expert data');
      }
      const expertData = await response.json();
      return expertData.reduce((acc, expert) => {
        acc[expert._id] = expert; // Assuming expert._id is unique
        return acc;
      }, {});
    } catch (error) {
      console.error('Error fetching expert data:', error);
      return {};
    }
  };

  const renderChart = (callData, expertData) => {
    const expertCalls = {};

    callData.forEach(call => {
      const expertId = call.expert;
      const expert = expertData[expertId];
      if (expert) {
        const expertName = expert.name;
        expertCalls[expertName] = (expertCalls[expertName] || 0) + 1;
      }
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
                text: 'Expert Name',
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

export default ExpertGraph;
