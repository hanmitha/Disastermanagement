
import React, { useState } from 'react';
import './App.css';
import DisasterAlert from './DisasterAlert';
import ReportDisasterForm from './ReportDisasterForm';

function App() {
  const [disasters, setDisasters] = useState([
    { id: 1, type: 'Flood', location: 'City A', severity: 'High' },
    { id: 2, type: 'Earthquake', location: 'City B', severity: 'Medium' },
  ]);

  // Function to add a new disaster report
  const addDisaster = (newDisaster) => {
    setDisasters([...disasters, newDisaster]);
  };

  return (
    <div className="App">
      <h1>Disaster Management System</h1>
      <DisasterAlert disasters={disasters} />
      <ReportDisasterForm addDisaster={addDisaster} />
    </div>
  );
}

export default App;
