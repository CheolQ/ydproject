<template>
    <div>
        <div class="card mb-4">
            <div class="card-body shadow">상품 조회</div>
        </div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">상품번호</th>
                            <th scope="col">카테고리</th>
                            <th scope="col">상품명</th>
                            <th scope="col">판매가</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="od in orderList" v-bind:key="od">
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>            
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>
