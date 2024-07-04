<template>
    <!-- Checkout Page Start -->
    <div class="container-fluid py-5">
        <div class="container py-5">
            <h2 class="aside-tit">ORDER FORM</h2>
            <form action="#">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-6">
                        <div>
                            <label style="font-size: large;">주문자 정보</label>
                        </div>
                        <div class="form-item d-flex justify-content-end align-items-center">
                            <input type="checkbox" class="me-2" @change="resetHandler">
                            <label class="form-label my-3" style="font-size: smaller; margin-top: auto;">새로운 배송지로 설정</label>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">이름<sup style="color: red;">*</sup></label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">연락처<sup style="color: red;">*</sup></label>
                            <input type="tel" class="form-control" id="phone" v-model="phone">

                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">이메일<sup style="color: red;">*</sup></label>
                            <input type="email" class="form-control" id="email" v-model="email">
                            <p v-show="valid.email" class="input-error">이메일 주소를 정확히 입력해주세요.</p>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">우편번호<sup style="color: red;">*</sup></label>
                            <div class="pCode-container">
                                <input type="text" id="pCode" v-model="pCode" class="form-control" placeholder="우편번호" readonly>
                                <input type="button" @click="execDaumPostcode()" value="우편번호 찾기" class="pCode-button">
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">주소<sup style="color: red;">*</sup></label>
                            <input type="text" id="address" v-model="address" class="form-control" placeholder="주소" readonly><br>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">상세주소<sup style="color: red;">*</sup></label>
                            <input type="text" id="detailAddress" v-model="detailAddr" class="form-control" placeholder="상세주소">
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-6">
                        <div>
                            <label style="font-size: large;">상품 정보</label>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="c in selectedCart">
                                            <td scope="row">
                                                <div class="align-items-center">
                                                    <img :src="`/api/upload/${c.main_img}`"
                                                        class="img-fluid me-5 rounded-circle"
                                                        style="width: 90px; height: 90px;">
                                                </div>
                                            </td>
                                            <td>
                                                <p class="mb-0 mt-4">{{ c.prod_name }}</p>
                                            </td>
                                            <td>
                                                <p class="mb-0 mt-4">{{ formatPrice(c.prod_price) }}원</p>
                                            </td>
                                            <td>
                                                <p class="mb-0 mt-4">{{ c.cnt }}</p>
                                            </td>
                                            <td>
                                                <p class="mb-0 mt-4">{{ formatPrice(c.prod_price * c.cnt) }}원</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="text-end">
                                <ul>
                                    <li>주문 금액 <span>{{ formatPrice(totalPrice) }}원</span></li>
                                    <p style="font-size: smaller;">기본 배송비는 2,500원입니다.
                                        <br>50,000원 이상 구매 시 무료배송입니다.
                                        <br>고객님의 배송비는 <b>{{ formatPrice(deliveryCharge) }}원</b>입니다.
                                    </p>
                                </ul>
                            </div>
                            <div>
                                <div class="text-end mt-5">잔여 포인트
                                    <input type="text-end" readonly v-model="point" class="border-0 border-bottom rounded me-5 py-3 mb-4 text-end">
                                    <button @click="points" class="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                        type="button">전액 사용</button>
                                </div>
                                <div id="discount" class="text-end">
                                    <ul>
                                        <li>총 결제 금액 <span>{{ formatPrice(resultPrice) }}원</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Payments-1"
                                        name="Payments" value="Payments">
                                    <label class="form-check-label" for="Payments-1">Check Payments</label>
                                </div>
                            </div>
                        </div> -->
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                            <button type="button" @click="payments"
                                class="btn btn-primary border-0 py-3 px-4 w-100 text-white">KAKAOPAY</button>
                            <!-- <button type="button" @click="payments" 
                                class="btn border-0 py-3 px-4 w-100" 
                                style="background-color: #007bff; color: white;">TOSSPAY</button> -->
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Checkout Page End -->
</template>
<script>
import PortOne from '@portone/browser-sdk/v2';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            selectedCart: [],
            totalPrice: 0,
            resultPrice: 0,
            point: 0,
            usePoint : 0,
            name: '',
            phone: '',
            email: '',
            address: '',
            pCode: '',
            detailAddr: '',
            pointStatus: false, //포인트 안썼을때
            newUserInfo: false, //주문자의 정보가 다를때
            deliveryCharge: 0, //배송비
            valid: {
                        email: false
                    }
        };
    },
    computed: {
        ...mapGetters(['getCartInfo']), // Vuex 게터를 컴포넌트에 매핑
    },
    watch: {
        'email': function() {
            this.checkEmail()
        }
    },
    created() {
        // const queryCart = this.$route.query.Cart;
        this.getUser(); //유저정보 오더폼에 뿌려주기
        const queryCart = JSON.stringify(this.getCartInfo);
        console.log(queryCart)
        console.log(this.getCartInfo);
        // console.log(this.$store.state.cart);
        console.log(queryCart);
        if (queryCart) {
            this.selectedCart = JSON.parse(queryCart);
        }
    },
    mounted() {
        this.discount();
        if(this.totalPrice >= 50000){
            this.deliveryCharge = 0
        }else{
            this.deliveryCharge = 2500
        }
        this.resultPrice = this.totalPrice + this.deliveryCharge;
    },
    methods: {
        getUser(){
            axios.get(`/api/order`) //유저정보 알려줘 이름,연락처,이메일,포인트 등 가져왔어 axios.get().then()//this.result.name
            .then(result => {
                this.name = result.data[0].name;
                this.phone = result.data[0].tel;
                this.email = result.data[0].email;
                this.pCode = result.data[0].postcode;
                this.address = result.data[0].addr;
                this.detailAddr = result.data[0].detail_addr;
                this.point = result.data[0].point;
            })
            .catch(err => console.log(err));
        },
        resetHandler(e){ 
            //console.log(e.target.checked,'체인지')
            if(e.target.checked){
                this.newUserInfo = true; //새로운 배송지 체크했을때
                this.name = '';
                this.phone = '';
                this.email = '';
                this.pCode = '';
                this.address = '';
                this.detailAddr = '';
            }else{
                this.newUserInfo = false;
                this.getUser();
            }
        },
        checkEmail() {
            //이메일 형식 검사
            const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;

            if(!validateEmail.test(this.email) || !this.email){
                this.valid.email = true
                return
            }this.valid.email = false
        },
        inputCheck(){
            if (!this.name) {
                alert('이름을 입력하세요.');
                return false;
            }
            if (!this.phone) {
                alert('연락처를 입력하세요.');
                return false;
            }
            if (!this.email) {
                alert('이메일을 입력하세요.');
                return false;
            }
            if (!this.pCode) {
                alert('우편번호를 입력하세요.');
                return false;
            }
            if (!this.address) {
                alert('주소를 입력하세요.');
                return false;
            }
            if (!this.detailAddr) {
                alert('상세주소를 입력하세요.');
                return false;
            }
            return true;
        },
        execDaumPostcode(){
            new window.daum.Postcode({
                oncomplete: (data) => {
                    //console.log(data,'data는 뭐야')
                    this.address = data.address;
                    this.pCode = data.zonecode;
                    this.detailAddr = data.detailAddr;
                },
            }).open();
        },
        payments() {
            if (!this.inputCheck()){ //위의 input을 다 입력해야 결제로 넘어감
                return; 
            }

            const IMP = window.IMP;
            IMP.init('imp81886801'); // 'your-imp-key'를 실제 포트원 키로 변경

            // 주문번호 생성
            const today = new Date();
            const hours = today.getHours();
            const minutes = today.getMinutes();
            const seconds = today.getSeconds();
            const milliseconds = today.getMilliseconds();
            const makeMerchantUid = `${hours}${minutes}${seconds}${milliseconds}`;
            //console.log(this.selectedCart, '확인!');
            let prodname = '';
            let prodno = '';
            let count = [];
            this.selectedCart.forEach(function (a, index) {
                count.push(a.cnt);
                if (index > 0) {
                    prodname += ','; // 첫 번째 항목이 아닌 경우에만 구분자 추가
                    prodno += ',';
                }
                prodname += a.prod_name;
                prodno += a.prod_no;
            });
            
            // 결제 요청 데이터 설정
            const data = {
                pg: 'kakaopay.TC0ONETIME',
                pay_method: 'card',
                merchant_uid: `merchant_${makeMerchantUid}`,
                //beforeAmount: this.totalPrice,
                amount: this.resultPrice,
                name: prodname,
                buyer_name: this.name,
                buyer_tel: this.phone,
                buyer_email: this.email,
                buyer_addr: this.address,
                buyer_postcode: this.pCode
            };
            console.log(data,'데이터에 뭐가있는지 확인')

            // 결제 요청
            IMP.request_pay(data, rsp => {
                if (rsp.success) {
                    // 결제 성공 시 로직
                    alert('결제가 완료되었습니다.');
                    console.log(rsp,'rsp가 뭐가있는지')
                    //order table
                    let buyerName = rsp.buyer_name;
                    let buyerTel = rsp.buyer_tel;
                    let buyerAdd = rsp.buyer_addr;
                    let paidAmount = rsp.paid_amount;
                    let merchantUid = rsp.merchant_uid;
                    //orderDatail table
                    let prodNo = prodno.split(',');
                    let cnt = count;
                    //let price = [5000,6000,7000]

                    let orderData = {
                        buyerName: buyerName,
                        buyerTel: buyerTel,
                        buyerAdd: buyerAdd,
                        buyerPost: data.buyer_postcode,
                        detail_addr: this.detailAddr, //
                        beforeAmount: this.totalPrice,
                        usePoint: this.usePoint,
                        pointStatus: this.pointStatus,
                        paidAmount: paidAmount,
                        merchantUid: merchantUid,
                        products: prodNo.map((no, index) => ({
                            prod_no: no,
                            cnt: cnt[index]
                        }))
                    };
                    //console.log('프론트에서 확인', orderData)
                    //console.log(orderData, '주소값가져오는지 체크')
                    axios.post("/api/order", orderData)
                        .then(result => {
                            console.log(result);
                            if (result.data.dtCount.length > 0) {
                                this.$router.push({
                                    name: 'orderSuccess',
                                    query: { dtCount: JSON.stringify(result.data.dtCount) }
                                });
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    // 결제 실패 시 로직
                    alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                }
            });
        },
        discount() {
            this.selectedCart.forEach(a => {
                this.totalPrice += Number(a.prod_price * a.cnt);
            });
        },
        points() {
            if (this.point === 0) {
                this.pointStatus = false;
                //현재 포인트가 0일때 원래 포인트로 복구
                this.point = this.usePoint;
                //사용한 포인트를 초기화
                this.usePoint = 0;
                //결제 후 총 금액 업데이트
                this.resultPrice = this.totalPrice - this.usePoint;
            } else {
                //전액 사용 버튼을 다시 클릭했을때 포인트 전액 사용하는거
                this.pointStatus = true;
                this.usePoint = this.point;
                this.point = 0;
                this.resultPrice = this.totalPrice - this.usePoint;
            }
            
        },
        formatPrice(price) {
            return price.numberFormat();
        },
    },
}
</script>
<style scope>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}
ul {
  list-style: none;
}
.text-end ul li {
  font-weight: bold;
  margin: 10px 0;
}
.pCode-container {
    display: flex;
    align-items: center;
}
.pCode-container .form-control {
    flex: 1;
    margin-right: 10px; 
}
.pCode-container .pCode-button {
    padding: 8px 12px; 
    cursor: pointer;
}
</style>