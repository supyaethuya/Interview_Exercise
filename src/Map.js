// src/components/Map.js
import React from 'react';
import './App.css';

const Map = ({ location, onClose }) => {
  const { latitude, longitude, title } = location;
  // Build a Google Maps embed URL with zoom level 15 (adjust if needed)
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{title}</h2>
        <iframe
          title="Location Map"
          src={mapUrl}
          width="100%"
          height="400px"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
