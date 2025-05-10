import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SeedUpload({ code, episode, onComplete }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const fileExt = image.name.split('.').pop();
    const filePath = `${code}/episode${episode}.${fileExt}`;

    const { data, error: uploadError } = await supabase
      .storage
      .from('plantings')
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      setMessage("Upload failed.");
      setUploading(false);
      return;
    }

    const imageUrl = `https://YOUR-SUPABASE-PROJECT.supabase.co/storage/v1/object/public/plantings/${filePath}`;

    const { error: dbError } = await supabase
      .from('plantings')
      .insert([{ code, episode, image_url: imageUrl }]);

    if (dbError) {
      setMessage("Failed to save planting info.");
    } else {
      setMessage("Seed planting saved!");
      onComplete(); // Notify parent to continue
    }

    setUploading(false);
  };

  return (
    <div className="p-4 bg-black text-white rounded-lg">
      <h2 className="text-lg font-bold mb-2">Proof of Planting</h2>
      <p className="mb-4">Upload a photo of the seed you planted in the dirt.</p>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button 
        onClick={handleUpload}
        disabled={uploading}
        className="mt-3 bg-green-700 px-4 py-2 rounded hover:bg-green-900"
      >
        {uploading ? "Uploading..." : "Submit Photo"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}