import React from 'react';

interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

interface SidebarProps {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ preferences, setPreferences }) => {
  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSources = Array.from(e.target.selectedOptions, (option) => option.value);
    setPreferences({ ...preferences, sources: selectedSources });
  };

  return (
    <div className="sidebar">
      <h3>Customize Feed</h3>
      <div>
        <label>Sources</label>
        <select multiple value={preferences.sources} onChange={handleSourceChange}>
          <option value="bbc-news">BBC News</option>
          <option value="the-guardian">The Guardian</option>
          <option value="the-new-york-times">The New York Times</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;