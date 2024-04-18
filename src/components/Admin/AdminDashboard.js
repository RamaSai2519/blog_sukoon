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
        date: new Date(call.initiatedTime),
        calls: 1
      }));
      return mappedData;
    } catch (error) {
      console.error('Error fetching call data:', error);
      return [];
    }
  };

  const renderChart = (callData) => {
    const filteredData = callData.filter(entry => entry.date.getFullYear() >= 2024 && entry.calls > 0); // Filter out entries with year less than 2024 and zero calls
    const labels = filteredData.map(entry => entry.date);
    const counts = filteredData.map(entry => entry.calls);

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
              type: 'date',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'DD',
                },
              },
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
