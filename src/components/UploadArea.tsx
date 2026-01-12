'use client';

import { useRef } from 'react';

interface UploadAreaProps {
  onFileUpload: (files: File[]) => void;
  isDarkMode: boolean;
}

export default function UploadArea({ onFileUpload, isDarkMode }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
      className={`border border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-gray-400 transition ${
        isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
      }`}
    >
      <input
        type="file"
        ref={inputRef}
        hidden
        multiple
        onChange={handleChange}
      />

      <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Drag & drop files here
      </p>
      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
        or click to browse files
      </p>
    </div>
  );
}
