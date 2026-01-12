'use client';

import { useEffect, useState } from 'react';

interface FileItem {
  _id: string;
  originalName: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    const res = await fetch('http://localhost:3001/files');
    const data = await res.json();
    setFiles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this file?',
    );

    if (!confirmDelete) return;

    await fetch(`http://localhost:3001/files/${id}`, {
      method: 'DELETE',
    });

    fetchFiles(); // refresh list
  };

  if (loading) {
    return <p className="text-gray-400">Loading files...</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Your Files</h2>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="text-sm text-gray-500 border-b">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-left">Uploaded</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => (
              <tr
                key={file._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {file.originalName}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {file.mimetype}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(file.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {files.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-400"
                >
                  No files available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
