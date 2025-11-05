import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Forbidden from '@/views/Forbidden.vue';
import Login from '@/views/secure/Login.vue';
import Products from '@/views/pages/Products.vue';

const routes = [
    { path: '/', name: 'home-link', component: Home, },
    { path: '/403', name: 'forbidden-link', component: Forbidden, },
    { path: '/:pathMatch(.*)*', name: 'not-found-link', component: NotFound, },

    { path: '/secure/login', name: 'secure-login-link', component: Login, },
    { path: '/pages/products', name: 'pages-products-link', component: Products, },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
