import React from 'react';
import { Link } from "react-router-dom";
import AudioManager from './components/AudioManager';

const HomePage = () => {
  return (
      <AudioManager>
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/*Spooky Title*/}
      <h1 className="text-4xl md:text-6xl font-bold text-center text-red-500 mb-4">
        Soil & Silence
      </h1>

      {/* Subtitle / Tagline */}
      <p className="text-lg md:text-xl text-gray-400 mb-8 text-center max-w-lg">
        A chilling mystery awaits you. Uncover the horrors of Rose Hill Manor and
        face the Silent End.
      </p>

      {/* Button to start */}
      <a href="/start" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-xl text-lg transition-all duration-300">
        Begin Your Journey
      </a>
    </div>
    </AudioManager>
  );
};

export default HomePage;
