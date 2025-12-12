// src/components/Beneficios.jsx
import React from 'react';
import { FaRoute, FaUsers, FaFileInvoiceDollar } from 'react-icons/fa';

const beneficios = [
  {
    icon: <FaRoute className="text-piscina-500 text-4xl mb-4" />,
    title: 'Organize rotas e agendamentos',
    description: 'Planeje seu dia de forma inteligente, otimizando seu tempo e combustível.',
  },
  {
    icon: <FaUsers className="text-piscina-500 text-4xl mb-4" />,
    title: 'Controle clientes e pagamentos',
    description: 'Saiba quem pagou e quem está devendo com apenas alguns cliques.',
  },
  {
    icon: <FaFileInvoiceDollar className="text-piscina-500 text-4xl mb-4" />,
    title: 'Menos tempo com papelada',
    description: 'Digitalize seus processos e foque no que realmente importa: seus clientes.',
  },
];

const Beneficios = () => {
  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          O que o futuro app pode fazer por você?
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {beneficios.map((beneficio, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4 text-center transform transition duration-500 hover:scale-105"
            >
              <div className="flex justify-center items-center mb-4">
                {beneficio.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{beneficio.title}</h3>
              <p className="text-gray-600">{beneficio.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Beneficios;
