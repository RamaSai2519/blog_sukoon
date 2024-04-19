// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallGraph from './CallGraph';
import ExpertGraph from './ExpertGraph';

const AdminDashboard = () => {
    const [totalCalls, setTotalCalls] = useState([]);
    const [successfulCalls, setSuccessfulCalls] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [onlineSaarthis, setOnlineSaarthis] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/calls');
            const callsData = response.data;
            setTotalCalls(callsData);
            // setSuccessfulCalls(calculateTotalCalls(callsData));
            const successfulCallsCount = callsData.filter(call => call.status === 'successful').length;
            setSuccessfulCalls(successfulCallsCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalCalls = (callsData) => {
        // Calculate the total number of calls
        return callsData.length;
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <p>Total Calls: {totalCalls.length}</p>
                <p>Total Successful Calls: {successfulCalls}</p>
                <p>Total Users: {totalUsers}</p>
                <p>Online Saarthis: {onlineSaarthis.length}</p>
            </div>
            <CallGraph />
            <ExpertGraph />
        </div>
    );
};

export default AdminDashboard;
