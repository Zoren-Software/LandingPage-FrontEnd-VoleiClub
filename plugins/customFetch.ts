import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
    name: 'customFetch',
    enforce: 'pre',
    async setup(nuxtApp) {
      const baseUrl = process.env.ENDPOINT_API ?? "http://localhost/api"

      async function customFetch(endpoint, method, options = {}) {
        const url = `${baseUrl}${endpoint}`;
        const response = await fetch(url, {
          method,
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Supondo que o corpo da resposta contém JSON
            const customError = new Error('Erro na requisição');
            customError.response = errorData; // Anexar os detalhes do erro
            throw customError;
        }
  
        return await response.json();
      }
  
      nuxtApp.provide('customFetch', customFetch);
    },
    hooks: {
      'app:created'() {
        // Você pode registrar hooks do Nuxt aqui, se necessário
      }
    }
  });