import React, { useState } from 'react';
import '../../css/Search/Search.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchEverything = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search-results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="searchComponent">
      <input
        type="text"
        placeholder="Search for recipes, chefs, cuisines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <FaSearch className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default SearchEverything;
