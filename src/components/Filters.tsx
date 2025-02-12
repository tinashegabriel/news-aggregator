import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import styles from "../styles/Filters.module.css";

interface Article {
  source: { name: string };
}

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: { date: Date | null; category: string; source: string };
  setFilters: (filters: { date: Date | null; category: string; source: string }) => void;
  articles: Article[];
}

const Filters: React.FC<FiltersProps> = ({ searchQuery, setSearchQuery, filters, setFilters, articles }) => {
  const uniqueSources = Array.from(new Set(articles.map((item) => item.source.name)));

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "general", label: "General" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
    { value: "science", label: "Science" },
    { value: "health", label: "Health" },
  ];

  const sourceOptions = [
    { value: "", label: "All Sources" },
    ...uniqueSources.map((source) => ({ value: source, label: source })),
  ];

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="🔍 Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filterGroup}>
        <DatePicker
          selected={filters.date}
          onChange={(date: Date | null) => setFilters({ ...filters, date })}
          placeholderText="📅 Select Date"
          className={styles.datePicker}
        />
        <Select
          options={categoryOptions}
          value={categoryOptions.find((option) => option.value === filters.category)}
          onChange={(selectedOption) => setFilters({ ...filters, category: selectedOption?.value || "" })}
          className={styles.reactSelect}
          placeholder="All Categories"
        />
        <Select
          options={sourceOptions}
          value={sourceOptions.find((option) => option.value === filters.source)}
          onChange={(selectedOption) => setFilters({ ...filters, source: selectedOption?.value || "" })}
          className={styles.reactSelect}
          placeholder="All Sources"
        />
      </div>
    </div>
  );
};

export default Filters;
