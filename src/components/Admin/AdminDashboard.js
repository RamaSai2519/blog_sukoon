import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

const CallGraph = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const callData = await fetchCallData();
        renderChart(callData);
      } catch (error) {
        console.error('Error fetching call data:', error);
      }
    };

    fetchData();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const fetchCallData = async () => {
    try {
      const response = await fetch('/api/calls');
      if (!response.ok) {
        throw new Error('Failed to fetch call data');
      }
      const callData = await response.json();
      const mappedData = callData.map(call => ({
        date: new Date(call.initiatedTime).toDateString(), // Convert to date string to group by day
        calls: 1
      }));
      return mappedData;
    } catch (error) {
      console.error('Error fetching call data:', error);
      return [];
    }
  };

  const renderChart = (callData) => {
    // Aggregate data by day and sum up calls
    const aggregatedData = callData.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.calls;
      return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const counts = Object.values(aggregatedData);

    const ctx = document.getElementById('callChart');

    if (chart) {
      chart.destroy();
    }

    if (ctx) {
      setChart(new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Calls',
            data: counts,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
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
      <h2>Number of Calls Over Time</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <canvas id="callChart"></canvas>
      </div>
    </div>
  );
};

export default CallGraph;
