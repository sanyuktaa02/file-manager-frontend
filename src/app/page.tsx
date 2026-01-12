'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import UploadArea from '@/components/UploadArea';
import FileGrid from '@/components/FileGrid';

export default function Home() {
  const [activeSection, setActiveSection] = useState('my-files');
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<string[]>(['Documents', 'Images', 'Projects', 'Downloads']);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date'>('name');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = (): void => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSectionChange = (section: string): void => {
    setActiveSection(section);
  };

  const handleFileUpload = (uploadedFiles: File[]): void => {
    setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
  };

  const handleDeleteFile = (index: number): void => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleNewFolder = (): void => {
    const folderName = prompt('Enter folder name:');
    if (folderName && folderName.trim()) {
      setFolders(prev => [...prev, folderName.trim()]);
    }
  };

  const handleSort = (): void => {
    const options = ['name', 'size', 'date'];
    const currentIndex = options.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortBy(options[nextIndex] as 'name' | 'size' | 'date');
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return a.size - b.size;
      case 'date':
        return (a.lastModified || 0) - (b.lastModified || 0);
      default:
        return 0;
    }
  });

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f7f8fa] text-gray-900'
    }`}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onNewFolder={handleNewFolder}
        onSort={handleSort}
      />

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full max-w-md px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div className="animate-fade-in">
          <UploadArea onFileUpload={handleFileUpload} isDarkMode={isDarkMode} />
        </div>

        <div className="mt-10 animate-slide-up">
          <FileGrid
            files={filteredFiles}
            onDeleteFile={handleDeleteFile}
            isDarkMode={isDarkMode}
            sortBy={sortBy}
          />
        </div>
      </main>
    </div>
  );
}

