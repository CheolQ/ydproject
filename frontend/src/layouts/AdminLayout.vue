<template>
    <body id="page-top" class="sidebar-toggled">
        <div id="wrapper">
            <AdminNav />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <AdminHeader />
                    <div class="container-fluid">
                        <router-view />
                    </div>
                </div>
                <AdminFooter />
            </div>
        </div>
    </body>
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
<style scoped src="../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../assets/admin/css/sb-admin-2.min.css"></style>
<style>
.lightbox{
    display: none;
}
</style>