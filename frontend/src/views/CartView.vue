<template>
    <h2 class="aside-tit">CART</h2>
    <CartList />
</template>
<script>
    import CartList from '../components/layout/CartList.vue';

    export default {
        components: {
            CartList
        },
        data(){
            return{};
        },
        created(){},
        methods : {}
    }
</script>
<style>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}
</style>