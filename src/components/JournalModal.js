import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

export default function JournalModal({ code, onClose }) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchJournalEntry = async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('code', code)
        .eq('episode', 1)
        .single();

      if (error) {
        console.error('Error fetching journal:', error);
      } else {
        setEntry(data);
      }

      setLoading(false);
    };

    fetchJournalEntry();

    // Play ambient whispers
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => console.warn('Autoplay blocked:', err));
    }

    return () => {
      // Stop audio on close
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [code]);

  if (!entry && loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white text-lg">
        Loading journal...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Ambient whispers audio */}
      <audio ref={audioRef} src="/audio/whispers-loop.wav" preload="auto" />

      {/* Flickering glow background */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-300 opacity-20 blur-3xl rounded-full animate-flicker z-0"></div>

      <div className="bg-[url('/components/paper-texture.jpg')] bg-cover bg-center text-gray-800 rounded-xl shadow-lg max-w-xl w-full p-6 relative border-4 border-dashed border-brown-800 font-journal">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-800 text-lg font-bold hover:text-red-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-creepy mb-4">🕯️ Journal Entry</h2>
        <p className="whitespace-pre-line">{entry?.entry_text || 'Nothing written here...'}</p>
      </div>
    </div>
  );
}
