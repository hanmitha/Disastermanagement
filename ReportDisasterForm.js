import React, { useState } from 'react';

const ReportDisasterForm = ({ addDisaster }) => {
  const [disasterType, setDisasterType] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDisaster = {
      id: Math.random(),
      type: disasterType,
      location: location,
      severity: severity,
    };
    addDisaster(newDisaster);
    setDisasterType('');
    setLocation('');
    setSeverity('');
  };

  return (
    <div>
      <h2>Report a New Disaster</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Disaster Type"
          value={disasterType}
          onChange={(e) => setDisasterType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Report Disaster</button>
      </form>
    </div>
  );
};

export default ReportDisasterForm;

