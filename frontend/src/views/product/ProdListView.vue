<template>
    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">전체 상품</h1>
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <div class="input-group w-100 mx-auto d-flex">
                                <input type="search" v-model="search" class="form-control p-3" placeholder="keywords"
                                    aria-describedby="search-icon-1">
                                <span id="search-icon-1" class="input-group-text p-3" @click="searchBtn"><i
                                        class="fa fa-search"></i></span>
                            </div>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                <label for="fruits">Default Sorting:</label>
                                <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3"
                                    form="fruitform">
                                    <option value="sin">신상품</option>
                                    <option value="sang">상품명</option>
                                    <option value="be">베스트</option>
                                    <option value="hprice">높은가격</option>
                                    <option value="rprice">낮은가격</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <h4>Categories</h4>
                                        <ul class="list-unstyled fruite-categorie">
                                            <li>
                                                <div class="d-flex justify-content-between fruite-name"
                                                    v-for="v in prodCategoryCnt">

                                                    <a @click="gotoProd(v.category_code)"><i
                                                            class="fas fa-apple-alt me-2"></i>{{ v.category_name }}</a>

                                                    <span>({{ v.prodcnt }})</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="row g-4 justify-content-center">
                                <div class="col-md-6 col-lg-6 col-xl-4" :key="i" v-for="(prod, i) in prodList"
                                    @click="goToDetail(prod.prod_no)">
                                    <div class="rounded position-relative fruite-item">
                                        <div class="fruite-img">
                                            <img :src="`/img/prodImg/${prod.main_img}`"
                                                class="img-fluid w-100 rounded-top" alt="">
                                        </div>
                                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                            <h4>{{ prod.prod_name }}</h4>
                                            <div class="d-flex justify-content-between flex-lg-wrap">
                                                <p class="text-dark fs-5 fw-bold mb-0">{{ numberFormat(prod.prod_price)
                                                    }}원</p>
                                                <button @click="gotoCart(prod.prod_no, $event)"
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
                </div>
            </div>
            <paging v-bind="page" @go-page="goPage" />
        </div>
    </div>
    <!-- Fruits Shop End-->

</template>

<script>
import PageMixin from '../../mixin';
import axios from "axios";
import Swal from "sweetalert2";
import paging from "@/components/Paging.vue"
// import { computed } from "vue";

export default {
    mixins: [PageMixin],
    components: { paging },
    data() {
        return {
            prodList: [],
            prodCategoryCnt: [],
            page: {},
            pageUnit: 9,
            search: '',

        }
    },

    created() {
        this.search = this.$route.query.search || ''; // 검색어 초기화
        this.getProdList();
        this.getProdCategoryCnt();
        this.goPage(1);
    },
    computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
    },
    methods: {
        async goPage(page) {
            let pageUnit = this.pageUnit;
            let result = await axios.get(`/api/shop?pageUnit=${pageUnit}&page=${page}&search=${this.search}`)
            this.prodList = result.data.list;
            console.log(this.page)
            this.page = this.pageCalc(page, result.data.count, 5, pageUnit)

        },
        async getProdList() {
            let result = await axios.get(`/api/shop`);
            this.prodList = result.data;
        },
        async getProdCategoryCnt() {
            let result = await axios.get(`/api/shop/cnt`);
            console.log('갯수', result.data[0]);
            this.prodCategoryCnt = result.data;
        },
        async goToDetail(no) {
            await this.$router.push({ name: "shopinfo", query: { no: no } });
        },
        gotoProd(code) {
            this.$router.push({ name: "prodBigcategory", query: { code: code } });
        },
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
            axios.post(`/api/cart/insertCart/${no}`, this.prodList.prod_no)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "장바구니에 등록되었습니다.",
                showConfirmButton: false,
                timer: 1500
            })
        },
        searchBtn() {
            this.goPage(1);
        }

    }

}
</script>

<style></style>