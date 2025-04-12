// src/App.js
import React, { useState } from 'react';
import Topics from './Topics';
import Programs from './Programs';
import openDayData from './OpenDay.json';
import './App.css'; // for any app-specific styles

  // Helper function to split a datetime string ("YYYY-MM-DDTHH:MM:SS")
  // into { date: "YYYY-MM-DD", time: "HH:MM" }
  export function getDateAndTime(datetime) {
    const [date, fullTime] = datetime.split('T');
    const time = fullTime.slice(0, 5);
    return { date, time };
  }

function App() {
  
  // State to determine if a topic has been selected (for showing programs)
  const [selectedTopic, setSelectedTopic] = useState(null);
  // For filtering items with a search text
  const [searchTerm, setSearchTerm] = useState("");
  // For sorting options – default depends on view
  // For topics: "asc" (A–Z) or "desc" (Z–A)
  // For programs: "timeAsc" or "timeDesc"
  const [sortOption, setSortOption] = useState("asc");

  // Handlers for search and sort fields
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Prepare the array to display based on view:
  // If no topic is selected, show topics from the JSON.
  // If a topic is selected, show its programs.
  let displayItems = [];
  if (!selectedTopic) {
    displayItems = openDayData.topics.filter(topic => {
      const lowerSearch = searchTerm.toLowerCase();
      return topic.name.toLowerCase().includes(lowerSearch) ||
             topic.description.toLowerCase().includes(lowerSearch);
    });
    // Sort topics by name
    displayItems.sort((a, b) => {
      if (sortOption === "asc") return a.name.localeCompare(b.name);
      else if (sortOption === "desc") return b.name.localeCompare(a.name);
      else return 0;
    });
  } else {
    displayItems = selectedTopic.programs.filter(program => {
      const lowerSearch = searchTerm.toLowerCase();
      return program.title.toLowerCase().includes(lowerSearch) ||
             program.description.toLowerCase().includes(lowerSearch);
    });
    // Sort programs by start_time as a Date
    displayItems.sort((a, b) => {
      if (sortOption === "timeAsc") return new Date(a.start_time) - new Date(b.start_time);
      else if (sortOption === "timeDesc") return new Date(b.start_time) - new Date(a.start_time);
      else return 0;
    });
  }

  const { cover_image, description, start_time, end_time } = openDayData;
  const { time: startTime } = getDateAndTime(start_time);
  const { time: endTime } = getDateAndTime(end_time);

  return (
     <div className="app-container">
      <div className="cover-image" style={{ backgroundImage: `url(${cover_image})` }}>
        <div className="overlay-card">
          <h1>{description}</h1>
          <p><strong>Time:</strong> {startTime} - {endTime}</p>
      </div>
      </div>
       {/* Search and Sort Section */}
       <div className="search-sort-container">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          {!selectedTopic ? (
            // Options for topics view
            <>
              <option value="asc">Sort A–Z</option>
              <option value="desc">Sort Z–A</option>
            </>
          ) : (
            // Options for programs view
            <>
              <option value="timeAsc">Sort by Time (Ascending)</option>
              <option value="timeDesc">Sort by Time (Descending)</option>
            </>
          )}
        </select>
      </div>
       {/* Render Topics or Programs based on selectedTopic */}
       { !selectedTopic ? (
        <Topics topics={displayItems} onSelectTopic={topic => {
          setSelectedTopic(topic);
          // Reset search and sort for programs view
          setSearchTerm("");
          setSortOption("timeAsc");
        }} />
      ) : (
        <Programs programs={displayItems} onBack={() => {
          setSelectedTopic(null);
          setSortOption("asc"); // Reset sort option for topics view
        }} />
      )}
    </div>
  );
}

export default App;
