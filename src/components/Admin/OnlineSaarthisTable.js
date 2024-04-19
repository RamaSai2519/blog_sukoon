// src/components/Admin/OnlineSaarthisTable.js
import React from 'react';

const OnlineSaarthisTable = ({ onlineSaarthis }) => {
  return (
    <div>
      <p>Online Saarthis:</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {onlineSaarthis.map(saarthi => (
            <tr key={saarthi._id}>
              <td>{saarthi.name}</td>
              <td>{saarthi.isBusy}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlineSaarthisTable;
