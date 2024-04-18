import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

const CallGraph = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    console.log("useEffect called");
    const fetchData = async () => {
      try {
        console.log("fetchData called");
        const callData = await fetchCallData();
        console.log("Call data fetched:", callData);
        renderChart(callData);
      } catch (error) {
        console.error('Error fetching call data:', error);
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup");
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const fetchCallData = async () => {
    try {
      console.log("fetchCallData called");
      const response = await fetch('/api/calls');
      if (!response.ok) {
        throw new Error('Failed to fetch call data');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const callData = await response.json();
        const mappedData = callData.map(call => ({
          date: new Date(call.initiatedTime?.$date?.$numberLong),
          calls: 1
        }));
        console.log("Call data mapped:", mappedData);
        return mappedData;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching call data:', error);
      return [];
    }
  };

  const renderChart = (callData) => {
    console.log("renderChart called");
    const labels = callData.map(entry => entry.date);
    const counts = callData.map(entry => entry.calls);

    const ctx = document.getElementById('callChart');

    if (chart) {
      chart.destroy();
    }

    if (ctx) {
      console.log("Chart rendering...");
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
              type: 'time',
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
              beginAtZero: true,
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
