import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    barcode: '',
    category: '',
    image_url: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.post('/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Produto criado com sucesso!');
      loadProducts();
      setNewProduct({ name: '', barcode: '', category: '', image_url: '' });
    } catch (error) {
      alert('Falha ao criar o produto.');
    }
  };

  return (
    <div className="products-container">
      <h1>Gestão de Produtos</h1>

      <div className="manual-creation-container">
        <h2>Criar Novo Produto</h2>
        <form onSubmit={handleManualSubmit}>
          <input
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Nome do Produto"
          />
          <input
            name="barcode"
            value={newProduct.barcode}
            onChange={handleInputChange}
            placeholder="Código de Barras"
          />
          <input
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Categoria"
          />
          <input
            name="image_url"
            value={newProduct.image_url}
            onChange={handleInputChange}
            placeholder="URL da Imagem"
          />
          <button type="submit">Criar</button>
        </form>
      </div>

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
