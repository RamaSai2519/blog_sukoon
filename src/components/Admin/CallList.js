// CallList.js
import React from 'react';
import { Link } from 'react-router-dom';

const CallList = ({ calls }) => {
    return (
        <div>
            <h2>List of Calls</h2>
            <ul>
                {calls.map(call => (
                    <li key={call.id}>
                        <Link to={`/calls/${call.id}`}>{call.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CallList;
