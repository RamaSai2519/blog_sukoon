// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallGraph from './CallGraph';
import ExpertGraph from './ExpertGraph';
import OnlineSaarthisTable from './OnlineSaarthisTable';
import LastFiveCallsTable from './LastFiveCallsTable';
import './AdminDashboard.css';

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
      const [callsResponse, successfulCallsResponse, onlineSaarthisResponse] = await Promise.all([
        axios.get('/api/calls'),
        axios.get('/api/successful-calls'),
        axios.get('/api/online-saarthis')
      ]);

      const callsData = callsResponse.data;
      const successfulCallsData = successfulCallsResponse.data;
      const onlineSaarthisData = onlineSaarthisResponse.data;

      setTotalCalls(callsData);
      setSuccessfulCalls(successfulCallsData);
      setTotalUsers(calculateTotalUsers(callsData));
      setOnlineSaarthis(onlineSaarthisData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalUsers = (callsData) => {
    const uniqueUsers = new Set(callsData.map(call => call.user));
    return uniqueUsers.size;
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-tiles">
        <div className="insight-tiles">
          <div className="grid-row">
            <div className="grid-tile-1">
              <h2>Total Calls</h2>
              <h3>{totalCalls.length}</h3>
            </div>
            <div className="grid-tile-1">
              <h2>Total Users</h2>
              <h3>{totalUsers}</h3>
            </div>
            <div className="grid-tile-1">
              <h2>Successful Calls</h2>
              <h3>{successfulCalls.length}</h3>
            </div>
            <div className="grid-tile-1">
              <h2>Online Saarthis</h2>
              <OnlineSaarthisTable onlineSaarthis={onlineSaarthis} />
            </div>
          </div>
        </div>
        <div className="dashboard-tile">
          <CallGraph />
        </div>
        <div className="dashboard-tile">
          <LastFiveCallsTable />
        </div>
        <div className="dashboard-tile">
          <ExpertGraph />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
