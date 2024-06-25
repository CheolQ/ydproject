<template>
    <Adminheader />
    <AdminNav />
    <div></div>
    <AdminFooter />
</template>

<script>
import AdminHeader from '@/components/layout/AdminHeader.vue';
import AdminFooter from '@/components/layout/AdminFooter.vue';
import AdminNav from '@/components/layout/AdminNav.vue';

export default {
    components: {
        AdminHeader,
        AdminNav,
        AdminFooter
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

<style></style>