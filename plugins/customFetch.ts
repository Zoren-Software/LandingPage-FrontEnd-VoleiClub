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
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    // adicionar language
                    'Accept-Language': localStorage.getItem("selectedLanguage"),
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const customError = new Error(errorData.message || 'Erro na requisição');
                customError.response = errorData;

                
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