// CallList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CallList = () => {
  const [calls, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/calls')
      .then(response => {
        setBlogs(response.data);
      })
  }, []);

    return (
        <div>
            <h2>List of Calls</h2>
            <ul>
                {calls.map(call => (
                    <li key={call.id}>
                        <Link to={`/calls/${call._id}`}>{call.callId}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CallList;
