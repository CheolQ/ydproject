<template>
    <div>
        <!-- Hero Start -->
        <div class="container-fluid py-5 mb-5 hero-header">
            <div class="container py-5">
                <div class="row g-5 align-items-center">
                    <div class="col-md-12 col-lg-7">
                        <h4 class="mb-3 text-secondary">Enjoy your snack</h4>
                        <h1 class="mb-5 display-3 text-primary">Cookie & <br>Biscuit &<br> Snack Foods</h1>
                    </div>
                    <div class="col-md-12 col-lg-5">
                        <div id="carouselId" class="carousel slide position-relative" data-bs-ride="carousel">
                            <div class="carousel-inner" role="listbox">
                                <div class="carousel-item active rounded">
                                    <img src="/img/hero-img-1.jpg" class="img-fluid w-100 h-100 bg-secondary rounded"
                                        alt="First slide">
                                </div>
                                <div class="carousel-item rounded">
                                    <img src="/img/hero-img-2.jpg" class="img-fluid w-100 h-100 rounded"
                                        alt="Second slide">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselId"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Hero End -->


        <!-- Featurs Section Start -->
        <div class="container-fluid featurs py-5">
            <div class="container py-5">
                <div class="row g-4">
                    <div class="col-md-6 col-lg-3">
                        <div class="featurs-item text-center rounded bg-light p-4">
                            <div class="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i class="fas fa-car-side fa-3x text-white"></i>
                            </div>
                            <div class="featurs-content text-center">
                                <h5>Free Shipping</h5>
                                <p class="mb-0">Free on order over 50,000₩</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="featurs-item text-center rounded bg-light p-4">
                            <div class="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i class="fas fa-user-shield fa-3x text-white"></i>
                            </div>
                            <div class="featurs-content text-center">
                                <h5>Security Payment</h5>
                                <p class="mb-0">100% security payment</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="featurs-item text-center rounded bg-light p-4">
                            <div class="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i class="fas fa-exchange-alt fa-3x text-white"></i>
                            </div>
                            <div class="featurs-content text-center">
                                <h5>30 Day Return</h5>
                                <p class="mb-0">30 day money guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="featurs-item text-center rounded bg-light p-4">
                            <div class="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i class="fa fa-phone-alt fa-3x text-white"></i>
                            </div>
                            <div class="featurs-content text-center">
                                <h5>24/7 Support</h5>
                                <p class="mb-0">Support every time fast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid fruite py-5">
            <div class="container py-5">
                <div class="tab-class text-center">
                    <div class="row g-4">
                        <div class="col-lg-4 text-start">
                            <h1>Our Yammy Products</h1>
                        </div>
                        <div class="col-lg-8 text-end">
                            <ul class="nav nav-pills d-inline-flex text-center mb-5">
                                <li class="nav-item">
                                    <button class="d-flex m-2 py-2 bg-light rounded-pill active"
                                        @click="fetchProducts('%A%')">
                                        <span class="text-dark textBold"
                                            style="width: 150px; font-size:small">전체상품</span>
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="d-flex py-2 m-2 bg-light rounded-pill" @click="fetchProducts('A1')">
                                        <span class="text-dark textBold"
                                            style="width: 150px; font-size:small">과자,스낵,쿠키</span>
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="d-flex m-2 py-2 bg-light rounded-pill" @click="fetchProducts('A2')">
                                        <span class="text-dark textBold"
                                            style="width: 150px; font-size:small">초콜릿,젤리,캔디,껌</span>
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="d-flex m-2 py-2 bg-light rounded-pill" @click="fetchProducts('A3')">
                                        <span class="text-dark textBold" style="width: 150px; font-size:small">라면,
                                            간식</span>
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="d-flex m-2 py-2 bg-light rounded-pill" @click="fetchProducts('A4')">
                                        <span class="text-dark textBold"
                                            style="width: 150px; font-size:small">음료,커피</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">
                            <div class="row g-4">
                                <MainProductList v-for="product in products" :key="product.id" :product="product" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fruits Shop End-->

        <!-- Bestsaler Product Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="text-center mx-auto mb-5" style="max-width: 700px;">
                    <h1 class="display-4">Bestseller Products</h1>
                    <p>까까무라 판매량 베스트 제품입니다.</p>
                </div>
                <div class="row g-4">
                    <div v-for="v in bestProduct" class="col-lg-6 col-xl-4">
                        <div @click="goToDetail(v.prod_no)" class="p-4 rounded bg-light">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <img :src="`/img/prodImg/${v.main_img}`" class="img-fluid rounded-circle w-100"
                                        alt="">
                                </div>
                                <div class="col-6">
                                    <a href="#" class="h5">{{ v.prod_name }}</a>
                                    <div class="d-flex my-3">
                                        <div v-if="v.rating != 0">
                                            <i v-for="i in v.rating" class="fas fa-star text-primary"></i>
                                            <i v-for="i in 5 - v.rating" class="fas fa-star"></i>
                                        </div>
                                        <div v-else>
                                            <i v-for="i in 5" class="fas fa-star"></i>
                                        </div>
                                    </div>
                                    <h4 class="mb-3">{{ numberFormat(v.prod_price) }} 원</h4>
                                    <button v-if="loggedInUserId != null" @click="gotoCart(v.prod_no, $event)"
                                        class="btn border border-secondary rounded-pill px-3 text-primary"><i
                                            class="fa fa-shopping-bag me-2 text-primary"></i> Add to
                                        cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- Bestsaler Product End -->
        <!-- Tastimonial Start -->
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import MainProductList from '../../components/MainProductList.vue';
export default {
    components: {
        MainProductList
    },
    data() {
        return {
            bestProduct: [],
            products: []
        }
    },
    created() {
        // this.fetchProducts('');
        axios.get(`/api/common/getbestproduct`)
            .then(result => {
                //console.log(result)
                this.bestProduct = result.data;
            })
        axios.get('/api/common/products', {
            params: {
                category: '%A%'
            }
        })
            .then(result => {
                this.products = result.data;
                // console.log(response.data, this.products);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });

    },
    methods: {
        numberFormat: function (number) {
            if (number == 0)
                return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
        },
        gotoCart(no, e) {
            console.log(no);
            e.stopPropagation();
            axios.post(`/api/cart/insertCart/${no}`, no)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "장바구니에 등록되었습니다.",
                showConfirmButton: false,
                timer: 1500
            })
        },
        async goToDetail(no) {
            await this.$router.push({ name: "shopinfo", query: { no: no } });
        },
        async fetchProducts(category) {
            axios.get('/api/common/products', {
                params: {
                    category: category
                }
            })
                .then(result => {
                    this.products = result.data;
                    // console.log(response.data, this.products);
                })
                .catch(error => {
                    console.error('There was an error fetching the products!', error);
                });

        }

    }
}
</script>

<style scoped>
.textBold {
    font-weight: bolder;
}
</style>