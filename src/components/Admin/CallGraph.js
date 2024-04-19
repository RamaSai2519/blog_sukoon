// CallGraph.js
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

const CallGraph = () => {
  const [chart, setChart] = useState(null);
  const [timeframe, setTimeframe] = useState('year'); // Default timeframe is year

  useEffect(() => {
    const fetchData = async () => {
      try {
        const callData = await fetchCallData();
        const filteredData = filterData(callData);
        renderChart(filteredData);
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

  const filterData = (callData) => {
    let startDate = new Date();
    switch (timeframe) {
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    const filteredData = callData.filter(call => new Date(call.initiatedTime) > startDate);
    return filteredData;
  };

  const renderChart = (callData) => {
    const aggregatedData = callData.reduce((acc, curr) => {
      const date = new Date(curr.initiatedTime).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const counts = Object.values(aggregatedData);

    const ctx = document.getElementById('callChart');

    if (chart) {
      chart.destroy();
    }

    if (ctx) {
      const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(54, 162, 235, 1)'); // Start color
      gradient.addColorStop(1, 'rgba(54, 162, 235, 0)'); // End color

      setChart(new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            borderColor: gradient, // Line color
            tension: 0.4,
          }]
        },
        options: {
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
            },
            y: {
              display: false,
              title: {
                display: true,
                text: 'Number of Calls',
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        },
      }));

      chart.update();
    }
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <div className='calls-table' style={{ height: '100%', width: '100%' }}>
      <h2>Number of Calls Over Time</h2>
      <div>
        <label>
          Select Timeframe:
          <select value={timeframe} onChange={handleTimeframeChange}>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </label>
      </div>
      <div className='call-chart' style={{ height: '100%', width: '100%' }}>
        <canvas id="callChart"></canvas>
      </div>
    </div>
  );
};

export default CallGraph;
