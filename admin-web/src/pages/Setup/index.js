import React, { useState } from 'react';
import api from '../../services/api';

// Componentes para cada passo
const Step1Welcome = ({ onNext }) => (
  <div>
    <h2>Bem-vindo ao Assistente de Instalação!</h2>
    <p>Este guia irá ajudá-lo a configurar o sistema de gestão de snacks.</p>
    <button onClick={onNext}>Iniciar</button>
  </div>
);

const Step2Database = ({ onNext }) => {
  const [formData, setFormData] = useState({
    db_host: 'localhost',
    db_port: '5432',
    db_user: 'postgres',
    db_password: '',
    db_name: 'snacks',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/setup/database', formData);
      alert('Conexão com o banco de dados bem-sucedida! O servidor será reiniciado. Por favor, recarregue a página em alguns segundos e avance para o próximo passo.');
      onNext();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro desconhecido.');
    }
  };

  return (
    <div>
      <h2>Passo 2: Configuração do Banco de Dados</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Inputs para cada campo do formData */}
        <button type="submit">Testar e Salvar</button>
      </form>
    </div>
  );
};

const Step3Admin = ({ onNext }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/setup/admin', formData);
            onNext();
        } catch (err) {
            setError(err.response?.data?.error || 'Erro desconhecido.');
        }
    };

    return (
        <div>
          <h2>Passo 3: Criar Conta de Administrador</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Nome Completo" onChange={handleChange} />
            <input name="email" type="email" placeholder="E-mail" onChange={handleChange} />
            <button type="submit">Criar Administrador</button>
          </form>
        </div>
    );
};

const Step4Finish = () => {
    const handleFinish = async () => {
        try {
            await api.post('/setup/finish');
            window.location.href = '/'; // Redireciona para a home (login)
        } catch (error) {
            alert('Não foi possível finalizar a instalação.');
        }
    };

    return (
        <div>
          <h2>Instalação Concluída!</h2>
          <p>O sistema foi configurado com sucesso.</p>
          <button onClick={handleFinish}>Ir para o Painel</button>
        </div>
    );
};


export default function SetupWizard() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => s + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Welcome onNext={nextStep} />;
      case 2:
        return <Step2Database onNext={nextStep} />;
      case 3:
        return <Step3Admin onNext={nextStep} />;
      case 4:
        return <Step4Finish />;
      default:
        return <Step1Welcome onNext={nextStep} />;
    }
  };

  return (
    <div className="setup-wizard-container">
      {renderStep()}
    </div>
  );
}
