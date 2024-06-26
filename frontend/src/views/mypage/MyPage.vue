<template>
    <div id="contentWrap">
        <MypageNav />
        <router-view></router-view>
    </div>
</template>

<script>
import MypageNav from '../../components/layout/MypageNav.vue';
export default {
    components: {
        MypageNav
    },
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

<style>
#contentWrap {
    position: relative;
    width: 1100px;
    margin-left: auto;
    margin-right: auto;
}
</style>