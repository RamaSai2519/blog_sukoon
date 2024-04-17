// CallDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CallDetails = () => {
    const { callId } = useParams();
    const [call, setCall] = useState(null);

    useEffect(() => {
        // Fetch details of the specific call using callId
        axios.get(`/api/calls/${callId}`)
            .then(response => {
                setCall(response.data);
            })
            .catch(error => {
                console.error('Error fetching call details:', error);
            });
    }, [callId]);

    if (!call) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Call Details</h2>
            <p>Title: {call.title}</p>
            {/* Display other details of the call */}
        </div>
    );
}

export default CallDetails;
