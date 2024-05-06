import { defineNuxtPlugin } from '#app'


export default defineNuxtPlugin({
    name: 'customFetchTenant',
    enforce: 'pre',
    async setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig();
        
        const baseUrl = runtimeConfig.public.apiBaseTenant;
        const token = runtimeConfig.public.apiBaseTenantToken;

        async function customFetchTenant(endpoint, method, options = {}) {
            const url = `${baseUrl}${endpoint}`;
            const response = await fetch(url, {
                method,
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    // adicionar language
                    'Accept-Language': localStorage.getItem("selectedLanguage"),
                    token: token,
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
        nuxtApp.provide('customFetchTenant', customFetchTenant);
    },
    hooks: {
      'app:created'() {
        // Você pode registrar hooks do Nuxt aqui, se necessário
      }
    }
  });