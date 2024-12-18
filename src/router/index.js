import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/helpers/SecurityFunc'

const routes = [
    {
        path: '/change-password',
        name: 'ChangePassword',
        component: () => import( /* webpackChunkName: "about" */ '../layouts/ChangePassView.vue')
    },
    {
        path: '/crear-cuenta',
        name: 'create-layout',
        component: () => import( /* webpackChunkName: "about" */ '../layouts/CrearCuenata.vue')
    },
    {
        path: '/menu-main',
        name: 'menu-main',
        component: () => import( /* webpackChunkName: "about" */ '../layouts/MenuPrincipal.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/menu',
        name: 'menu-layout',
        component: () => import( /* webpackChunkName: "about" */ '../layouts/Menu.vue'),
        meta: { requiresAuth: true }
        
    },
    {
        path: '/video-conference',
        name: 'video-conference',
        props: true,
        component: () => import( /* webpackChunkName: "about" */ '../layouts/VideoConference.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/indicador-loading',
        name: 'indicador-layout',
        component: () => import('@/components/indicadores/LoadingMainView.vue')
    },
    {
        path: '/login',
        name: 'login-layout',
        component: () => import(/* webpackChunkName: "about" */'../layouts/LoginPage.vue')
    },
    {
        path: '/test-component',
        name: 'test-component',
        component: () => import(/* webpackChunkName: "about" */'../layouts/TestComponent.vue')
    },

    {
        path: '/menu-visor',
        name: 'menu-visor',
        component: () => import(/* webpackChunkName: "about" */'../layouts/MenuVisorPdf.vue')
    },
    {
        path: '/:catchAll(.*)', // Ruta comodín para capturar todas las rutas no existentes
        redirect: '/login' // Redirigir a la página de login
    }



]

const router = createRouter({
    //history: createWebHashHistory(),
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    console.log("router.beforeEach")
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    if (requiresAuth && !isAuthenticated()) {
        next({ name: 'login-layout' });
    } else {
        next();
    }
});

export default router