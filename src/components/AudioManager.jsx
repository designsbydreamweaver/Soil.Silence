import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AudioManager = ({ children }) => {
  const location = useLocation();
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    if (location.pathname === '/') {
      audio.src = '/audio/Main-Menu.mp3';
    } else if (location.pathname === '/start') {
      audio.src = '/audio/Main-Menu.mp3';
    }

    audio.loop = true;
    audio.volume = 2;

    const playAudio = () => {
      audio.play().catch((e) => {
        console.warn('Autoplay prevented:', e);
      });
    };

    window.addEventListener('click', playAudio, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('click', playAudio);
    };
  }, [location]);

  return <>{children}</>;
};

export default AudioManager;
