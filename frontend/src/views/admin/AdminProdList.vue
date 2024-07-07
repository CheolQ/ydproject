<template>
    <div>
        <ContentHeader title="상품 조회"></ContentHeader>
        <SearchForm title1="검색어" title2="유통기한" title3="카테고리" :Categorys="Categorys" @obj="searchfrom" ref="reset_com"></SearchForm>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button @click="prodSearchBtn" class="btn btn-primary">검색</button>        
            <button @click="resetBtn" class="btn btn-secondary">초기화</button>
        </div>
        <br>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">상품번호</th>
                            <th scope="col">카테고리</th>
                            <th scope="col">상품명</th>
                            <th scope="col">판매가</th>
                            <th scope="col">유통기간</th>
                            <th scope="col">상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in prodList" v-bind:key="p">
                            <th scope="row">{{ p.prod_no }}</th>
                            <td>{{ p.category_code }}</td>
                            <td>{{ p.prod_name }}</td>
                            <td>{{ getNumberFormat(p.prod_price) }}</td>
                            <td>{{ getDateFormat(p.exp_date) }}</td>
                            <td><button type="button" class="btn btn-primary btn-sm" @click="prodInfo(p.prod_no)">조회</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <paging-component v-bind="page" @go-page="goPage"/>
    </div>            
</template>
<script>
import Paging from "../../mixin";
import axios from 'axios';
import PagingComponent from '@/components/Paging.vue'
import ContentHeader from '@/components/admin/ContentHeader.vue'
import SearchForm from '@/components/admin/SearchForm.vue'

export default {
    mixins : [Paging],
    components: {
        PagingComponent, ContentHeader, SearchForm
    },
    data() {
        return {
            Categorys: [],

            name: '',
            date1: '',
            date2: '',
            category: '',

            prodList: [],
            page: {},
            pageUnit: 5,
        }
    },
    created() {
        axios.get(`/api/adminProd/category`)
        .then(result => {
            console.log(result.data)
            this.Categorys = result.data;
        })
        .catch(err => console.log(err))
        this.goPage(1);
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminProd?pageUnit=${this.pageUnit}&page=${page}&name=${this.name}&date1=${this.date1}&date2=${this.date2}&category=${this.category}`)
            .then(result => {
                this.prodList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
            .catch(err => console.log(err));
        },
        prodSearchBtn(){
            this.goPage(1);
        },
        resetBtn(){
            this.$refs.reset_com.test2();
            this.goPage(1);
        },
        searchfrom(name, date1, date2, category){
            this.name = name;
            this.date1 = date1;
            this.date2 = date2;
            this.category = category;
        },
        prodInfo(prodNo){
            console.log(prodNo);
            this.$router.push({path: 'prodInfo', query: {bno: prodNo}})
        },
        getDateFormat (date ){
 	        return this .$dateFormat (date );
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
