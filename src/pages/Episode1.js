// pages/episode1.js
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import JournalModal from '../components/JournalModal';
export default function Episode1({ code }) {
  const [answer, setAnswer] = useState('');
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [planted, setPlanted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [showJournal, setShowJournal] = useState(false);

  const correctAnswer = 'GATE'; // Replace with your actual puzzle solution

  const handlePuzzleSubmit = () => {
    if (answer.trim().toUpperCase() === correctAnswer) {
      setPuzzleSolved(true);
      setShowJournal(true); // Optional
    } else {
      alert('That answer doesn’t seem right…');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const filePath = `${code}/seed-${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from('seed-photos')
      .upload(filePath, file);

    if (error) {
      alert('Upload failed.');
      setUploading(false);
      return;
    }

    const { data: urlData } = await supabase
      .storage
      .from('seed-photos')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    const { error: insertError } = await supabase
      .from('plantings')
     .insert([{ code, image_url: publicUrl, episode: 'Episode 1' }]);
    if (insertError) {
      alert('Could not record planting.');
    } else {
      setImageUrl(publicUrl);
      setPlanted(true);
    }

    setUploading(false);
  };

  return (
    <div className="episode-container p-4 max-w-2xl mx-auto text-left">
      <h1 className="text-2xl font-bold mb-2">🌾 Episode 1: The Garden</h1>
      <p className="mb-4">
        An old map. A path through roses. Something is buried. Use the paper clues to find the word that opens the gate.
      </p>

      {!puzzleSolved && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <button onClick={handlePuzzleSubmit} className="bg-gray-900 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      )}

      {puzzleSolved && (
        <>
          <div className="mb-6">
            <p className="mb-2">You've unlocked a message… but something else is in the envelope. A seed. Will you plant it?</p>

            {!planted && (
              <>
                <label className="block mb-2 font-medium">Upload a photo of your planted seed:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
                {uploading && <p>Uploading...</p>}
              </>
            )}

            {planted && imageUrl && (
              <div className="mt-4">
                <p className="text-green-700 font-bold">🌱 Thank you for planting.</p>
                <img src={imageUrl} alt="Planted seed" className="mt-2 rounded shadow w-full max-w-xs" />
              </div>
            )}
          </div>

          <button onClick={() => setShowJournal(true)} className="bg-black text-white px-4 py-2 rounded">
            Read Your Journal
          </button>
        </>
      )}

{showJournal && <JournalModal code={code} onClose={() => setShowJournal(false)} />}
    </div>
  );
}
