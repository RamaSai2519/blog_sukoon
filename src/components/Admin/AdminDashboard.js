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

  const fetchData = async () => {
    try {
      // Fetch calls data
      const callsResponse = await axios.get('/api/calls');
      const { total_calls, successful_calls } = callsResponse.data;
      setTotalCalls(total_calls);
      setSuccessfulCalls(successful_calls);

      // Fetch users data
      const usersResponse = await axios.get('/api/users');
      const { users } = usersResponse.data;
      setTotalUsers(users.length);

      // Fetch experts data
      const expertsResponse = await axios.get('/api/experts');
      const { total_online_saarthis, online_saarthis } = expertsResponse.data;
      setOnlineSaarthis(total_online_saarthis);

      // Fetch latest calls data
      const latestCallsResponse = await axios.get('/api/latest_calls');
      const { latest_calls } = latestCallsResponse.data;
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
