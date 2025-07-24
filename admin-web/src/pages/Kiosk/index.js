import React, { useState, useEffect, useCallback } from 'react';
import { QrReader } from 'react-qr-reader';
import api from '../../services/api';
import './styles.css';

export default function Kiosk() {
  const [credits, setCredits] = useState(0);
  const [consumptions, setConsumptions] = useState([]);
  const [lastConsumed, setLastConsumed] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');

  const processConsumption = useCallback(async (barcode) => {
    if (!barcode || isPaused) return;

    setIsPaused(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/consumptions',
        { barcode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLastConsumed({ product: response.data.product, status: 'success' });
      loadData();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro desconhecido';
      setLastConsumed({ product: { name: errorMessage }, status: 'error' });
    } finally {
      setTimeout(() => {
        setLastConsumed(null);
        setIsPaused(false);
      }, 3000);
    }
  }, [isPaused, loadData]);

  const loadData = useCallback(async () => {
    // ... (mesma função loadData)
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleManualSubmit = (event) => {
    event.preventDefault();
    processConsumption(manualBarcode);
    setManualBarcode('');
  };

  return (
    <div className="kiosk-container">
      <div className="kiosk-header">
        <h1>Quiosque</h1>
        <h2>Créditos restantes: {credits}</h2>
      </div>

      <div className="scanner-container">
        {!isPaused && <QrReader
          onResult={(result) => processConsumption(result?.text)}
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

      <div className="manual-input-container">
        <form onSubmit={handleManualSubmit}>
          <input
            type="text"
            placeholder="Digitar código de barras"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            disabled={isPaused}
          />
          <button type="submit" disabled={isPaused}>
            Registrar
          </button>
        </form>
      </div>

      <div className="consumptions-history">
        {/* ... (mesmo histórico) */}
      </div>
    </div>
  );
}
