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
                            <th scope="col">상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in prodList" v-bind:key="p">
                            <th scope="row">{{ p.prod_no }}</th>
                            <td>{{ p.category_code }}</td>
                            <td>{{ p.prod_name }}</td>
                            <td>{{ getNumberFormat(p.prod_price) }}</td>
                            <td><button type="button" class="btn btn-primary" @click="prodInfo(p.prod_no)">조회</button></td>
                        </tr>
                    </tbody>
                </table>
                <paging-component v-bind="page" @go-page="goPage"/>
            </div>
        </div>
    </div>            
</template>
<script>
import Paging from "../../mixin";
import axios from 'axios';
import PagingComponent from '@/components/Paging.vue'

export default {
    mixins : [Paging],
    components: {
        PagingComponent
    },
    data() {
        return {
            prodList: [],
            page: {},
            pageUnit: 10,
        }
    },
    created() {
        this.goPage(1);
        
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminProd?pageUnit=${this.pageUnit}&page=${page}`)
            .then(result => {
                this.prodList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
            .catch(err => console.log(err));

        },
        prodInfo(prodNo){
            console.log(prodNo);
            this.$router.push({path: 'prodInfo', query: {bno: prodNo}})
        },
        getNumberFormat (number ){
            return this .$numberFormat (number );
        }
    },
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>
