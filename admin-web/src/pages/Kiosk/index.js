import React, { useState, useEffect, useCallback } from 'react';
import { QrReader } from 'react-qr-reader';
import api from '../../services/api';
import './styles.css';

export default function Kiosk() {
  const [credits, setCredits] = useState(0);
  const [consumptions, setConsumptions] = useState([]);
  const [lastConsumed, setLastConsumed] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const loadData = useCallback(async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      // Lidar com o caso de não estar logado
      return;
    }

    try {
      const [userResponse, consumptionsResponse] = await Promise.all([
        api.get(`/users/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
        api.get(`/consumptions?user_id=${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setCredits(userResponse.data.daily_credits - consumptionsResponse.data.length);
      setConsumptions(consumptionsResponse.data);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleScan = useCallback(async (result) => {
    if (result && !isPaused) {
      setIsPaused(true); // Pausa o scanner para evitar leituras múltiplas
      try {
        const token = localStorage.getItem('token');
        const response = await api.post(
          '/consumptions',
          { barcode: result.text },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Sucesso
        setLastConsumed({ product: response.data.product, status: 'success' });
        loadData(); // Recarrega os dados

      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Erro desconhecido';
        setLastConsumed({ product: { name: errorMessage }, status: 'error' });
      } finally {
        // Mostra o feedback por 3 segundos e depois reativa o scanner
        setTimeout(() => {
          setLastConsumed(null);
          setIsPaused(false);
        }, 3000);
      }
    }
  }, [isPaused, loadData]);

  return (
    <div className="kiosk-container">
      <div className="kiosk-header">
        <h1>Quiosque</h1>
        <h2>Créditos restantes: {credits}</h2>
      </div>

      <div className="scanner-container">
        {!isPaused && <QrReader
          onResult={(result) => handleScan(result)}
          constraints={{ facingMode: 'environment' }}
          containerStyle={{ width: '100%' }}
        />}

        {lastConsumed && (
          <div className={`feedback-overlay ${lastConsumed.status}`}>
            <h2>{lastConsumed.status === 'success' ? 'Consumo Registrado!' : 'Erro!'}</h2>
            <p>{lastConsumed.product?.name}</p>
          </div>
        )}
      </div>

      <div className="consumptions-history">
        <h2>Consumo de hoje</h2>
        <ul>
          {consumptions.map((consumption) => (
            <li key={consumption.id}>
              <span>{consumption.product.name}</span>
              <span>{new Date(consumption.createdAt).toLocaleTimeString()}</span>
            </li>
          )).reverse()}
        </ul>
      </div>
    </div>
  );
}
