// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import CallGraph from './CallGraph';
import ExpertCallGraph from './ExpertCallGraph';

const AdminDashboard = () => {
  const [callData, setCallData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const callData = await fetchCallData();
        setCallData(callData);
      } catch (error) {
        console.error('Error fetching call data:', error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CallGraph />
      <ExpertCallGraph callData={callData} />
    </div>
  );
}

export default AdminDashboard;
