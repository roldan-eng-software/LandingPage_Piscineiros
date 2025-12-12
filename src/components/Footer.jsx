// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="relative">
        <img 
          src="https://picsum.photos/1200/400?random=1"
          alt="Piscina Limpa" 
          className="w-full h-48 md:h-64 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} PiscineiroPro. Todos os direitos reservados.</p>
        <a href="#privacy-policy" className="text-gray-400 hover:text-white text-sm mt-2 inline-block">
          Política de Privacidade
        </a>
      </div>
    </footer>
  );
};

export default Footer;
