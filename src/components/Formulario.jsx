// src/components/Formulario.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { trackEvent } from '../utils/analytics';
import Confirmacao from './Confirmacao';

const Formulario = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Endpoint do Formspree a partir das variáveis de ambiente
  const formspreeEndpoint = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`;

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Sucesso no envio
        trackEvent('form_submit_success', { category: 'Formulário', label: 'Envio Bem-Sucedido' });
        setSubmitSuccess(true);
        reset();
      } else {
        // Erro no servidor do Formspree
        throw new Error('Houve um problema ao enviar sua resposta.');
      }
    } catch (error) {
      // Erro de rede ou outro problema
      trackEvent('form_submit_error', { category: 'Formulário', label: error.message });
      setSubmitError(error.message);
    }
  };
  
  const watchedAgendamento = watch('gerenciaAgendamentos');

  if (submitSuccess) {
    return <Confirmacao setSubmitSuccess={setSubmitSuccess} />;
  }

  return (
    <section id="formulario" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Responda o formulário</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          
          {/* Pergunta 1: Rotina */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Como é um dia típico seu? *</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" {...register('rotina', { required: 'Selecione ao menos uma opção' })} value="Acordo cedo, vejo WhatsApp, saio direto" className="mr-2" />
                Acordo cedo, vejo WhatsApp, saio direto
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register('rotina', { required: 'Selecione ao menos uma opção' })} value="Organizo agenda no papel/celular antes de sair" className="mr-2" />
                Organizo agenda no papel/celular antes de sair
              </label>
               <label className="flex items-center">
                <input type="checkbox" {...register('rotina', { required: 'Selecione ao menos uma opção' })} value="Visito 5-15 piscinas/dia" className="mr-2" />
                Visito 5-15 piscinas/dia
              </label>
              <textarea {...register('rotina_livre')} placeholder="Descreva resumidamente sua rotina..." className="w-full mt-2 p-2 border rounded"></textarea>
            </div>
            {errors.rotina && <p className="text-red-500 text-sm mt-2">{errors.rotina.message}</p>}
          </div>

          {/* Pergunta 2: Desafio */}
          <div>
            <label htmlFor="desafio" className="block text-gray-700 font-bold mb-2">Qual seu maior desafio atual? *</label>
            <textarea
              id="desafio"
              {...register('desafio', { required: 'Este campo é obrigatório', maxLength: 500 })}
              className="w-full p-2 border rounded"
              rows="4"
              maxLength="500"
            ></textarea>
            {errors.desafio && <p className="text-red-500 text-sm mt-1">{errors.desafio.message}</p>}
          </div>
          
          {/* Pergunta 3: Tempo de Administração */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Quanto tempo gasta com administração/semana? *</label>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" {...register('tempoAdmin', { required: 'Selecione uma opção' })} value="0-5 horas" className="mr-2" /> 0-5 horas</label>
              <label className="flex items-center"><input type="radio" {...register('tempoAdmin', { required: 'Selecione uma opção' })} value="5-10 horas" className="mr-2" /> 5-10 horas</label>
              <label className="flex items-center"><input type="radio" {...register('tempoAdmin', { required: 'Selecione uma opção' })} value="10+ horas" className="mr-2" /> 10+ horas</label>
            </div>
            {errors.tempoAdmin && <p className="text-red-500 text-sm mt-2">{errors.tempoAdmin.message}</p>}
          </div>
          
          {/* Pergunta 4: Gerenciamento de Agendamentos */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Como gerencia agendamentos HOJE? *</label>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" {...register('gerenciaAgendamentos', { required: 'Selecione uma opção' })} value="WhatsApp" className="mr-2" /> WhatsApp</label>
              <label className="flex items-center"><input type="radio" {...register('gerenciaAgendamentos', { required: 'Selecione uma opção' })} value="Papel/Caderno" className="mr-2" /> Papel/Caderno</label>
              <label className="flex items-center"><input type="radio" {...register('gerenciaAgendamentos', { required: 'Selecione uma opção' })} value="Google Calendar" className="mr-2" /> Google Calendar</label>
              <label className="flex items-center"><input type="radio" {...register('gerenciaAgendamentos', { required: 'Selecione uma opção' })} value="Nenhum sistema" className="mr-2" /> Nenhum sistema</label>
              <label className="flex items-center">
                <input type="radio" {...register('gerenciaAgendamentos', { required: 'Selecione uma opção' })} value="Outro" className="mr-2" /> 
                Outro
              </label>
              {watchedAgendamento === 'Outro' && (
                <input type="text" {...register('gerenciaAgendamentosOutro', { required: 'Especifique qual' })} placeholder="Especifique" className="w-full mt-2 p-2 border rounded" />
              )}
            </div>
            {errors.gerenciaAgendamentos && <p className="text-red-500 text-sm mt-2">{errors.gerenciaAgendamentos.message}</p>}
          </div>

          {/* Pergunta 5: Nome */}
          <div>
            <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">Nome ou apelido *</label>
            <input
              id="nome"
              type="text"
              {...register('nome', { required: 'Seu nome é obrigatório' })}
              className="w-full p-2 border rounded"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
          </div>

          {/* Pergunta 6: WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block text-gray-700 font-bold mb-2">WhatsApp para contato (opcional)</label>
            <input
              id="whatsapp"
              type="tel"
              {...register('whatsapp', {
                pattern: {
                  value: /^\(\d{2}\) \d{5}-\d{4}$/,
                  message: 'Formato inválido. Use (XX) XXXXX-XXXX'
                }
              })}
              placeholder="(XX) XXXXX-XXXX"
              className="w-full p-2 border rounded"
            />
            {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
          </div>
          
          {submitError && <p className="text-red-500 text-center">{submitError}</p>}

          {/* Botão de Envio */}
          <div className="text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-piscina-600 hover:bg-piscina-500 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </div>
              ) : 'Enviar Respostas'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Formulario;
