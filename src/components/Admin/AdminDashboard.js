// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallGraph from './CallGraph';
import ExpertGraph from './ExpertGraph';

const AdminDashboard = () => {
  const [totalCalls, setTotalCalls] = useState(0);
  const [successfulCalls, setSuccessfulCalls] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [onlineSaarthis, setOnlineSaarthis] = useState([]);
  const [latestCalls, setLatestCalls] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      // Fetch calls data
      const callsResponse = await fetch('/api/calls');
      const { total_calls, successful_calls } = await callsResponse.json();
      setTotalCalls(total_calls);
      setSuccessfulCalls(successful_calls);

      // Fetch users data
      const usersResponse = await fetch('/api/users');
      const { users } = await usersResponse.json();
      setTotalUsers(users.length);

      // Fetch experts data
      const expertsResponse = await fetch('/api/experts');
      const { total_online_saarthis, online_saarthis } = await expertsResponse.json();
      setOnlineSaarthis(total_online_saarthis);

      // Fetch latest calls data
      const latestCallsResponse = await fetch('/api/latest_calls');
      const { latest_calls } = await latestCallsResponse.json();
      setLatestCalls(latest_calls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <p>Total Calls: {totalCalls}</p>
        <p>Total Successful Calls: {successfulCalls}</p>
        <p>Total Users: {totalUsers}</p>
        <p>Online Saarthis: {onlineSaarthis.length}</p>
        <h3>Latest 5 Calls:</h3>
        <ul>
          {latestCalls.map(call => (
            <li key={call._id}>{call.initiatedTime} - {call.status}</li>
          ))}
        </ul>
      </div>
      <CallGraph />
      <ExpertGraph />
    </div>
  );
};

export default AdminDashboard;
