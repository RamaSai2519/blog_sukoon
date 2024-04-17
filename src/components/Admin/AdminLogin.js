// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Check if email and password match the admin credentials
        if (email === 'admin' && password === '123') {
            // If credentials match, call onLogin function and redirect
            onLogin();
            navigate('/calls');
        } else {
            // If credentials don't match, display error message
            setError('Invalid email or password');
        }
    }

    return (
        <div>
            {/* Add your admin login form here */}
            <h2>Admin Login</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AdminLogin;
