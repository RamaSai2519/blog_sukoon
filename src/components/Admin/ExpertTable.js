// src/components/Admin/ExpertTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpertTable = () => {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        // Fetch list of online experts from the backend
        axios.get('/api/experts')
            .then(response => {
                setExperts(response.data);
            })
            .catch(error => {
                console.error('Error fetching online experts:', error);
            });
    }, []);

    return (
        <div>
            <h3>Online Experts</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {experts.map(expert => (
                        <tr key={expert._id}>
                            <td>{expert.name}</td>
                            <td>Online</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExpertTable;
