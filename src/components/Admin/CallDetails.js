// CallDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CallDetails = () => {
    const { id } = useParams();
    const [call, setCall] = useState(null);

    useEffect(() => {
        // Fetch details of the selected call from the backend
        axios.get(`/api/calls/${id}`)
            .then(response => {
                setCall(response.data);
            })
            .catch(error => {
                console.error('Error fetching call details:', error);
            });
    }, [id]);

    if (!call) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Call Details</h2>
            <p>ID: {call.id}</p>
            <p>Title: {call.title}</p>
            {/* Add other details as needed */}
        </div>
    );
}

export default CallDetails;
