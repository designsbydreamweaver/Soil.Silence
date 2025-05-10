import React from 'react';
import './JourneyStart.css';
import AudioManager from './components/AudioManager';
const JourneyStartPage = () => {
  return (
      <AudioManager>
    <div className="journey-start-container">
      <div className="earth-reveal-overlay">
        <h1 className="journey-title">The Earth Remembers</h1>
        <p className="journey-description">
          Beneath the soil lies silence... but it is never still.
        </p>
        <button className="continue-button">Descend</button>
      </div>
    </div>
    </AudioManager>
  );
};

export default JourneyStartPage;
