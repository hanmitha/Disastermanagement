import React from 'react';

const DisasterAlert = ({ disasters }) => {
  return (
    <div>
      <h2>Disaster Alert</h2>
      {disasters.length === 0 ? (
        <p>No active disasters at the moment.</p>
      ) : (
        <ul>
          {disasters.map((disaster) => (
            <li key={disaster.id}>
              <strong>{disaster.type}</strong> - {disaster.location} (Severity: {disaster.severity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisasterAlert;
