<template>
    <div>주문성공페이지</div>
    <p></p>
</template>
<script>
    import axios from 'axios';

    export default {
        data(){
            return{};
        },
        created(){
            let dtCount = JSON.parse(this.$route.query.dtCount);
            getProd(dtCount);
        },
        methods : {
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