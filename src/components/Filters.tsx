import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/Filters.module.css';
interface Article {
  title: string;
  source: { name: string };
  description: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
}

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: { date: Date | null; category: string; source: string };
  setFilters: (filters: { date: Date | null; category: string; source: string }) => void;
  articles: Article[];
}

const Filters: React.FC<FiltersProps> = ({ searchQuery, setSearchQuery, filters, setFilters, articles }) => {
  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="Search for articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filterGroup}>
        <DatePicker
          selected={filters.date}
          onChange={(date: Date | null) => setFilters({ ...filters, date })}
          placeholderText="Select Date"
          className={styles.datePicker}
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className={styles.select}
        >
          <option value="">All Categories</option>
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
        </select>

        <select
          value={filters.source}
          onChange={(e) => setFilters({ ...filters, source: e.target.value })}
          className={styles.select}
        >
          <option value="">All Sources</option>
          {
            Array.from(new Set(articles.map((item: Article) => item.source.name)))
              .map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))
          }
        </select>
      </div>
    </div>
  );
};

export default Filters;