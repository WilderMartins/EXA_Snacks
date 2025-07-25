import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Layout({ children }) {
  const [sidebarColor, setSidebarColor] = useState('#f0f0f0');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await api.get('/settings');
        if (response.data.sidebar_color) {
          setSidebarColor(response.data.sidebar_color);
        }
      } catch (error) {
        console.error('Failed to load settings for layout', error);
      }
    }
    loadSettings();
  }, []);

  return (
    <div className="layout-container">
      <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`} style={{ backgroundColor: sidebarColor }}>
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" />
        </div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          &#9776;
        </button>
        <ul className={isMenuOpen ? 'open' : ''}>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Colaboradores</Link>
          </li>
          <li>
            <Link to="/products">Produtos</Link>
          </li>
          <li>
            <Link to="/categories">Categorias</Link>
          </li>
          <li>
            <Link to="/kiosk">Quiosque</Link>
          </li>
          <li>
            <Link to="/reports">Relatórios</Link>
          </li>
          <li>
            <Link to="/settings">Configurações</Link>
          </li>
        </ul>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
}
