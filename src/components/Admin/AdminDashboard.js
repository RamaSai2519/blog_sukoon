// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallGraph from './CallGraph';
import ExpertGraph from './ExpertGraph';

const AdminDashboard = () => {
  const [totalCalls, setTotalCalls] = useState([]);
  const [successfulCalls, setSuccessfulCalls] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [onlineSaarthis, setOnlineSaarthis] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [callsResponse, successfulCallsResponse] = await Promise.all([
        axios.get('/api/calls'),
        axios.get('/api/successful-calls')
      ]);

      const callsData = callsResponse.data;
      const successfulCallsData = successfulCallsResponse.data;

      setTotalCalls(callsData);
      setSuccessfulCalls(successfulCallsData);
      setTotalUsers(calculateTotalUsers(callsData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalUsers = (callsData) => {
    // Calculate the total number of unique users from all calls
    const uniqueUsers = new Set(callsData.map(call => call.user));
    return uniqueUsers.size;
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <p>Total Calls: {totalCalls.length}</p>
        <p>Total Successful Calls: {successfulCalls.length}</p>
        <p>Total Users: {totalUsers}</p>
        <p>Online Saarthis: {onlineSaarthis.length}</p>
      </div>
      <CallGraph />
      <ExpertGraph />
    </div>
  );
};

export default AdminDashboard;
