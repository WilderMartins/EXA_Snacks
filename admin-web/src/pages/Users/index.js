import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem('token');
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    }
    loadUsers();
  }, []);

  return (
    <div className="users-container">
      <h1>Colaboradores</h1>
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
