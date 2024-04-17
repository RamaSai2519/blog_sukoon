// src/components/Admin/ExpertTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpertTable = () => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get('/api/experts') // Assuming this endpoint fetches the data of online experts
            .then(response => {
                setExperts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching expert data:', error);
                setError('Error fetching expert data. Please try again later.');
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
            <h3>Online Experts</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {experts.map(expert => (
                        <tr key={expert._id}>
                            <td>{expert.name}</td>
                            <td>{expert.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExpertTable;
