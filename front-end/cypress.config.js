const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // URL del servidor Vite
    supportFile: 'false', // Deshabilitar el archivo de soporte
    setupNodeEvents(on, config) {
      // Configuración adicional de eventos
    },
  },
});
