import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const loadUsers = useCallback(async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  }, []);


  const loadUsers = useCallback(async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="users-container">
      <h1>Colaboradores</h1>

      <div className="user-creation-container">
        <h2>Novo Colaborador</h2>
        <form onSubmit={handleManualSubmit}>
          <input
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Nome Completo"
          />
          <input
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="E-mail"
          />
          <input
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="Senha"
          />
          <button type="submit">Criar</button>
        </form>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
