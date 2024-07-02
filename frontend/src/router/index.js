import { createRouter, createWebHistory } from 'vue-router';

//유저 홈
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import MainPage from '@/views/main/MainView.vue';

//장바구니
import Cart from '@/views/CartView.vue';

//주문
import Order from '@/views/OrderForm.vue';
import OrderSuccess from '@/views/OrderSuccess.vue';

//QnA
import QnaForm from '@/views/QnaFormView.vue';

// 마이페이지
import MyPage from '@/views/mypage/MyPage.vue';
import MyPageHome from '@/components/mypage/MypageHome.vue';
import OrderHistory from '@/components/mypage/OrderHistory.vue';
import OrderDetailInfo from '@/components/mypage/OrderDetailInfo.vue';
import MyPageQnA from '@/components/mypage/MypageQnA.vue';
import MyPageQnAInfo from '@/components/mypage/MypageQnAInfo.vue';
import MyWishList from '@/components/mypage/MyWishList.vue';
import MyPageReview from '@/components/mypage/MypageReview.vue';

//관리자
import AdminLayout from '../layouts/AdminLayout.vue';
import AdminHome from '../views/AdminHome.vue';
import AdminNotice from '../views/admin/AdminNotice.vue';
import AdminNoticeForm from '../views/admin/AdminNoticeForm.vue'
import AdminNoticeInfo from '../views/admin/AdminNoticeInfo';
import AdminNoticeModify from '../views/admin/AdminNoticeModify.vue';
import Qna from '../views/admin/AdminQna.vue';
import AdminQnaInfo from '../views/admin/AdminQnaInfo.vue'
import ProdList from '../views/admin/AdminProdList.vue';
import AdminProdInfo from '../views/admin/AdminProdInfo.vue';
import ProdForm from '../views/admin/AdminProdForm.vue';
import AdminProdModify from '../views/admin/AdminProdModify.vue';
import Orders from '../views/admin/AdminOrder.vue';
import OrderInfo from '../views/admin/AdminOrderInfo.vue';
import AdminOrderDelivery from '../views/admin/AdminOrderDelivery.vue';
import AdminOrderCancel from '@/views/admin/AdminOrderCancel.vue';
import Members from '../views/admin/AdminMember.vue';

//상품
import ProdListView from '@/views/product/ProdListView.vue';
import ProdInfoView from '@/views/product/ProdInfoView.vue';
import ProdCategoryView from '@/views/product/ProdCategoryView.vue';

//공지

import NoticeListView from '@/views/notice/NoticeListView.vue';
import NoticeInfoView from '@/views/notice/NoticeInfoView.vue';

// 로그인, 회원가입
import login from '../views/user/loginForm.vue';
import join from '../views/user/joinForm.vue';
import UserFind from '../views/user/UserFind.vue';
import UserModify from '../views/user/UserModify.vue';
import UserDelete from '../views/user/UserDelete.vue';

const routes = [
    {
        path: '/',
        redirect: '/user/home',
    },
    {
        path: '/user',
        name: 'user',
        component: DefaultLayout,
        children: [
            {
                path: 'home',
                component: MainPage,
            },
            {
                path: 'shop',
                name: 'shop',
                component: ProdListView,
            },
            {
                path: 'prodcategory',
                name: 'prodcategory',
                component: ProdCategoryView,
            },
            {
                path: 'shopinfo',
                name: 'shopinfo',
                component: ProdInfoView,
            },
            {
                path: 'notice',
                name: 'notice',
                component: NoticeListView,
            },
            {
                path: 'noticeinfo',
                name: 'noticeinfo',
                component: NoticeInfoView,
            },
            {
                path: 'qna',
                name: 'qna',
                component: QnaForm,
                props: (route) => ({ qnadata: route.query.qna ? JSON.parse(route.query.qna) : {} }),
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
                    {
                        path: 'orderdetailinfo',
                        name: 'orderdetailinfo',
                        component: OrderDetailInfo,
                    },
                    {
                        path: 'mypageqna',
                        name: 'mypageqna',
                        component: MyPageQnA,
                    },
                    {
                        path: 'mypageqnainfo',
                        name: 'mypageqnainfo',
                        component: MyPageQnAInfo,
                    },
                    {
                        path: 'mypagereview',
                        name: 'mypagereview',
                        component: MyPageReview,
                    },
                    {
                        path: 'mywishlist',
                        component: MyWishList,
                    },
                ],
            },
            {
                path: 'cart',
                component: Cart,
            },
            {
                path: 'orderForm',
                name: 'orderForm',
                component: Order,
            },
            {

                path: 'orderSuccess',
                name: 'orderSuccess',
                component: OrderSuccess,
            },
            {
                //로그인

                path: 'login',
                component: login,
            },
            {
                path: 'join',
                component: join,
            },
            {
                path: 'UserFind',
                component: UserFind,
            },
            {
                path: 'UserModify',
                component: UserModify,
            },
            {
                path: 'UserDelete',
                component: UserDelete,
            },
        ],
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: '',
                component: AdminHome,
            },
            {
                path: 'notice',
                component: AdminNotice,
            },
            {
                path: 'noticeForm',
                component: AdminNoticeForm,
            },
            {
                path: 'noticeInfo',
                component: AdminNoticeInfo,
            },
            {
                path: 'noticeModify',
                component: AdminNoticeModify,
            },
            {
                path: 'qna',
                component: Qna,
            },
            {
                path: 'qnaInfo',
                component: AdminQnaInfo,
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
                path: 'prodInfo',
                component: AdminProdInfo,
            },
            {
                path: 'ProdModify',
                component: AdminProdModify,
            },
            {
                path: 'orders',
                component: Orders,
            },
            {
                path: 'ordersInfo',
                component: OrderInfo,
            },
            {
                path: 'orderDelivery',
                component: AdminOrderDelivery,
            },
            {
                path: 'orderCancel',
                component: AdminOrderCancel,
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
