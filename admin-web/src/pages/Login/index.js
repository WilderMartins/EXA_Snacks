import React, { useState } from 'react';
import api from '../../services/api';
import { login } from '../../services/auth';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [otpSent, setOtpSent] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const payload = loginMethod === 'password' ? { email, password } : { email, otp };
      const response = await api.post('/sessions', payload);
      const { token, user } = response.data;
      login(token, user);
      history.push('/kiosk');
    } catch (error) {
      alert('Falha no login, verifique suas credenciais.');
    }
  }

  async function handleRequestOtp(event) {
    event.preventDefault();
    try {
      await api.post('/sessions/otp', { email });
      setOtpSent(true);
      alert('Código OTP enviado para o seu e-mail.');
    } catch (error) {
      alert('Falha ao solicitar OTP, verifique o e-mail e tente novamente.');
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Acesse o quiosque</h2>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {loginMethod === 'password' ? (
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder="Seu código OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <button type="submit">Entrar</button>
      </form>
      <div className="login-options">
        <button onClick={() => setLoginMethod('password')}>Usar senha</button>
        <button onClick={() => setLoginMethod('otp')}>Usar OTP</button>
        {loginMethod === 'otp' && !otpSent && (
          <button onClick={handleRequestOtp}>Enviar OTP</button>
        )}
      </div>
    </div>
  );
}
