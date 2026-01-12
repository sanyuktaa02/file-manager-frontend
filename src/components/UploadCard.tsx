'use client';
import { useState } from 'react';

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:3001/files/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-2">Upload File</h3>
      <p className="text-sm text-gray-500 mb-4">
        Supported formats: PNG, JPG, PDF, DOC
      </p>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={uploadFile}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Upload
      </button>

      {message && (
        <p className="text-green-600 text-sm mt-3">{message}</p>
      )}
    </div>
  );
}
