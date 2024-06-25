import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';


//유저



//관리자
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminHome from '../views/AdminHome.vue';
import Notice from '../views/admin/AdminNotice.vue'
import Qna from '../views/admin/AdminQna.vue'
import ProdList from '../views/admin/AdminProdList.vue'
import ProdForm from '../views/admin/AdminProdForm.vue'
import Orders from '../views/admin/AdminOrder.vue'
import Members from '../views/admin/AdminMember.vue'

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
        component: AdminLayout,
        meta: {
            template: 'admin', // Admin 템플릿
        },
        children: [
            {
                path: '',
                component: AdminHome
            },
            {
                path: 'notice',
                component: Notice
            },
            {
                path: 'qna',
                component: Qna
            },
            {
                path: 'prodList',
                component: ProdList
            },
            {
                path: 'prodForm',
                component: ProdForm
            },
            {
                path: 'orders',
                component: Orders
            },
            {
                path: 'member',
                component: Members
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
