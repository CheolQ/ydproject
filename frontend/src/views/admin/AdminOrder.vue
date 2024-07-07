<template>
    <div>
        <ContentHeader title="주문상세"></ContentHeader>
        <SearchForm title1="검색어" title2="주문기한" title3="주문상태" :Categorys="Categorys" @obj="searchfrom" ref="reset_com"></SearchForm>
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
                            <th scope="col">주문번호</th>
                            <th scope="col">주문날짜</th>
                            <th scope="col">회원번호</th>
                            <th scope="col">상품</th>
                            <th scope="col">결제금액</th>
                            <th scope="col">주문상태</th>
                            <th scope="col">상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="od in orderList" v-bind:key="od">
                            <th scope="row">{{ od.order_no }}</th>
                            <td>{{ getDateFormat(od.order_date) }}</td>
                            <td>{{ od.user_no }}</td>
                            <td v-if="od.cnt > 1">{{ od.prod_name }} 외 {{ od.cnt -1}} 건</td>
                            <td v-else>{{ od.prod_name}}</td>
                            <td>{{ getNumberFormat(od.pay_price) }}</td>
                            <td v-if="od.order_status === 'D1'" @click="statusBtn(od.order_no)"><button class="btn btn-primary btn-sm">결제완료</button></td>
                            <td v-else-if="od.order_status === 'D4'">상품준비중</td>
                            <td><button type="button" class="btn btn-primary btn-sm" @click="orderInfo(od.order_no, od.order_status)">조회</button></td>
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
            orderList: [],
            page: {},
            pageUnit: 5,
            order_status: 'D1',

            Categorys: [
                {category_code: 'D1', category_name: '결제완료', seqs: 1},
                {category_code: 'D4', category_name: '상품준비중', seqs: 2}
            ],
            name: '',
            date1: '',
            date2: '',
            category: '',
        }
    },
    created() {
        this.goPage(1);
        
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminOrder?from=order&pageUnit=${this.pageUnit}&page=${page}&name=${this.name}&date1=${this.date1}&date2=${this.date2}&category=${this.category}`)
            .then(result => {
                console.log(result.data)
                this.orderList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
            .catch(err => console.log(err))
        },
        prodSearchBtn(){
            this.goPage(1);
        },
        resetBtn(){
            this.$refs.reset_com.test2();
            this.goPage(1);
        },
        statusBtn(no){
            axios.post(`/api/adminOrder/Preparing/${no}`)
            .then(() =>{
                this.goPage(1);
            })
            .catch(err => console.log(err))
        },
        searchfrom(name, date1, date2, category){
            this.name = name;
            this.date1 = date1;
            this.date2 = date2;
            this.category = category;
        },
        orderInfo(orderNo, state){
            console.log(orderNo);
            this.$router.push({path: 'ordersInfo', query: {bno: orderNo, orderStatus: state}})
        },
        getDateFormat (date ){
 	        return this .$dateFormat (date );
 	    },
        getNumberFormat (number ){
            return this .$numberFormat (number );
        }
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>