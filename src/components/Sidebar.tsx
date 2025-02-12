import React, { useEffect, useState } from 'react';
import { FiList, FiSave } from 'react-icons/fi';
import { MdClose } from "react-icons/md";
import styles from '../styles/SideBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSources, setCategories } from '../redux/preferencesSlice';
import { RootState } from '../redux/store';
import { Article, Preferences } from '../types';

interface SidebarProps {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  articles: Article[];
  isOpen?: boolean;
  closeSidebar: () => void;
}

const CATEGORIES = ['General', 'Technology', 'Business', 'Sports', 'Entertainment', 'Science'];

const Sidebar: React.FC<SidebarProps> = ({ preferences, setPreferences, articles, isOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const storedPreferences = useSelector((state: RootState) => state.preferences);
  const [showMoreSources, setShowMoreSources] = useState(false);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('newsPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, [setPreferences]);

  const handleCheckboxChange = (type: keyof Preferences, value: string) => {
    const updatedPreferences = {
      ...preferences,
      [type]: preferences[type].includes(value)
        ? preferences[type].filter((item) => item !== value)
        : [...preferences[type], value],
    };
    setPreferences(updatedPreferences);
  };

  const savePreferences = () => {
    localStorage.setItem('newsPreferences', JSON.stringify(preferences));
    dispatch(setSources(preferences.sources));
    dispatch(setCategories(preferences.categories));
  };

  const uniqueSources = Array.from(new Set(articles.map((item) => item.source.name)));

  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sideBarClose} onClick={closeSidebar}>
      <MdClose />
      </div>
      <h3 className={styles.title}><FiList /> Personalized News Feed</h3>

      <div className={styles.section}>
        <h4>Sources</h4>
        {uniqueSources.slice(0, showMoreSources ? uniqueSources.length : 5).map((source, index) => (
          <label key={index} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={preferences.sources.includes(source)}
              onChange={() => handleCheckboxChange('sources', source)}
            />
            {source}
          </label>
        ))}
        {uniqueSources.length > 5 && (
          <button className={styles.showMore} onClick={() => setShowMoreSources(!showMoreSources)}>
            {showMoreSources ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <div className={styles.section}>
        <h4>Categories</h4>
        {CATEGORIES.map((category) => (
          <label key={category} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={preferences.categories.includes(category)}
              onChange={() => handleCheckboxChange('categories', category)}
            />
            {category}
          </label>
        ))}
      </div>

      <button onClick={savePreferences} className={styles.saveButton}>
        <FiSave /> Save Preferences
      </button>
    </div>
  );
};

export default Sidebar;
