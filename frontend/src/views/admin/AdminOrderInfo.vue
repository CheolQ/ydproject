<template>
    <div>
        <ContentHeader title="주문 상세"></ContentHeader>
        <div v-for="u in userInfo" :key="u">
            <div class="card mb-4">
                <div class="card-body shadow">
                    <div>주문자 정보</div>
                    <div>이름 : {{ u.name }}</div>
                    <div>연락처 : {{ u.tel }}</div>
                    <div>이메일 : {{ u.email }}</div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body shadow">
                    <div>받는사람 정보</div>
                    <div>이름 : {{ u.name1 }}</div>
                    <div>연락처 : {{ u.tel1 }}</div>
                    <div>받는 주소 : {{ u.address }}</div>
                </div>
            </div>
            <div class="card mb-4" v-if="Status === 'D4'">
                <div class="card-body shadow">
                    <div>주문상태</div>
                    <br> 
                    <select v-model="orderStatus" class="form-select" aria-label="Default select example">
                        <option value="D4">상품준비중</option>
                        <option value="D5">배송중</option>
                    </select>
                </div>
            </div>
            <div class="card mb-4" v-if="Status === 'D5' || Status === 'D6'">
                <div class="card-body shadow">
                    <p class="text-start" v-if="Status === 'D5'">출발날짜 : {{ formatDate(u.deli_date) }}</p>
                    <p class="text-start" v-if="Status === 'D6'">도착날짜 : {{ formatDate(u.deli_date) }}</p>
                </div>
            </div>
            <div class="card mb-4" v-if="Status === 'D2' || Status === 'D3'">
                <div class="card-body shadow">
                    <p>주문취소 등록일 : <span v-if="cancel.cal_up">{{ formatDate(cancel.cal_up) }}</span></p>
                    <p>주문취소 신청일 : {{ formatDate(cancel.cal_at) }}</p>
                </div>
            </div>          
            <div class="card mb-4" v-if="Status === 'D4'  || Status === 'D5' || Status === 'D6'">
                <div class="card-body shadow">              
                    <div class="input-group mb-3">
                        
                        <span class="input-group-text" id="basic-addon1">운송장 번호</span>
                        <input type="text" v-model="u.deli_code" class="form-control" placeholder="number" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <button type="button" v-if="Status === 'D4'" class="btn btn-primary" @click="addCode">입력</button>
                </div>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div>상품</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">이미지</th>
                            <th scope="col">상품명</th>
                            <th scope="col">상품가격</th>
                            <th scope="col">수량</th>
                            <th scope="col">총가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in prodInfo" :key="p">
                            <th scope="row"><img :src="`/img/prodImg/${p.main_img}`" style="width: 90px; height: 90px;"></th>
                            <td>{{ p.prod_name }}</td>
                            <td>{{ getNumberFormat(p.prod_price) }}</td>
                            <td>{{ p.cnt }}</td>
                            <td>{{ getNumberFormat(p.prod_price * p.cnt) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Paging from "../../mixin";
import axios from 'axios';
import ContentHeader from '@/components/admin/ContentHeader.vue'
export default{
    mixins : [Paging],
    components: {
            ContentHeader
        },
    data() {
        return {
            orderNo : {no: 1},
            userInfo : [],
            prodInfo : [],
            orderStatus: 'D4',
            Status: '',
            cancel: {}, 
        }
    },
    created(){
        this.orderNo.no = this.$route.query.bno;
        this.Status = this.$route.query.orderStatus;
        axios.post('/api/adminOrder',this.orderNo)
        .then(result => {
            console.log(result.data.list1)
            this.userInfo = result.data.list1;
            console.log(result.data.list2)
            this.prodInfo = result.data.list2;
            this.order_status = result.data.list1[0].order_status;
            this.cancel = result.data.list3[0];
            console.log(this.cancel);
        })
        .catch(err => console.log(err))
    },
    methods: {
        addCode(){
            if(!this.userInfo[0].deli_code){
                alert('운송장 번호를 입력하세요');
                return;
            }
            if(this.orderStatus === 'P'){
                alert('주문상태를 변경하세요');
                return;
            }
            axios.put('/api/adminOrder', {no: this.orderNo.no, orderStatus: this.orderStatus, deilCode: this.userInfo[0].deli_code})
            .then(result => {
                console.log(result);
                alert('운송장 번호가 입력 되었습니다')
                this.$router.push({path : '/admin/orders'})
            })
            .catch(err=> console.log(err))
        },
        getNumberFormat (number ){
            return this .$numberFormat (number );
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

    }
}
</script>               
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>