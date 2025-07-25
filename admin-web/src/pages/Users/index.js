import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [editingUser, setEditingUser] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.post('/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuário criado com sucesso!');
      loadUsers();
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      alert('Falha ao criar o usuário.');
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuário excluído com sucesso!');
      loadUsers();
    } catch (error) {
      alert('Falha ao excluir o usuário.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.put(`/users/${editingUser.id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuário atualizado com sucesso!');
      loadUsers();
      setEditingUser(null);
    } catch (error) {
      alert('Falha ao atualizar o usuário.');
    }
  };

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
          <select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="user">Usuário</option>
            <option value="manager">Gerente</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div className="edit-modal">
          <form onSubmit={handleUpdate}>
            <h2>Editar Colaborador</h2>
            <input
              name="name"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              placeholder="Nome Completo"
            />
            <input
              name="email"
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              placeholder="E-mail"
            />
            <button type="submit">Salvar</button>
            <button onClick={() => setEditingUser(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}
