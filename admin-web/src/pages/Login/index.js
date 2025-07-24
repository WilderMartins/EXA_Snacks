import React, { useState } from 'react';
import api from '../../services/api';
import { login } from '../../services/auth';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  async function handleEmailSubmit(event) {
    event.preventDefault();
    try {
      await api.post('/sessions/otp', { email });
      setStep(2);
    } catch (error) {
      alert('Falha ao solicitar OTP, verifique o e-mail e tente novamente.');
    }
  }

  async function handleOtpSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post('/sessions', { email, otp });
      const { token, user } = response.data;
      login(token, user);
      history.push('/kiosk');
    } catch (error) {
      alert('Falha no login, OTP inválido ou expirado.');
    }
  }

  return (
    <div className="login-container">
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <h2>Acesse o quiosque</h2>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Receber código</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <h2>Digite o código</h2>
          <p>Enviamos um código para {email}</p>
          <input
            type="text"
            placeholder="Seu código"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      )}
    </div>
  );
}
