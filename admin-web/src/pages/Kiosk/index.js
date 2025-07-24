import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import api from '../../services/api';
import ConsumptionModal from '../../components/ConsumptionModal';
import './styles.css';

export default function Kiosk() {
  const [product, setProduct] = useState(null);
  const [credits, setCredits] = useState(0);
  const [consumptions, setConsumptions] = useState([]);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await api.get(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCredits(response.data.daily_credits);

      const consumptionsResponse = await api.get(`/consumptions?user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConsumptions(consumptionsResponse.data);
    }

    loadData();
  }, []);

  async function handleScan(result, error) {
    if (!!result) {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/products?barcode=${result?.text}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        alert('Produto não encontrado.');
      }
    }

    if (!!error) {
      console.info(error);
    }
  }

  async function handleConfirm() {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/consumptions',
        { barcode: product.barcode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Consumo registrado com sucesso!');
      setProduct(null);
      // TODO: reload data
    } catch (error) {
      alert('Falha ao registrar o consumo, tente novamente.');
    }
  }

  function handleCancel() {
    setProduct(null);
  }

  return (
    <div className="kiosk-container">
      <div className="kiosk-header">
        <h2>Créditos restantes: {credits}</h2>
      </div>
      <QrReader
        onResult={handleScan}
        style={{ width: '100%' }}
        constraints={{ facingMode: 'environment' }}
      />
      <ConsumptionModal
        product={product}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <div className="consumptions-history">
        <h2>Histórico de hoje</h2>
        <ul>
          {consumptions.map((consumption) => (
            <li key={consumption.id}>
              <strong>{consumption.product.name}</strong>
              <span>{new Date(consumption.createdAt).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
