// src/utils/analytics.js

/**
 * Inicializa o Google Analytics 4.
 * Substitua 'GA_MEASUREMENT_ID' pelo seu ID de métricas no index.html.
 */
export const initGA = () => {
  if (process.env.NODE_ENV === 'production') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    // O ID de configuração é puxado do script no index.html
  }
};

/**
 * Rastreia um evento customizado no Google Analytics 4.
 * @param {string} eventName - O nome do evento (ex: 'form_submit_success').
 * @param {Object} eventParams - Parâmetros adicionais para o evento.
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (process.env.NODE_ENV === 'production') {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
      console.log(`GA Event: ${eventName}`, eventParams);
    }
  } else {
    console.log(`[DEV] GA Event: ${eventName}`, eventParams);
  }
};
