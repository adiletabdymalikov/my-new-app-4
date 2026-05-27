import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export function Tip() {
  const [categories, setCategories] = useState([]); 
  const [searchResults, setSearchResults] = useState([]); 
  const [searchText, setSearchText] = useState(''); 
  const [loading, setLoading] = useState(true);

  
  const API_URL = 'https://api.escuelajs.co/api/v1/categories';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка при загрузке API:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }

    
    const filtered = categories.filter(item => 
      item.name && item.name.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(filtered);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Поиск категорий Platzi API</h3>
        
        <div className="mb-3">
          <label className="form-label">Введите название категории (например: Clothes, Electronics, Shoes):</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Поиск категории..." 
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            disabled={loading}
          />
          {loading && <small className="text-muted">Загрузка категорий...</small>}
        </div>

        <div className="search-results mt-3">
          {searchResults.length > 0 ? (
            <ul className="list-group">
              {searchResults.map(item => (
                <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                   
                 
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="rounded me-3" 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/50' }} 
                    />
                    <div>
                    
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">ID категории: {item.id}</small>
                    </div>
                  </div>
                  
                  <span className="badge bg-secondary rounded-pill">Категория</span>
                </li>
              ))}
            </ul>
          ) : (
            searchText.trim() !== '' && <p className="text-center text-muted mt-3">Категория не найдена</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tip;