import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

export function Tip() {
  const [products, setProducts] = useState([]);      
  const [filtered, setFiltered] = useState([]);       
  const [searchText, setSearchText] = useState('');  
  const [loading, setLoading] = useState(true);
  const API_URL = 'https://api.escuelajs.co/api/v1/products';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setProducts(response.data);
        setFiltered(response.data); 
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
      setFiltered(products); 
      return;
    }

    const searchResult = products.filter(item => 
      item.title && item.title.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(searchResult);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold mb-3">Shopi</h2>
      <div className="mx-auto mb-5" style={{ maxWidth: '400px' }}>
        <input 
          type="text" 
          className="form-control p-2 text-center" 
          placeholder="Search a product" 
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={loading}
          style={{ borderRadius: '10px' }}
        />
        {loading && <small className="text-muted d-block text-center mt-2">Загрузка товаров...</small>}
      </div>
      <h4 className="mb-4">Products</h4>
      
      <div className="row g-3">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item.id} className="col-6 col-sm-4 col-md-3">
              <div className="card h-100 p-2 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <img 
                  src={item.images?.[0]} 
                  alt={item.title} 
                  className="card-img-top rounded" 
                  style={{ height: '180px', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/180' }}
                />
               
                <div className="card-body px-1 py-2 d-flex justify-content-between align-items-center">
                  <span className="text-muted small text-truncate me-2" style={{ maxWidth: '70%' }}>
                    {item.title}
                  </span>
                  <span className="fw-bold text-dark">${item.price}</span>
                </div>

              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-muted ms-3">No products found...</p>
        )}
      </div>
    </div>
  );
}

export default Tip;