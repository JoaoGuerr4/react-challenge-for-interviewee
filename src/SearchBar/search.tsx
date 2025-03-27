import { useState, useEffect, KeyboardEvent } from 'react';
import styles from './styles.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  debounceTime?: number;
}

export const SearchBar = ({ onSearch, debounceTime = 300 }: SearchBarProps) => {
  const [query, setQuery] = useState('');

 const handleSearch = () => {
   const normalizedQuery = query
     .normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "")
     .toLowerCase();

   onSearch(normalizedQuery);
 };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [query, debounceTime]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Pesquisar por título, autor ou categoria..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className={styles.searchInput}
      />
      
      <button 
        onClick={handleSearch}
        className={styles.searchButton}
        aria-label="Executar pesquisa"
      >
        🔍
      </button>

      {query && (
        <button 
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          className={styles.clearButton}
          aria-label="Limpar pesquisa"
        >
          ×
        </button>
      )}
    </div>
  );
};