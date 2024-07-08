<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <router-link to="/admin">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="bi bi-server"></i>
                </div>
                <div class="sidebar-brand-text mx-3">관리자페이지</div>
            </a>
        </router-link>
        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-folder"></i>
                <span>게시판관리</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link to="/admin/notice">
                        <a class="collapse-item" href="#">공지사항</a>
                    </router-link>
                    <router-link to="/admin/qna">
                        <a class="collapse-item" href="#">QnA</a>
                    </router-link>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-folder"></i>
                <span>상품관리</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link to="/admin/prodList">
                        <a class="collapse-item" href="#">상품 조회</a>
                    </router-link>
                    <router-link to="/admin/prodForm">
                        <a class="collapse-item" href="#">상품 등록</a>
                    </router-link>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-folder"></i>
                <span>주문관리</span>
            </a>
            <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link to="/admin/orders">
                        <a class="collapse-item" href="#">주문조회</a>
                    </router-link>
                    <router-link to="/admin/orderDelivery">
                        <a class="collapse-item" href="#">배송조회</a>
                    </router-link>
                    <router-link to="/admin/orderCancel">
                        <a class="collapse-item" href="#">주문취소</a>
                    </router-link>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePagess"
                aria-expanded="true" aria-controls="collapsePages">
                <i class="fas fa-fw fa-folder"></i>
                <span>회원관리</span>
            </a>
            <div id="collapsePagess" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link to="/admin/member">
                        <a class="collapse-item" href="#">회원조회</a>
                    </router-link>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import venjs from '../../assets/admin/vendor/bootstrap/js/bootstrap.bundle'

export default {
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>