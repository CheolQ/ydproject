<template>
    <div>
        <div class="card mb-4">
            <div class="card-body shadow">주문상세</div>
        </div>
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
            <div class="card mb-4">
                <div class="card-body shadow">
                    <div>주문상태</div>
                    <br> 
                    <select v-model="orderStatus" class="form-select" aria-label="Default select example">
                        <option value="P">결제완료</option>
                        <option value="D5">배송중</option>
                    </select>
                </div>
            </div>    
            <div class="card mb-4">
                <div class="card-body shadow">              
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">운송장 번호</span>
                        <input type="text" v-model="u.deli_code" class="form-control" placeholder="number" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <button type="button" class="btn btn-primary" @click="addCode">입력</button>
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
                            <th scope="row"><img :src="`/img/prodImages/${p.main_img}`" style="width: 90px; height: 90px;"></th>
                            <td>{{ p.prod_name }}</td>
                            <td>{{ p.prod_price }}</td>
                            <td>{{ p.cnt }}</td>
                            <td>{{ p.prod_price * p.cnt }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data() {
        return {
            orderNo : {no: 1},
            userInfo : [],
            prodInfo : [],
            orderStatus: 'P',
        }
    },
    created(){
        this.orderNo.no = this.$route.query.bno;
        axios.post('/api/adminOrder',this.orderNo)
        .then(result => {
            console.log(result.data.list1)
            this.userInfo = result.data.list1;
            console.log(result.data.list2)
            this.prodInfo = result.data.list2;
            this.order_status = result.data.list1[0].order_status;
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
        }
    }
}
</script>               
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>