import { defineNuxtPlugin } from '#app'


export default defineNuxtPlugin({
    name: 'customFetch',
    enforce: 'pre',
    async setup(nuxtApp) {
      const runtimeConfig = useRuntimeConfig();
      
      const baseUrl = runtimeConfig.public.apiBase;

      async function customFetch(endpoint, method, options = {}) {
        const url = `${baseUrl}${endpoint}`;
        const response = await fetch(url, {
          method,
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            // adicionar language
            'Accept-Language': localStorage.getItem("selectedLanguage"),
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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