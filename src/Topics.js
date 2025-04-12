// src/components/Topics.js
import React from 'react';
import './App.css';

const Topics = ({ topics, onSelectTopic }) => {
  return (
    <div className="topics-container">
      {topics.map(topic => (
        <div className="topic-card" key={topic.id} onClick={() => onSelectTopic(topic)}>
          <img src={topic.cover_image} alt={topic.name} className="topic-image" />
          <h2>{topic.name}</h2>
          <p>{topic.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Topics;
