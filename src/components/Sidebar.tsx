import React, { useEffect, useState } from 'react';
import styles from '../styles/SideBar.module.css';
import { useDispatch } from "react-redux";
import { setSources, setCategories } from "../redux/preferencesSlice";
import { useSelector } from "react-redux";
import { RootState } from 'redux/store';
import { Article, Preferences } from 'types';

interface SidebarProps {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  articles: Article[];
}

const SideBar: React.FC<SidebarProps> = ({ preferences, setPreferences, articles }) => {
  const [tempPreferences, setTempPreferences] = useState<Preferences>(preferences);
  const dispatch = useDispatch();
  const preferencess = useSelector((state: RootState) => state.preferences);
  const handleCheckboxChange = (type: keyof Preferences, value: string) => {
    setTempPreferences((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const updateSources = (newSources: string[]) => {
    dispatch(setSources(newSources));
  };


  const savePreferences = () => {
    console.log('Temporary Pref ====> ',tempPreferences)
    setPreferences(tempPreferences);
    localStorage.setItem("newsPreferences", JSON.stringify(tempPreferences));
    dispatch(setSources([tempPreferences.sources[0]]));
    dispatch(setCategories([tempPreferences.categories[0]]))
  };

  useEffect(() => {
    const savedPreferences = localStorage.getItem("newsPreferences");
    console.log('Saved Iteams =====>>> ', savedPreferences);
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
      setTempPreferences(JSON.parse(savedPreferences))
    }
  }, []);

  return (
    <div className={styles.sideBar}>
      <h3 className={styles.title}>Personalized News Feed</h3>
      <div className={styles.section}>
        <h4>Sources</h4>
          {
            Array.from(new Set(articles.map((item: Article) => item.source.name)))
              .map((source, index) => (
                <label key={index} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={tempPreferences?.sources?.includes(source)}
                    onChange={() => handleCheckboxChange('sources', source)}
                  />
                  {source}
                </label>
              ))
          }
      </div>
      <div className={styles.section}>
        <h4>Categories</h4>
        {['general','technology', 'business', 'sports','entertainment','science'].map((category) => (
          <label key={category} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={preferences?.categories?.includes(category)}
              onChange={() => handleCheckboxChange('categories', category)}
            />
            {category}
          </label>
        ))}
      </div>

      <button onClick={savePreferences} className={styles.saveButton}>
        Save Preferences
      </button>
      {/* <h4 className={styles.title}>Saved Preferences</h4>
      <div>
          <p><span style={{fontSize: '18px', fontWeight: 'bolder'}}>Selected Sources:</span> {preferences.sources.join(", ")}</p>
          <p><span style={{fontSize: '18px', fontWeight: 'bolder'}}>Selected Categories:</span> {preferences.categories.join(", ")}</p>
      </div> */}
    </div>
  );
};

export default SideBar;