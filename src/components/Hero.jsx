// src/components/Hero.jsx
import React from 'react';
import { trackEvent } from '../utils/analytics';

const Hero = () => {
  const handleCTAClick = () => {
    // Rastreia o clique no botão do Hero
    trackEvent('hero_cta_click', {
      category: 'CTA',
      label: 'Responder Agora',
    });
  };

  return (
    <section 
      id="hero" 
      className="relative flex items-center justify-center h-screen bg-gradient-to-br from-piscina-600 to-piscina-500 text-white"
    >
      <div className="text-center px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md animate-fade-in-down">
          Pesquisa Piscineiros - Ajude a criar seu app ideal!
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-sm animate-fade-in-up">
          5 minutos para contar sua rotina. Em breve te avisamos do lançamento!
        </p>
        <a 
          href="#formulario" 
          onClick={handleCTAClick}
          className="bg-limpa hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Responder Agora
        </a>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;
