// AdminLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform login logic
        // If login is successful, call onLogin function
        onLogin();
        // Redirect to calls page
        navigate('/calls');
    }

    return (
        <div>
            {/* Add your admin login form here */}
            <h2>Admin Login</h2>
            {/* Add login form inputs and submit button */}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default AdminLogin;
