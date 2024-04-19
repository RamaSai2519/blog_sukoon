import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LastFiveCallsTable = () => {
  const [lastFiveCalls, setLastFiveCalls] = useState([]);

  useEffect(() => {
    fetchLastFiveCalls();
  }, []);

  const fetchLastFiveCalls = async () => {
    try {
      const response = await axios.get('/api/last-five-calls');
      setLastFiveCalls(response.data);
    } catch (error) {
      console.error('Error fetching last five calls:', error);
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
              <td>{call.userName}</td>
              <td>{call.expertName}</td>
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
