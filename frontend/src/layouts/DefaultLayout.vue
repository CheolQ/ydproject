<template>
    <MainHeader />
    <div class="contentmargin">
        <router-view />
    </div>
    <MainFooter></MainFooter>

</template>

<script>
import MainHeader from '@/components/layout/MainHeader.vue';
import MainFooter from '@/components/layout/MainFooter.vue';

export default {
    components: {
        MainHeader,
        MainFooter
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

<style scoped>
.contentmargin {
    margin-top: 152px;
}
</style>