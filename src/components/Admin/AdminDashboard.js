import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

const CallGraph = () => {
  const [chart, setChart] = useState(null);
  const [timeframe, setTimeframe] = useState('day'); // Default timeframe is day

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
  }, [timeframe]);

  const fetchCallData = async () => {
    try {
      const response = await fetch(`/api/calls?timeframe=${timeframe}`);
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
            data: counts
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

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <div>
      <h2>Number of Calls Over Time</h2>
      <div>
        <label>
          Select Timeframe:
          <select value={timeframe} onChange={handleTimeframeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
      <div style={{ height: '400px', width: '600px' }}>
        <canvas id="callChart"></canvas>
      </div>
    </div>
  );
};

export default CallGraph;
