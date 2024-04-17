// CallList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CallList = () => {
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        // Fetch calls from the backend
        axios.get('/api/calls')
            .then(response => {
                setCalls(response.data);
            })
            .catch(error => {
                console.error('Error fetching calls:', error);
            });
    }, []);

    return (
        <div>
            <h2>List of Calls</h2>
            <ul>
                {calls.map(call => (
                    <li key={call.id}>{call.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default CallList;
