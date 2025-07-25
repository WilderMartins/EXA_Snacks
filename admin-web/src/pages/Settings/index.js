import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Settings() {
  const [awsAccessKeyId, setAwsAccessKeyId] = useState('');
  const [awsSecretAccessKey, setAwsSecretAccessKey] = useState('');
  const [awsRegion, setAwsRegion] = useState('');
  const [mailFrom, setMailFrom] = useState('');
  const [sidebarColor, setSidebarColor] = useState('#f0f0f0');

  useEffect(() => {
    console.log('Settings component mounted');
    async function loadSettings() {
      console.log('Loading settings...');
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/settings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Settings loaded:', response.data);
        const { aws_access_key_id, aws_secret_access_key, aws_region, mail_from, sidebar_color } = response.data;
        setAwsAccessKeyId(aws_access_key_id || '');
        setAwsSecretAccessKey(aws_secret_access_key || '');
        setAwsRegion(aws_region || '');
        setMailFrom(mail_from || '');
        setSidebarColor(sidebar_color || '#f0f0f0');
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    }
    loadSettings();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting settings...');
    const token = localStorage.getItem('token');
    const settingsData = {
      aws_access_key_id: awsAccessKeyId,
      aws_secret_access_key: awsSecretAccessKey,
      aws_region: awsRegion,
      mail_from: mailFrom,
      sidebar_color: sidebarColor,
    };
    console.log('Settings data:', settingsData);
    try {
      await api.post('/settings', settingsData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Falha ao salvar as configurações.');
    }
  }

  return (
    <div className="settings-container">
      <h1>Configurações de E-mail (AWS SES)</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="AWS Access Key ID"
          value={awsAccessKeyId}
          onChange={(e) => setAwsAccessKeyId(e.target.value)}
        />
        <input
          type="password"
          placeholder="AWS Secret Access Key"
          value={awsSecretAccessKey}
          onChange={(e) => setAwsSecretAccessKey(e.target.value)}
        />
        <input
          placeholder="AWS Region"
          value={awsRegion}
          onChange={(e) => setAwsRegion(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail de origem"
          value={mailFrom}
          onChange={(e) => setMailFrom(e.target.value)}
        />
        <label htmlFor="sidebarColor">Cor da Barra Lateral:</label>
        <input
          type="color"
          id="sidebarColor"
          value={sidebarColor}
          onChange={(e) => setSidebarColor(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
