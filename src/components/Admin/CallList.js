// src/components/Admin/CallList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CallList = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios.get('/api/calls')
      .then(response => {
        setCalls(response.data);
      })
  }, []);

    return (
        <div>
            <h2>List of Calls</h2>
            <ul>
                {calls.map(call => (
                    <li key={call.callId}>
                        <Link to={`/calls/${call.callId}`}>{call.callId}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CallList;
