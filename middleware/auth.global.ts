export default defineNuxtRouteMiddleware((to, from, next) => {
    // Verifica se está no lado do cliente antes de acessar localStorage
    if (process.client) {
        const token = localStorage.getItem('userToken');
        const protectedRoutes = ['/leads']; // NOTE - Lista de rotas protegidas

        if (to.path === '/login' && token != null) {
            return navigateTo('/');
        }

        if (protectedRoutes.includes(to.path) && !token) {
            // Se tenta acessar uma rota protegida sem estar logado, redireciona para o login
            return navigateTo('/login');
        }
    }
});