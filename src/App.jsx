// src/App.jsx
import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Beneficios from './components/Beneficios';
import Formulario from './components/Formulario';
import Footer from './components/Footer';
import { initGA, trackEvent } from './utils/analytics';

function App() {
  // Inicializa o Google Analytics
  useEffect(() => {
    initGA();
    // Rastreia a visualização da página
    trackEvent('page_view', { page_path: window.location.pathname });
  }, []);

  return (
    <div className="App bg-white">
      <header>
        <Hero />
      </header>
      <main>
        <Beneficios />
        <Formulario />
      </main>
      <Footer />
    </div>
  );
}

export default App;
