<template>
    <div>
        <ContentHeader title="주문상세"></ContentHeader>
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
                            <td v-if="od.order_status === 'D1'" @click="statusBtn(od.order_no)"><button>결제완료</button></td>
                            <td v-else-if="od.order_status === 'D4'">상품준비중</td>
                            <td><button type="button" class="btn btn-primary" @click="orderInfo(od.order_no, od.order_status)">조회</button></td>
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
export default {
    mixins : [Paging],
    components: {
        PagingComponent, ContentHeader
    },
    data() {
        return {
            orderList: [],
            page: {},
            pageUnit: 5,
            order_status: 'D1',
        }
    },
    created() {
        this.goPage(1);
        
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminOrder?pageUnit=${this.pageUnit}&page=${page}&orderStatus=${this.order_status}`)
            .then(result => {
                console.log(result.data)
                this.orderList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
            .catch(err => console.log(err))
        },
        statusBtn(no){
            axios.post(`/api/adminOrder/Preparing/${no}`)
            .then(() =>{
                this.goPage(1);
            })
            .catch(err => console.log(err))
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