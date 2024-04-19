// src/components/Admin/LastFiveCallsTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LastFiveCallsTable = () => {
  const [lastFiveCalls, setLastFiveCalls] = useState([]);

  useEffect(() => {
    fetchAllCalls();
  }, []);

  const fetchAllCalls = async () => {
    try {
      const response = await axios.get('/api/calls');
      const allCalls = response.data;
      // Sort calls by initiated time in descending order
      allCalls.sort((a, b) => new Date(b.initiatedTime) - new Date(a.initiatedTime));
      // Get the last five calls
      const lastFive = allCalls.slice(0, 5);
      setLastFiveCalls(lastFive);
    } catch (error) {
      console.error('Error fetching calls:', error);
    }
  };

  return (
    <div>
      <p>Last Five Calls:</p>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Expert</th>
            <th>Time</th>
            <th>Call Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {lastFiveCalls.map(call => (
            <tr key={call._id}>
              <td>{call.user}</td>
              <td>{call.expert}</td>
              <td>{new Date(call.initiatedTime).toLocaleString()}</td>
              <td>{call.duration} min</td>
              <td>{call.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LastFiveCallsTable;
