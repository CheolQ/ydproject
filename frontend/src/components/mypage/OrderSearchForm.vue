<template>
    <div class="card mb-4">
        <div class="card-body shadow">
            <div class="row">
                <div class="col-2">{{ title }}</div>
                <div class="col-10">
                    <input type="date" v-model="date1" @change="test"> ~ <input type="date" v-model="date2"
                        @change="test">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
    },
    data() {
        return {
            date1: '',
            date2: '',
        }
    },
    methods: {
        test() {
            this.$emit('obj', this.date1, this.date2);
        },
        test2() {
            this.date1 = '';
            this.date2 = '';
            this.$emit('obj', this.date1, this.date2);
        }
    },
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>