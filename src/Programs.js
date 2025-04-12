// src/components/Programs.js
import React, { useState } from 'react';
import { getDateAndTime } from './App';
import Map from './Map';
import './App.css';

const Programs = ({ programs, onBack }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleProgramClick = (program) => {
    if (program.location && program.location.latitude && program.location.longitude) {
      setSelectedLocation(program.location);
    }
  };

//   // Helper function to split a datetime string ("YYYY-MM-DDTHH:MM:SS")
//   // into { date: "YYYY-MM-DD", time: "HH:MM" }
//   const getDateAndTime = (datetime) => {
//     const [date, fullTime] = datetime.split('T');
//     const time = fullTime.slice(0, 5); // "HH:MM"
//     return { date, time };
//   };

  return (
    <div>
      <button onClick={onBack} className="back-button">Back to Topics</button>
      
      <div className="programs-container">
        {programs.map((program) => {
          // Extract date and time from start_time and end_time.
          // Since the date is the same, we only need one date.
          const { date: programDate, time: startTime } = getDateAndTime(program.start_time);
          const { time: endTime } = getDateAndTime(program.end_time);
          
          return (
            <div
              className="program-card"
              key={program.id}
              onClick={() => handleProgramClick(program)}
            >
              <div className="program-text">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
              <div className="program-info">
                <p><strong>Date:</strong> {programDate}</p>
                <p>
                  <strong>Time:</strong> {startTime} - {endTime}
                </p>
                <p><strong>Room:</strong> {program.room}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedLocation && (
        <Map
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
};

export default Programs;
