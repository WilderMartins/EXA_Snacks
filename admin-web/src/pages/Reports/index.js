import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CSVLink } from 'react-csv';

export default function Reports() {
  const [consumptions, setConsumptions] = useState([]);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    async function loadConsumptions() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/consumptions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConsumptions(response.data);

        const dataForCsv = response.data.map(c => ({
          user_name: c.user.name,
          user_email: c.user.email,
          product_name: c.product.name,
          product_barcode: c.product.barcode,
          date: new Date(c.created_at).toLocaleString(),
        }));
        setCsvData(dataForCsv);

      } catch (error) {
        console.error('Failed to load consumptions', error);
      }
    }
    loadConsumptions();
  }, []);

  return (
    <div className="reports-container">
      <h1>Relatório de Consumo</h1>

      <CSVLink data={csvData} filename={"consumptions-report.csv"}>
        Exportar para CSV
      </CSVLink>

      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Produto</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {consumptions.map((consumption) => (
            <tr key={consumption.id}>
              <td>{consumption.user.name}</td>
              <td>{consumption.product.name}</td>
              <td>{new Date(consumption.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
