// src/components/Formulario.jsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { trackEvent } from '../utils/analytics';
import Confirmacao from './Confirmacao';

const Formulario = () => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Endpoint do Formspree a partir das variáveis de ambiente
  const formspreeEndpoint = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`;

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const whatsappDigits = (data.whatsapp || '').replace(/\D/g, '');
      const payload = {
        ...data,
        whatsapp: whatsappDigits,
        whatsappFormatado: data.whatsapp || '',
      };
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
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

  // Observers para campos condicionais
  const agendamentosSelecionados = watch('agendamentos') || [];
  const principalDor = watch('principalDor');
  const controlePagamentos = watch('controlePagamentos');

  if (submitSuccess) {
    return <Confirmacao setSubmitSuccess={setSubmitSuccess} />;
  }

  return (
    <section id="formulario" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Responda o formulário</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          {/* 1️⃣ Rotina diária */}
          <div>
            <label htmlFor="rotinaDiaria" className="block text-gray-700 font-bold mb-2">
              Como é um dia típico seu, do momento em que acorda até voltar para casa? *
            </label>
            <textarea
              id="rotinaDiaria"
              {...register('rotinaDiaria', { required: 'Este campo é obrigatório', maxLength: 2000 })}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Descreva resumidamente sua rotina..."
              maxLength={2000}
            />
            {errors.rotinaDiaria && <p className="text-red-500 text-sm mt-1">{errors.rotinaDiaria.message}</p>}
          </div>

          {/* 2️⃣ Agendamentos */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">
              Como você registra um novo agendamento quando um cliente solicita um serviço? *
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" value="WhatsApp" {...register('agendamentos', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" />
                WhatsApp (ele envia mensagem)
              </label>
              <label className="flex items-center">
                <input type="checkbox" value="Ligação telefônica" {...register('agendamentos', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" />
                Ligação telefônica (anoto em papel/bloco de notas)
              </label>
              <label className="flex items-center">
                <input type="checkbox" value="Pessoalmente" {...register('agendamentos', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" />
                Ele vem pessoalmente
              </label>
              <label className="flex items-center">
                <input type="checkbox" value="SMS" {...register('agendamentos', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" />
                SMS
              </label>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" value="Outro" {...register('agendamentos', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" />
                  Outro
                </label>
                {agendamentosSelecionados.includes('Outro') && (
                  <input
                    type="text"
                    {...register('agendamentosOutro', { required: 'Especifique o outro método' })}
                    placeholder="Especifique"
                    className="w-full mt-2 p-2 border rounded"
                  />
                )}
              </div>
            </div>
            {errors.agendamentos && <p className="text-red-500 text-sm mt-2">{errors.agendamentos.message}</p>}
          </div>

          {/* 3️⃣ Falhas de comunicação */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">
              Com que frequência acontecem problemas como esquecer cliente, horário errado ou endereço errado? *
            </p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Raramente" {...register('falhasComunicacao', { required: 'Selecione uma opção' })} className="mr-2" /> Raramente acontece (1x por mês ou menos)</label>
              <label className="flex items-center"><input type="radio" value="Às vezes" {...register('falhasComunicacao', { required: 'Selecione uma opção' })} className="mr-2" /> Às vezes (1-2x por semana)</label>
              <label className="flex items-center"><input type="radio" value="Frequentemente" {...register('falhasComunicacao', { required: 'Selecione uma opção' })} className="mr-2" /> Frequentemente (3+ vezes por semana)</label>
              <label className="flex items-center"><input type="radio" value="Muito frequente" {...register('falhasComunicacao', { required: 'Selecione uma opção' })} className="mr-2" /> Muito frequente (quase todo dia)</label>
            </div>
            {errors.falhasComunicacao && <p className="text-red-500 text-sm mt-2">{errors.falhasComunicacao.message}</p>}
          </div>

          {/* 4️⃣ Histórico e dados */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">
              Onde você guarda as informações sobre os clientes e piscinas? (pode marcar mais de 1) *
            </p>
            <div className="space-y-2">
              <label className="flex items-center"><input type="checkbox" value="Só na memória" {...register('historicoDados', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" /> Só na memória</label>
              <label className="flex items-center"><input type="checkbox" value="Papel/caderno" {...register('historicoDados', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" /> Papel/caderno</label>
              <label className="flex items-center"><input type="checkbox" value="Bloco de notas no celular" {...register('historicoDados', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" /> Bloco de notas no celular</label>
              <label className="flex items-center"><input type="checkbox" value="WhatsApp" {...register('historicoDados', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" /> WhatsApp (mensagens antigas)</label>
              <label className="flex items-center"><input type="checkbox" value="Google Docs/Sheets" {...register('historicoDados', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" /> Google Docs/Sheets</label>
              <label className="flex items-center"><input type="checkbox" value="Não guardo" {...register('historicoDados', { validate: v => (v && v.length > 0) || 'Selecione ao menos uma opção' })} className="mr-2" /> Não guardo, apenas faço o serviço</label>
            </div>
            {errors.historicoDados && <p className="text-red-500 text-sm mt-2">{errors.historicoDados.message}</p>}
          </div>

          {/* 5️⃣ Controle de pagamentos */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">Como você controla quem já pagou e quem ainda deve? *</p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Não controlo sistematicamente" {...register('controlePagamentos', { required: 'Selecione uma opção' })} className="mr-2" /> Não controlo sistematicamente (dependo da memória)</label>
              <label className="flex items-center"><input type="radio" value="Anotações em papel/caderno" {...register('controlePagamentos', { required: 'Selecione uma opção' })} className="mr-2" /> Anotações em papel/caderno</label>
              <label className="flex items-center"><input type="radio" value="Bloco de notas no celular" {...register('controlePagamentos', { required: 'Selecione uma opção' })} className="mr-2" /> Bloco de notas no celular</label>
              <label className="flex items-center"><input type="radio" value="Planilha" {...register('controlePagamentos', { required: 'Selecione uma opção' })} className="mr-2" /> Planilha Excel/Google Sheets</label>
              <label className="flex items-center"><input type="radio" value="App específico" {...register('controlePagamentos', { required: 'Selecione uma opção' })} className="mr-2" /> Um aplicativo específico</label>
              <div>
                <label className="flex items-center"><input type="radio" value="Outro" {...register('controlePagamentos', { required: 'Selecione uma opção' })} className="mr-2" /> Outro</label>
                {controlePagamentos === 'Outro' && (
                  <input type="text" {...register('controlePagamentosOutro', { required: 'Especifique o outro método' })} placeholder="Especifique" className="w-full mt-2 p-2 border rounded" />
                )}
              </div>
            </div>
            {errors.controlePagamentos && <p className="text-red-500 text-sm mt-2">{errors.controlePagamentos.message}</p>}
          </div>

          {/* 6️⃣ Otimização de rotas */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">Como você decide a melhor ordem para visitar os clientes ao longo do dia? *</p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Conforme pedem" {...register('otimizacaoRotas', { required: 'Selecione uma opção' })} className="mr-2" /> Conforme os clientes ligam/pedem</label>
              <label className="flex items-center"><input type="radio" value="Rotas próximas" {...register('otimizacaoRotas', { required: 'Selecione uma opção' })} className="mr-2" /> Deixo para rotas próximas no mesmo dia</label>
              <label className="flex items-center"><input type="radio" value="Rota fixa" {...register('otimizacaoRotas', { required: 'Selecione uma opção' })} className="mr-2" /> Sigo uma rota fixa já conhecida</label>
              <label className="flex items-center"><input type="radio" value="Aleatória" {...register('otimizacaoRotas', { required: 'Selecione uma opção' })} className="mr-2" /> De forma aleatória/conforme me lembro</label>
              <label className="flex items-center"><input type="radio" value="Google Maps" {...register('otimizacaoRotas', { required: 'Selecione uma opção' })} className="mr-2" /> Uso Google Maps para otimizar</label>
            </div>
            {errors.otimizacaoRotas && <p className="text-red-500 text-sm mt-2">{errors.otimizacaoRotas.message}</p>}
          </div>

          {/* 7️⃣ Registros de serviço */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">Você anota o que foi feito em cada visita? (produtos usados, medições, observações) *</p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Não anoto" {...register('registrosServico', { required: 'Selecione uma opção' })} className="mr-2" /> Não anoto (só faço o serviço)</label>
              <label className="flex items-center"><input type="radio" value="Papel" {...register('registrosServico', { required: 'Selecione uma opção' })} className="mr-2" /> Anoto manualmente em papel</label>
              <label className="flex items-center"><input type="radio" value="WhatsApp/Notas" {...register('registrosServico', { required: 'Selecione uma opção' })} className="mr-2" /> Anoto no WhatsApp/bloco de notas</label>
              <label className="flex items-center"><input type="radio" value="Relatório ao cliente" {...register('registrosServico', { required: 'Selecione uma opção' })} className="mr-2" /> Envio foto/relatório ao cliente</label>
              <label className="flex items-center"><input type="radio" value="Sistema" {...register('registrosServico', { required: 'Selecione uma opção' })} className="mr-2" /> Tenho um sistema para registrar</label>
              <label className="flex items-center"><input type="radio" value="Às vezes" {...register('registrosServico', { required: 'Selecione uma opção' })} className="mr-2" /> Às vezes anoto, às vezes não</label>
            </div>
            {errors.registrosServico && <p className="text-red-500 text-sm mt-2">{errors.registrosServico.message}</p>}
          </div>

          {/* 8️⃣ Principal dor */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">Se pudesse resolver APENAS UM problema no seu trabalho agora, qual seria? *</p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Agendamentos" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Organizar melhor os agendamentos</label>
              <label className="flex items-center"><input type="radio" value="Lembretes" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Nunca mais esquecer um cliente ou horário</label>
              <label className="flex items-center"><input type="radio" value="Histórico completo" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Ter um histórico completo de cada piscina</label>
              <label className="flex items-center"><input type="radio" value="Pagamentos" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Controlar pagamentos e cobranças</label>
              <label className="flex items-center"><input type="radio" value="Rotas" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Otimizar minha rota e economizar combustível</label>
              <label className="flex items-center"><input type="radio" value="Registros" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Registrar cada serviço feito (relatórios)</label>
              <div>
                <label className="flex items-center"><input type="radio" value="Outro" {...register('principalDor', { required: 'Selecione uma opção' })} className="mr-2" /> Outro</label>
                {principalDor === 'Outro' && (
                  <input type="text" {...register('principalDorOutro', { required: 'Especifique sua principal dor' })} placeholder="Especifique" className="w-full mt-2 p-2 border rounded" />
                )}
              </div>
            </div>
            {errors.principalDor && <p className="text-red-500 text-sm mt-2">{errors.principalDor.message}</p>}
          </div>

          {/* 9️⃣ Disposição a pagar */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">Se tivesse um sistema que resolvesse seus principais problemas, quanto você pagaria por mês? *</p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Não pagaria" {...register('disposicaoPagar', { required: 'Selecione uma opção' })} className="mr-2" /> Não pagaria nada</label>
              <label className="flex items-center"><input type="radio" value="Até R$ 50/mês" {...register('disposicaoPagar', { required: 'Selecione uma opção' })} className="mr-2" /> Até R$ 50/mês</label>
              <label className="flex items-center"><input type="radio" value="R$ 50-100/mês" {...register('disposicaoPagar', { required: 'Selecione uma opção' })} className="mr-2" /> R$ 50-100/mês</label>
              <label className="flex items-center"><input type="radio" value="R$ 100-200/mês" {...register('disposicaoPagar', { required: 'Selecione uma opção' })} className="mr-2" /> R$ 100-200/mês</label>
              <label className="flex items-center"><input type="radio" value="R$ 200-500/mês" {...register('disposicaoPagar', { required: 'Selecione uma opção' })} className="mr-2" /> R$ 200-500/mês</label>
              <label className="flex items-center"><input type="radio" value="> R$ 500/mês" {...register('disposicaoPagar', { required: 'Selecione uma opção' })} className="mr-2" /> Acima de R$ 500/mês</label>
            </div>
            {errors.disposicaoPagar && <p className="text-red-500 text-sm mt-2">{errors.disposicaoPagar.message}</p>}
          </div>

          {/* 10️⃣ Tecnologia e hábitos */}
          <div>
            <p className="block text-gray-700 font-bold mb-2">Qual é seu nível de conforto com tecnologia/aplicativos? *</p>
            <div className="flex flex-col">
              <label className="flex items-center"><input type="radio" value="Básico" {...register('nivelTecnologia', { required: 'Selecione uma opção' })} className="mr-2" /> Uso o celular apenas para WhatsApp e ligações</label>
              <label className="flex items-center"><input type="radio" value="Intermediário" {...register('nivelTecnologia', { required: 'Selecione uma opção' })} className="mr-2" /> Consigo usar apps simples, mas prefiro não complicar</label>
              <label className="flex items-center"><input type="radio" value="Avançado" {...register('nivelTecnologia', { required: 'Selecione uma opção' })} className="mr-2" /> Uso vários apps, não tenho problema</label>
              <label className="flex items-center"><input type="radio" value="Entusiasta" {...register('nivelTecnologia', { required: 'Selecione uma opção' })} className="mr-2" /> Gosto de tecnologia, estou sempre testando coisas novas</label>
            </div>
            {errors.nivelTecnologia && <p className="text-red-500 text-sm mt-2">{errors.nivelTecnologia.message}</p>}
          </div>

          {/* Campos de contato opcionais (mantidos para continuidade do fluxo atual) */}
          <div className="pt-2 border-t mt-4">
            <p className="text-gray-700 font-semibold mb-2">Contato (opcional)</p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="nome" className="block text-gray-700 mb-1">Nome ou apelido</label>
                <input id="nome" type="text" {...register('nome')} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-gray-700 mb-1">WhatsApp</label>
                <Controller
                  name="whatsapp"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^\(\d{2}\) \d{5}-\d{4}$/,
                      message: 'Formato inválido. Use (XX) XXXXX-XXXX'
                    }
                  }}
                  render={({ field }) => (
                    <InputMask
                      mask="(99) 99999-9999"
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(inputProps) => (
                        <input
                          {...inputProps}
                          id="whatsapp"
                          type="tel"
                          placeholder="(XX) XXXXX-XXXX"
                          className="w-full p-2 border rounded"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
              </div>
            </div>
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
