import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import api from '../../services/api';

export default function Dashboard() {
  const [dailyConsumption, setDailyConsumption] = useState([]);
  const [categoryConsumption, setCategoryConsumption] = useState([]);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/consumptions/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDailyConsumption(response.data.dailyConsumptions.map(d => ({ date: new Date(d.date).toLocaleDateString(), count: d.count })));
        setCategoryConsumption(response.data.categoryConsumptions.map(c => ({ name: c.product.category, value: c.count })));
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    }
    loadData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="charts-container">
        <div className="chart">
          <h2>Consumo Diário (Últimos 7 Dias)</h2>
          <BarChart width={600} height={300} data={dailyConsumption}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="chart">
          <h2>Consumo por Categoria</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={categoryConsumption}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryConsumption.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
