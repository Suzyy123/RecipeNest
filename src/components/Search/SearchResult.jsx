import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/Search/Search.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const res = await axios.get(`https://localhost:7031/api/Recipe/search?query=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    fetchResults();
  }, [query]);

  const handleClick = (item) => {
    if (item.type === 'chef') navigate(`/viewChefDetail/${item.id}`);
    else if (item.type === 'recipe') navigate(`/viewRecipe/${item.id}`);
  };

  return (
    <div className="search-results-page">
        <br /><br /><br /><br /><br /><br /><br />
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Results for "<span style={{ color: 'orangered' }}>{query}</span>"
      </h2>
      {results.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No results found.</p>
      ) : (
        <div className="search-results-grid">
          {results.map((item) => (
            <div key={item.id} className="search-result-card" onClick={() => handleClick(item)}>
              <img src={`http://localhost:5221${item.imageUrl}`} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.type.toUpperCase()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
