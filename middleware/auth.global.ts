export default defineNuxtRouteMiddleware((to, from, next) => {
    const token = localStorage.getItem('userToken');
    const protectedRoutes = ['/leads']; // NOTE - Lista de rotas protegidas

    if (to.path === '/login' && token != null) {
        return '/';
    }

    if (protectedRoutes.includes(to.path) && !token) {
        // Se tenta acessar uma rota protegida sem estar logado, redireciona para o login
        return navigateTo('/login');
    }

  });