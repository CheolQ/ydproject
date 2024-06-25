<template>
    <MainHeader />
    <CartList />
    <MainFooter />
</template>
<script>
    // import "bootstrap" 
    // import "bootstrap/dist/css/bootstrap.min.css"
    import MainHeader from '@/components/layout/MainHeader.vue';
    import MainFooter from '@/components/layout/MainFooter.vue';
    import CartList from '@/components/layout/CartList.vue';

    export default {
        components: {
                        MainHeader,
                        CartList,
                        MainFooter
        },
        data(){
            return{};
        },
        created(){},
        methods : {}
    }
</script>
<style>
</style>