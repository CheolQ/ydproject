<template>
    <h2 class="aside-tit">ORDER COMPLETE!</h2>
    <p>주문이 완료되었습니다. 주문 내역은 My Page에서 확인 가능합니다.</p>
    <router-link to="/user/mypage/orderhistory/">My Page로 이동</router-link>
</template>
<script>
    import axios from 'axios';

    export default {
        data(){
            return{};
        },
        created(){
            //let dtCount = JSON.parse(this.$route.query.dtCount);
            //getProd(dtCount);
        },
        methods : {
            //상품이름가져오려고 상품넘버 이용
            // async getProd(dtCount){
            //     await for(let dt of dtCount){

            //         let prodNo = await axios.get(`/api/order/getProd?orderDtNo=${dt}`);
            //         console.log(prodNo);
            //     }
            // }
        }
    }
</script>
<style>
</style>