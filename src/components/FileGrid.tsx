'use client';

interface FileGridProps {
  files: File[];
  onDeleteFile: (index: number) => void;
  isDarkMode: boolean;
  sortBy: 'name' | 'size' | 'date';
}

export default function FileGrid({ files, onDeleteFile, isDarkMode, sortBy }: FileGridProps) {
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
              className={`border rounded-xl p-3 hover:shadow-lg transition relative group ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <button
                onClick={() => onDeleteFile(index)}
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
    </section>
  );
}
