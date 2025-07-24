import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <nav className="sidebar">
        <ul>
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
