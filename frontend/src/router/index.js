import { createRouter, createWebHistory } from 'vue-router';

//유저 홈
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MainPage from '@/views/main/MainView.vue';

// 마이페이지
import MyPage from '@/views/mypage/MyPage.vue';
import MyPageHome from '@/components/mypage/MypageHome.vue';
import OrderHistory from '@/components/mypage/OrderHistory.vue';

//관리자
import AdminLayout from '../layouts/AdminLayout.vue';
import AdminHome from '../views/AdminHome.vue';
import Notice from '../views/admin/AdminNotice.vue';
import Qna from '../views/admin/AdminQna.vue';
import ProdList from '../views/admin/AdminProdList.vue';
import ProdForm from '../views/admin/AdminProdForm.vue';
import Orders from '../views/admin/AdminOrder.vue';
import Members from '../views/admin/AdminMember.vue';

// 회원가입
// import userjoin from '../views/user/userjoin.vue';
import login from '../views/user/login.vue';

const routes = [
    {
        path: '/',
        redirect: '/user/home',
    },
    {
        path: '/user',
        name: 'user',
        component: DefaultLayout,
        meta: {
            template: 'home', // Home 템플릿
        },
        children: [
            {
                path: 'home',
                component: MainPage,
            },
            {
                path: 'mypage',
                component: MyPage,
                children: [
                    {
                        path: '',
                        component: MyPageHome,
                    },
                    {
                        path: 'orderhistory',
                        component: OrderHistory,
                    },
                ],
            },
            {
                path: 'login',
                component: login,
            },
        ],
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
                component: AdminHome,
            },
            {
                path: 'notice',
                component: Notice,
            },
            {
                path: 'qna',
                component: Qna,
            },
            {
                path: 'prodList',
                component: ProdList,
            },
            {
                path: 'prodForm',
                component: ProdForm,
            },
            {
                path: 'orders',
                component: Orders,
            },
            {
                path: 'member',
                component: Members,
            },
        ],
    },
  
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
