import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const token = localStorage.getItem('token');
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    }
    loadProducts();
  }, []);

  return (
    <div className="products-container">
      <h1>Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.barcode}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
