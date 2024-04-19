// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import CallGraph from './CallGraph';
import ExpertCallGraph from './ExpertCallGraph';

const AdminDashboard = () => {
  const [callData, setCallData] = useState([]);
  const [expertData, setExpertData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const callData = await fetchCallData();
        setCallData(callData);
        
        const expertData = await fetchExpertData();
        setExpertData(expertData);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const fetchExpertData = async () => {
    try {
      const response = await fetch('/api/experts');
      if (!response.ok) {
        throw new Error('Failed to fetch expert data');
      }
      const expertData = await response.json();
      return expertData;
    } catch (error) {
      console.error('Error fetching expert data:', error);
      return [];
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CallGraph />
      <ExpertCallGraph callData={callData} expertData={expertData} />
    </div>
  );
}

export default AdminDashboard;
