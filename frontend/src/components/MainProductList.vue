<template>
    <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="rounded position-relative product-item">
            <div class="product-img">
                <img :src="`/img/prodImg/${product.main_img}`" class="img-fluid w-100 rounded-top" alt="">
            </div>
            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                <h4>{{ product.prod_name }}</h4>
                <p>{{ product.prod_explain }}</p>
                <div class="d-flex justify-content-between flex-lg-wrap">
                    <p class="text-dark fs-5 fw-bold mb-0">{{ numberFormat(product.prod_price) }} 원</p>
                    <button v-if="loggedInUserId != null" @click="gotoCart(product.prod_no, $event)"
                        class="btn border border-secondary rounded-pill px-3 text-primary">
                        <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
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
        numberFormat(number) {
            if (number == 0) return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
        }
    }
}
</script>

<style scoped>
.product-item {
    transition: transform 0.2s ease;
}

.product-item:hover {
    transform: translateY(-10px);
}

.product-img img {
    max-height: 200px;
    object-fit: cover;
}
</style>