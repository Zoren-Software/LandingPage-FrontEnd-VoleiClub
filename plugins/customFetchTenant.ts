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
            let response: Response;
            try {
                response = await fetch(url, {
                    method,
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Accept-Language': localStorage.getItem("selectedLanguage") || '',
                        token: token,
                        ...options.headers,
                    },
                    ...options,
                });
            } catch (err: any) {
                const networkError = new Error(err?.message || 'Falha de rede ao conectar na API de tenants.');
                (networkError as any).response = null;
                throw networkError;
            }

            let data: any;
            try {
                const text = await response.text();
                data = text ? JSON.parse(text) : {};
            } catch {
                const parseError = new Error(response.ok ? 'Resposta inválida da API.' : 'Erro na requisição.');
                (parseError as any).response = { status: response.status };
                throw parseError;
            }

            if (!response.ok) {
                const message =
                    data?.message ||
                    (Array.isArray(data?.errors) && data.errors[0]?.message) ||
                    data?.errors?.[0]?.message ||
                    `Erro na requisição (${response.status}).`;
                const customError = new Error(message);
                (customError as any).response = data;
                throw customError;
            }

            // GraphQL: 200 com erros no body
            if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const message = data.errors[0]?.message || data.errors[0]?.msg || 'Erro retornado pela API de tenants.';
                const customError = new Error(message);
                (customError as any).response = data;
                throw customError;
            }

            return data;
        }
        nuxtApp.provide('customFetchTenant', customFetchTenant);
    },
    hooks: {
      'app:created'() {
        // Você pode registrar hooks do Nuxt aqui, se necessário
      }
    }
  });