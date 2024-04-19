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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const callsResponse = await axios.get('/api/calls');
      const usersResponse = await axios.get('/api/users');
      const expertsResponse = await axios.get('/api/experts');
  
      // Check if any of the responses are empty
      if (!callsResponse.data || !usersResponse.data || !expertsResponse.data || !latestCallsResponse.data) {
        throw new Error('Empty response received');
      }
  
      // Set state with the fetched data
      setTotalCalls(callsResponse.data.total_calls);
      setSuccessfulCalls(callsResponse.data.successful_calls);
      setTotalUsers(usersResponse.data.users.length);
      setOnlineSaarthis(expertsResponse.data.total_online_saarthis);
      setLatestCalls(latestCallsResponse.data.latest_calls);
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
          {totalCalls.map(call => (
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
