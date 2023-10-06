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
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
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