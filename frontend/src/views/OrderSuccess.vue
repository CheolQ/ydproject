<template>
    <h2 class="aside-tit">ORDER COMPLETE!</h2>
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