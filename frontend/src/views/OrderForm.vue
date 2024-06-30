<template>
    <!-- Checkout Page Start -->
    <div class="container-fluid py-5">
        <div class="container py-5">
            <h2 class="aside-tit">ORDER FORM</h2>
            <form action="#">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7">
                        <div class="form-item">
                            <label class="form-label my-3">Name<sup>*</sup></label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Phone<sup>*</sup></label>
                            <input type="tel" class="form-control" id="phone" v-model="phone">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Email<sup>*</sup></label>
                            <input type="email" class="form-control" id="email" v-model="email">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Address<sup>*</sup></label>
                            <input type="text" class="form-control" v-model="address" placeholder="House Number Street Name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                            <input type="text" v-model="pCode" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-5">
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
                            <div id="discount">주문금액
                                <input readonly v-model="totalPrice">
                            </div>
                            <div class="mt-5">
                                <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4"
                                    placeholder="사용할 적립금">
                                <button @click="points" class="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                    type="button">POINT</button>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Payments-1"
                                        name="Payments" value="Payments">
                                    <label class="form-check-label" for="Payments-1">Check Payments</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                            <button type="button" @click="payments"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place
                                Order</button>
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

    export default {
        data(){
            return{
                selectedCart : [],
                totalPrice : 0,
                name : '',
                phone : '',
                email : '',
                address : '',
                pCode : ''
            };
        },
        created() {
            // const queryCart = this.$route.query.Cart;
            const queryCart = JSON.stringify(this.$store.state.cart);
            console.log(queryCart)
            console.log(this.$store.state.cart);
            console.log(queryCart);
            if (queryCart) {
                this.selectedCart = JSON.parse(queryCart);
            }
        },
        mounted(){
            this.discount();
        },
        methods : {
            payments(){
                const IMP = window.IMP; 
                IMP.init(''); // 'your-imp-key'를 실제 포트원 키로 변경
    
                // 주문번호 생성
                const today = new Date();
                const hours = today.getHours(); 
                const minutes = today.getMinutes();  
                const seconds = today.getSeconds();  
                const milliseconds = today.getMilliseconds();
                const makeMerchantUid = `${hours}${minutes}${seconds}${milliseconds}`;
                console.log(this.selectedCart, '확인!');
                let prodname = '';
                let prodno = '';
                let count = [];
                this.selectedCart.forEach(function(a, index) {
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
                    amount: this.totalPrice,
                    name: prodname,
                    buyer_name: this.name,
                    buyer_tel: this.phone,
                    buyer_email: this.email,
                    buyer_addr: '서울특별시 강남구 삼성동',
                    buyer_postcode: '123-456'
                };

                    // 결제 요청
                    IMP.request_pay(data, rsp => {
                    if (rsp.success) {
                        // 결제 성공 시 로직
                        alert('결제가 완료되었습니다.');
                        console.log(rsp)
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
                            detail_addr: '상세주소',
                            paidAmount: paidAmount,
                            merchantUid: merchantUid,
                            products: prodNo.map((no, index) => ({
                                prod_no: no,
                                cnt: cnt[index]
                            }))
                        };
                        console.log(orderData, '체크')
                        axios.post("/api/order", orderData)
                        .then(result => {
                            console.log(result);
                            if(result.data.dtCount.length > 0){
                                this.$router.push({
                                    name : 'orderSuccess',
                                    query : {dtCount : JSON.stringify(result.data.dtCount) }
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
                let point = 100
                this.totalPrice -= point;
            },
            formatPrice(price) {
                return price.numberFormat();
            },
            }
        }
</script>
<style>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}
</style>