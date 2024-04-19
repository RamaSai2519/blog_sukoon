// AdminDashboard.js
import React from 'react';
import CallGraph from './CallGraph';
import ExpertGraph from './ExpertCallGraph';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CallGraph />
      <ExpertGraph />
    </div>
  );
}

export default AdminDashboard;
