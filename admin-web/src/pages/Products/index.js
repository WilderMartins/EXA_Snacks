import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);

  const loadProducts = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    const data = new FormData();
    data.append('file', file);

    const token = localStorage.getItem('token');
    try {
      await api.post('/products/bulk', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Produtos importados com sucesso!');
      loadProducts(); // Recarrega a lista
    } catch (error) {
      alert('Falha na importação dos produtos.');
    }
  };

  return (
    <div className="products-container">
      <h1>Gestão de Produtos</h1>

      <div className="upload-container">
        <h2>Importar Produtos via CSV</h2>
        <p>O arquivo CSV deve ter as colunas: `name`, `barcode`, `category`, `image_url`.</p>
        <input type="file" onChange={handleFileChange} accept=".csv" />
        <button onClick={handleUpload}>Enviar</button>
      </div>

      <div className="products-list">
        <h2>Lista de Produtos</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong>
              <span>{product.barcode}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
