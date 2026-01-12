'use client';

import { useState } from 'react';

interface FileGridProps {
  files: File[];
  onDeleteFile: (index: number) => void;
  isDarkMode: boolean;
  sortBy: 'name' | 'size' | 'date';
}

export default function FileGrid({ files, onDeleteFile, isDarkMode, sortBy }: FileGridProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <section className="mt-8">
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Your Files
      </h2>

      {files.length === 0 && (
        <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No files uploaded yet
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file, index) => {
          const fileUrl = URL.createObjectURL(file);

          return (
            <div
              key={index}
              onClick={() => {
                setSelectedFile(file);
                setIsPreviewOpen(true);
              }}
              className={`border rounded-xl p-3 hover:shadow-lg transition relative group cursor-pointer ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(index);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-opacity"
              >
                ×
              </button>

              {/* IMAGE PREVIEW */}
              {file.type.startsWith('image/') ? (
                <img
                  src={fileUrl}
                  alt={file.name}
                  className="h-32 w-full object-cover rounded-lg"
                />
              ) : (
                <div className={`h-32 flex items-center justify-center rounded-lg text-sm ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {file.type || 'File'}
                </div>
              )}

              <p className={`mt-2 text-sm truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {file.name}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`max-w-4xl w-full mx-4 rounded-lg shadow-xl overflow-hidden ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="flex">
              {/* Left side: Preview */}
              <div className="w-1/2 p-6 flex items-center justify-center">
                {selectedFile.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt={selectedFile.name}
                    className="max-w-full max-h-96 object-contain rounded-lg"
                  />
                ) : (
                  <div className={`w-full h-96 flex items-center justify-center rounded-lg text-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedFile.type || 'File'}
                  </div>
                )}
              </div>

              {/* Right side: Details */}
              <div className="w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold truncate">{selectedFile.name}</h3>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className={`text-2xl leading-none ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type:</span>
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedFile.type || 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Size:</span>
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <div>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Modified:</span>
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedFile.lastModified ? new Date(selectedFile.lastModified).toLocaleString() : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
