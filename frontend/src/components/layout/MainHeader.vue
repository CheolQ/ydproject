<template>
    <div>
        <!-- Spinner Start -->
        <!-- <div id="spinner"
            class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
            <div class="spinner-grow text-primary" role="status"></div>
        </div> -->
        <!-- Spinner End -->
        <!-- Navbar start -->
        <div class="container-fluid fixed-top">
            <div class="container topbar bg-primary d-none d-lg-block">
                <div class="d-flex justify-content-between">
                    <div class="top-info ps-2">
                    </div>
                    <div class="top-link pe-2" v-if="loggedInUserId">
                        <a><small class="text-white ms-2" @click="logoutHandler">Logout　|</small></a>
                        <router-link to="notice" class="text-white">
                            <small class="text-white ms-2">　Notice</small></router-link>
                    </div>
                    <div class="top-link pe-2" v-else>
                        <router-link to="/user/login" class="text-white">
                            <small class="text-white ms-2">Login　|</small>
                        </router-link>
                        <router-link to="/user/join" class="text-white">
                            <small class="text-white ms-2">　SignUp　|</small>
                        </router-link>
                        <router-link to="notice" class="text-white">
                            <small class="text-white ms-2">　Notice</small></router-link>
                    </div>
                </div>
            </div>
            <div class="container px-0">
                <nav class="navbar navbar-light bg-white navbar-expand-xl">
                    <router-link to="/" class="navbar-brand">
                        <img class="logoImg" :src="`/logo.png`" alt="까까무라로고">
                    </router-link>
                    <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                        <span class="fa fa-bars text-primary"></span>
                    </button>
                    <div class="collapse navbar-collapse bg-white" id="navbarCollapse">
                        <div class="navbar-nav mx-auto">
                            <a href="/user/shop" class="nav-item nav-link">전체상품</a>
                            <div v-for="v in categories" class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">{{ v.parent
                                    }}</a>

                                <div class="dropdown-menu m-0 bg-secondary rounded-0">

                                    <a v-for="c in v.childCode" @click="gotoProd(c)" class="dropdown-item">{{
                                        getCodeMeaning(c) }}

                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex m-3 me-0">
                            <button
                                class="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                                @click="modalOpen"><i class="fas fa-search text-primary"></i></button>
                            <router-link to="/user/cart">
                                <a href="#" class="position-relative me-4 my-5">
                                    <i class="fa fa-shopping-bag fa-2x"></i>
                                    <!-- <span
                                        class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                        style="top: -5px; left: 15px; height: 20px; min-width: 20px;">3</span> -->
                                </a>
                            </router-link>
                            <router-link to="/user/mypage" class="my-auto">
                                <i class="fas fa-user fa-2x"></i>
                            </router-link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Navbar End -->

        <!-- Modal Search Start -->
        <div class="modal-wrap" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            v-show="modalCheck">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content rounded-0">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Search by keyword</h5>
                        <button type="button" @click="modalOpen" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-center">
                        <div class="input-group w-75 mx-auto d-flex">
                            <input type="search" class="form-control p-3" placeholder="keywords"
                                aria-describedby="search-icon-1">
                            <span id="search-icon-1" class="input-group-text p-3" @click="searchHandler"><i
                                    class="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Search End -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            modalCheck: false,
            categories: [],
            codes: {}
        }
    },
    computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
    },
    created() {
        this.fetchCategories();
        this.getCodes();
    },
    methods: {
        fetchCategories() {
            // Axios를 사용하여 서버의 API를 호출하여 카테고리 데이터를 가져옵니다.
            // API 엔드포인트는 실제 서버 설정에 따라 수정해야 합니다.
            const apiUrl = '/api/common/categories'; // 예시 API URL
            axios.get(apiUrl)
                .then(response => {
                    this.categories = response.data; // 서버에서 받은 카테고리 데이터를 설정합니다.
                    console.log(this.categories)
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },
        getCodes() {
            axios.get(`/api/common/codes`)
                .then(result => {
                    this.codes = result.data;
                    console.log(result.data);
                })
                .catch(err => {
                    console.log('호출중 오류', err);
                })
        },
        modalOpen() {
            this.modalCheck = !this.modalCheck
        },
        searchHandler() {
            this.$router.push('shop');
            this.modalOpen();
        },
        gotoProd(code) {
            this.$router.push({ name: "prodcategory", query: { code: code } });
        },
        getCodeMeaning: function (code) {
            if (this.codes) {
                // console.log('dddd: ' , this.codes.Category.Minor);
                return this.codes.Category.Minor[code] || code; // 코드에 맞는 의미있는 문자열 반환
            }
            console.error(`해당 코드없음 : ${code}`)
            return code;
        },
        logoutHandler() {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/user/login');
                })
                .catch(err => {
                    console.error('Logout failed', err);
                });
        }
    }
}
</script>
<style>
.logoImg {
    width: 195px;
}
</style>

<style scoped>
/* dimmed */
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2000;
}

/* modal or popup */
.modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
</style>