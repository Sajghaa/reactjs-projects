import { useState } from 'react';

export default function Toolbar({ onModeChange, onClear }) {
  const [activeTool, setActiveTool] = useState('pen');

  const tools = [
    { id: 'pen', label: '✏️ Pen', icon: '✏️' },
    { id: 'rectangle', label: '📦 Rectangle', icon: '📦' },
    { id: 'circle', label: '⚪ Circle', icon: '⚪' },
    { id: 'clear', label: '🗑️ Clear', icon: '🗑️', isClear: true },
  ];

  const handleClick = (tool) => {
    if (tool.isClear) {
      onClear();
      return;
    }
    setActiveTool(tool.id);
    onModeChange(tool.id);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-full px-4 py-2 flex gap-2 z-20 border border-gray-200">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => handleClick(tool)}
          className={`px-4 py-2 rounded-full transition-all ${
            activeTool === tool.id && !tool.isClear
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <span className="mr-1">{tool.icon}</span>
          {tool.label}
        </button>
      ))}
    </div>
  );
}