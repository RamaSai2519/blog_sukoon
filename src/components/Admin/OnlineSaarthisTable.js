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
            <th>Busy</th>
          </tr>
        </thead>
        <tbody>
          {onlineSaarthis.map(saarthi => (
            <tr key={saarthi._id}>
              <td>{saarthi.name}</td>
              <td>{saarthi.isBusy ? 'Yes' : 'No'}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlineSaarthisTable;
