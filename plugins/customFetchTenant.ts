import { defineNuxtPlugin } from '#app'


export default defineNuxtPlugin({
    name: 'customFetchTenant',
    enforce: 'pre',
    async setup(nuxtApp) {
        const runtimeConfig = useRuntimeConfig();
        
        const baseUrl = runtimeConfig.public.apiTenants;
        const token = runtimeConfig.public.apiTenantsToken;

        async function customFetchTenant(endpoint, method, options = {}) {
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
                    token: token,
                    ...options.headers,
                },
                ...options,
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