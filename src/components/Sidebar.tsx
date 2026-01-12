'use client';

import { Folder, Clock, Star, Trash2, Sun, Moon, Settings, Plus, SortAsc } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNewFolder: () => void;
  onSort: () => void;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  isDarkMode,
  onToggleTheme,
  onNewFolder,
  onSort
}: SidebarProps) {
  const mainSections = [
    { id: 'my-files', label: 'My Files', icon: Folder },
    { id: 'starred', label: 'Starred', icon: Star, count: 3 },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const folders = [
    { id: 'documents', label: 'Documents', icon: Folder },
    { id: 'images', label: 'Images', icon: Folder },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'downloads', label: 'Downloads', icon: Folder },
  ];

  return (
    <aside className={`w-64 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-r p-6 flex flex-col h-full`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-lg font-semibold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>File Manager</h2>
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'hover:bg-gray-700 text-gray-300'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 space-y-2">
        <button
          onClick={onNewFolder}
          className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            isDarkMode
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          <Plus size={16} />
          <span>New</span>
        </button>

        <button
          onClick={onSort}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
            isDarkMode
              ? 'text-gray-300 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SortAsc size={18} />
          <span>Sort</span>
        </button>
      </div>

      {/* Main Sections */}
      <nav className="space-y-1 mb-6">
        <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>Quick Access</h3>
        {mainSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? isDarkMode
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-blue-50 text-blue-700'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} />
                <span>{section.label}</span>
              </div>
              {section.count && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>
                  {section.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Folders */}
      <nav className="space-y-1 mb-6">
        <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>Folders</h3>
        {folders.map((folder) => {
          const Icon = folder.icon;
          const isActive = activeSection === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => onSectionChange(folder.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? isDarkMode
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-blue-50 text-blue-700'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              <span>{folder.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Storage */}
      {/* <div className={`mb-6 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Storage</span>
          <span className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>6.7 GB of 10 GB used</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
        </div>
      </div> */}

      {/* Settings */}
      {/* <div className="mt-auto">
        <button
          onClick={() => onSectionChange('settings')}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
            activeSection === 'settings'
              ? isDarkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-50 text-blue-700'
              : isDarkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Settings size={18} /> */}
          {/* <span>Settings</span>
        </button>
      </div> */}
    </aside>
  );
}
