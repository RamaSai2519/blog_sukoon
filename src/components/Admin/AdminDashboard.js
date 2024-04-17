// src/components/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const AdminDashboard = () => {
    const [callData, setCallData] = useState({ labels: [], datasets: [] });
    const [statistics, setStatistics] = useState({
        primeTimes: '',
        avgDuration: '',
        latestCall: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get('/api/calls')
            .then(response => {
                const calls = response.data;

                // Calculate statistics
                const totalCalls = calls.length;
                const totalDuration = calls.reduce((acc, call) => acc + call.duration, 0);
                const avgDuration = totalDuration / totalCalls;
                const latestCall = calls.length > 0 ? calls[calls.length - 1].callId : '';

                // Update statistics state
                setStatistics({
                    primeTimes: '6 PM - 9 PM', // Placeholder for now
                    avgDuration: `${Math.floor(avgDuration / 60)} minutes`,
                    latestCall: latestCall,
                });

                // Process call data for the line graph
                const dailyCalls = calls.reduce((acc, call) => {
                    const date = new Date(call.initiatedTime);
                    const day = date.toLocaleDateString();
                    acc[day] = (acc[day] || 0) + 1;
                    return acc;
                }, {});
                const labels = Object.keys(dailyCalls);
                const data = Object.values(dailyCalls);

                const newChartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Number of Calls',
                            data: data,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                };
                setCallData(newChartData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching call data:', error);
                setError('Error fetching call data. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                {/* Line graph displaying number of calls each day */}
                <Line data={callData} />
            </div>
            <div>
                {/* Statistics */}
                <h3>Statistics</h3>
                <p>Prime Times for Calls: {statistics.primeTimes}</p>
                <p>Average Duration of Calls: {statistics.avgDuration}</p>
                <p>Latest Call: {statistics.latestCall}</p>
            </div>
            <div>
                {/* Button to navigate to the list of all calls */}
                <Link to="/calls">
                    <button>View All Calls</button>
                </Link>
            </div>
            <div>
                {/* Table displaying all the experts who are online */}
                {/* We'll add the ExpertTable component here */}
            </div>
        </div>
    );
}

export default AdminDashboard;
