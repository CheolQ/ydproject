import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminHome from '../views/AdminHome.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            template: 'home', // Home 템플릿
        },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminHome,
        meta: {
            template: 'admin', // Admin 템플릿
        },
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
