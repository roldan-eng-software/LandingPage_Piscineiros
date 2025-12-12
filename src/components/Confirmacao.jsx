// src/components/Confirmacao.jsx
import React, { useEffect } from 'react';

const Confirmacao = ({ setSubmitSuccess }) => {
  // Volta para o formulário após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [setSubmitSuccess]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-limpa text-white rounded-lg shadow-lg animate-fade-in">
      <div className="text-5xl mb-4">✓</div>
      <h2 className="text-2xl font-bold mb-2">Obrigado! Sua resposta foi registrada com sucesso!</h2>
      <p className="text-lg">Entraremos em contato em breve para dar as novidades.</p>
    </div>
  );
};

export default Confirmacao;
