<template>
    <div id="mypage">
        <div class="page-body">
            <h5 id="mypage-sub">주문상세</h5>
            <h6 class="orderNo">{{ orderDate }} &nbsp;&nbsp;|&nbsp;&nbsp; 주문번호 : {{ no }}</h6>
            <hr>
            <h6 class="order-sub">상품정보</h6>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 500px;">상품명</th>
                        <th style="width: 120px;">수량</th>
                        <th style="width: 120px;">가격</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="v in orderDetailList">
                        <td><img :src="`/img/prodImg/${v.main_img}`" alt="" class="img-size">{{ v.prod_name }}</td>
                        <td>{{ v.cnt }}</td>
                        <td>{{ numberFormat(v.prod_price) }}원</td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <h6 class="order-sub">배송정보</h6>
            <div class="tbl_row_wrap" style="" data-delivery-point-zone="">
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 140px;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody data-delivery-point-information="">
                        <tr data-delivery-point-division="100">
                            <th scope="row">기본정보</th>
                            <td>
                                <div class="address_item no_line">
                                    <div class="address_info_box" data-delivery-point-main="">
                                        <div class="address_person">
                                            <span class="name"><span data-delivery-point-name="">{{ delInfo.name
                                                    }}</span>
                                                / </span>
                                            <span class="phone_number" data-delivery-point-cellular-phone-number="">{{
                                                delInfo.tel }}</span>
                                        </div>
                                        <div class="address" data-delivery-point-address="">
                                            [{{ delInfo.postcode }}] {{ delInfo.addr }}<span
                                                v-if="delInfo.detail_addr != ''">, {{ delInfo.detail_addr }}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <h6 class="order-sub">결제정보</h6>
            <div class="payment_info_wrap" id="settlementInfoContents" data-settlement-information="">
                <!-- payment_info_area -->
                <div class="payment_info_area">
                    <div class="payment_total_item">
                        <div class="payment_info_box">
                            <p class="label">주문금액</p>
                            <div class="right_box">
                                <span class="price">
                                    <span class="val">{{ numberFormat(delInfo.order_total_price) }}</span>
                                    <span class="unit">원</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //payment_info_area -->
                <!-- payment_info_area -->
                <div class="payment_info_area">
                    <div class="payment_total_item">
                        <div class="payment_info_box">
                            <p class="label">사용 포인트</p>
                            <div class="right_box">
                                <span class="price">
                                    <span class="val">{{ numberFormat(delInfo.use_point) }}</span>
                                    <span class="unit">P</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul class="payment_info_list">
                    </ul>
                </div>
                <!-- //payment_info_area -->
                <!-- payment_info_area -->
                <div class="payment_info_area">
                    <div class="payment_total_item">
                        <div class="payment_info_box">
                            <p class="label">결제금액</p>
                            <div class="right_box">
                                <span class="price">
                                    <span class="val">{{ numberFormat(delInfo.pay_price) }}</span>
                                    <span class="unit">원</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //payment_info_area -->
            </div>
            <div class="payment_info_wrap" style="" data-accumulation-information-zone=""
                data-accumulation-information="">
                <!-- payment_info_area -->
                <div class="payment_info_area">
                    <div class="payment_total_item">
                        <div class="payment_info_box">
                            <p class="label">포인트 적립 </p>
                            <div class="right_box">
                                <span class="price">
                                    <span class="val">{{ numberFormat(delInfo.point) }}</span>
                                    <span class="unit">P</span>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- //payment_info_area -->
            </div>
            <ul class="bul_list" style="" data-accumulation-information-zone="">
                <li class="bul_item_dot font_size_xxs fc_light_gray">적립금은 결제이후 예상적립금이 안내됩니다.</li>
            </ul>
        </div>
        <button class="btn btn-primary" @click="repurchaseHandler"> 재구매</button>
        <button class="btn btn-primary" @click="moveToOrderHistory"> 주문목록</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            orderDate: '',
            no: 0,
            orderDetailList: [],
            delInfo: {}
        }
    },
    created() {
        console.log(this.$route.query.no)
        this.no = this.$route.query.no
        axios.get(`/api/mypage/orderdetailinfo/` + this.no)
            .then(result => {
                console.log(result)
                this.orderDetailList = result.data;
                // for (let v of this.orderDetailList) {
                //     v.prod_price = this.numberFormat(v.prod_price)
                // }
                console.log(result.data[0].order_date)
                this.orderDate = result.data[0].order_date;
                this.orderDate = this.getDateFormat(this.orderDate)
            })
        axios.get(`/api/mypage/orderdetaildelinfo/` + this.no)
            .then(result => {
                console.log(result)
                this.delInfo = result.data[0]
                // this.delInfo.order_total_price = this.numberFormat(this.delInfo.order_total_price);
                // this.delInfo.pay_price = this.numberFormat(this.delInfo.pay_price);
                // this.delInfo.use_point = this.numberFormat(this.delInfo.use_point);
                // this.delInfo.point = this.numberFormat(this.delInfo.point);
            })
    },
    methods: {
        numberFormat: function (number) {
            if (number == 0)
                return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
        },
        getDateFormat(val) {
            let date = val == '' ? new Date() : new Date(val);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        moveToOrderHistory: function () {
            this.$router.push('orderhistory')
        },
        repurchaseHandler: function () {
            let selectedCart = [];
            this.orderDetailList.forEach(a => {
                selectedCart.push(a);
            });
            this.$store.state.cart = selectedCart;
            console.log(this.$store.state.cart)
            this.$router.push({
                name: 'orderForm',
            });
        }
    }
}
</script>

<style scoped>
#mypage-sub {
    width: 100%;
    text-align: left;
    margin-left: 15px;
    font-family: 'Noto Sans KR', sans-serif;
}

th,
td {
    text-align: left
}

.orderNo {
    height: 50px;
    font-size: 1rem;
    width: 100%;
    line-height: 50px;
    border-radius: 10px;
    text-align: left;
    padding-left: 50px;
    background: rgb(241, 241, 241);
    border: 1px none;

}

.img-size {
    width: 70px;
    margin-right: 10px;
}

.order-sub {
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    text-align: center;
    margin-left: 15px;
    font-family: 'Noto Sans KR', sans-serif;
    border: 1px none;
    background: rgb(241, 241, 241);
}

.tbl_row_wrap {
    font-size: 14px;
    line-height: 1.4;
    font-family: 'Noto Sans KR', sans-serif;
    color: #000;
    display: block;
    width: 100%;
    padding: 18px 0;
    border-top: 1px solid #000;
    border-bottom: 1px solid #eaeaea;
    box-sizing: border-box;
}

.tbl_row {
    font: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    border-spacing: 0;
    border-collapse: collapse;
    border: 0;
    width: 100%;
    table-layout: fixed;
}

.payment_info_wrap {
    font-family: 'Noto Sans KR', sans-serif;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -moz-box-align: start;
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    align-items: stretch;
    padding: 30px 10px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #eaeaea;
    box-sizing: border-box;
}

.payment_info_wrap .payment_info_area {
    display: block;
    position: relative;
    flex: 1 0;
    box-sizing: border-box;
}

.payment_info_wrap .payment_info_area~.payment_info_area {
    margin-left: 30px;
    padding-left: 30px;
}

.payment_info_wrap .payment_info_area~.payment_info_area:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 6px;
    width: 1px;
    height: calc(100% - 12px);
    border-left: 1px dashed #eaeaea;
}

.payment_info_wrap .payment_total_item {
    display: block;
}

.payment_info_wrap .payment_total_item~.payment_total_item {
    margin-top: 20px;
}

.payment_info_wrap .payment_total_item .label {
    display: inline-block;
    position: relative;
    vertical-align: top;
    font-size: 15px;
    line-height: 23px;
    letter-spacing: -0.01em;
    font-weight: 500;
}

.payment_info_wrap .payment_total_item .label.type_link {
    padding-right: 11px;
}

.payment_info_wrap .payment_total_item .label.type_link:after {
    content: "";
    display: block;
    position: absolute;
    top: 6px;
    right: 0;
    width: 5px;
    height: 9px;
    background-repeat: no-repeat;
    background-size: 5px 9px;
}

.payment_info_wrap .payment_total_item .label.type_link:hover,
.payment_info_wrap .payment_total_item .label.type_link:focus,
.payment_info_wrap .payment_total_item .label.type_link:active {
    text-decoration: underline;
}

.payment_info_wrap .payment_total_item .label.type_link+.btn_xxs {
    margin-left: 10px;
}

.payment_info_wrap .payment_total_item .price {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
}

.payment_info_wrap .payment_total_item .price .val,
.payment_info_wrap .payment_total_item .price .unit {
    display: inline-block;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #000;
    vertical-align: top;
}

.payment_info_wrap .payment_total_item .price .val {
    font-weight: 700;
}

.payment_info_wrap .payment_total_item .payment_info_box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
}

.payment_info_wrap .payment_total_item .payment_info_box .right_box {
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 20px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #000;
    box-sizing: border-box;
}

.payment_info_wrap .payment_total_item~.payment_info_list {
    margin-top: 20px;
}

.payment_info_wrap .payment_total_item~.valid_check {
    margin-top: 4px;
}

.payment_info_wrap .payment_info_list {
    display: block;
}

.payment_info_wrap .payment_info_list .payment_info_item {
    display: block;
}

.payment_info_wrap .payment_info_list .payment_info_item~.payment_info_item {
    margin-top: 6px;
}

.payment_info_wrap .payment_info_list .payment_info_item .label {
    display: inline-block;
    vertical-align: top;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #595959;
}

.payment_info_wrap .payment_info_list .payment_info_item .label .btn_xxs {
    margin-top: -3px;
    margin-left: 6px;
}

.payment_info_wrap .payment_info_list .payment_info_item .price {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
}

.payment_info_wrap .payment_info_list .payment_info_item .price .val,
.payment_info_wrap .payment_info_list .payment_info_item .price .unit {
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #595959;
    vertical-align: top;
}

.payment_info_wrap .payment_info_list .payment_info_item .price .val {
    font-weight: 700;
}

.payment_info_wrap .payment_info_list .payment_info_item .payment_method {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.01em;
    color: #000;
    font-weight: 500;
}

.payment_info_wrap .payment_info_list .payment_info_item .info_detail_list {
    display: block;
    padding: 6px 0;
}

.payment_info_wrap .payment_info_list .payment_info_item .info_detail_list .info_detail_item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    position: relative;
    padding-left: 12px;
}

.payment_info_wrap .payment_info_list .payment_info_item .info_detail_list .info_detail_item~.info_detail_item {
    margin-top: 6px;
}

.payment_info_wrap .payment_info_list .payment_info_item .info_detail_list .info_detail_item:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 5px;
    width: 9px;
    height: 9px;
    background-repeat: no-repeat;
    background-size: 9px 9px;
}

.payment_info_wrap .payment_info_list .payment_info_item .info_detail_list .info_detail_item .right_box {
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 20px;
}

.payment_info_wrap .payment_info_list .payment_info_item .payment_info_box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
}

.payment_info_wrap .payment_info_list .payment_info_item .payment_info_box .right_box {
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 20px;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #595959;
}

.payment_info_wrap .payment_info_list .payment_info_item .payment_info_box .right_box .badge_sm {
    margin-right: 6px;
}

.payment_info_wrap .payment_info_list .payment_info_item .payment_info_box+.bul_item_asterisk {
    margin-top: 4px;
}

.payment_info_wrap .payment_info_list .payment_info_item .payment_detail_box {
    display: none;
}

.payment_info_wrap .payment_info_list .payment_info_item.expanded .payment_info_box .btn_fold_payments {
    transform: rotate(180deg);
}

.payment_info_wrap .payment_info_list .payment_info_item.expanded .payment_detail_box {
    display: block;
}

.payment_info_wrap .btn_fold_payments {
    display: inline-block;
    width: 19px;
    height: 19px;
    background-repeat: no-repeat;
    background-size: 19px 19px;
    vertical-align: top;
}

.payment_info_wrap .payment_util_box {
    display: block;
    margin-top: 20px;
    text-align: right;
    font-size: 0;
}

.payment_info_wrap .payment_util_box .btn_xxs~.btn_xxs {
    margin-left: 6px;
}

.payment_info_wrap .pickup_store_area {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
}

.payment_info_wrap .pickup_store_area .pickup_info_text~.btn_xs {
    margin-left: 12px;
}

.payment_info_wrap+.bul_list {
    margin-top: 16px;
}

.payment_info_wrap+.type_myroom {
    margin-top: 70px;
}

.bul_list {
    font-size: 14px;
    line-height: 1.4;
    font-family: "Roboto", "Noto Sans KR", "PingFang SC", "Apple SD Gothic Neo", "Microsoft YaHei UI", "Malgun Gothic", sans-serif;
    color: #000;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: 16px;
}

.bul_item_dot {
    font-family: "Roboto", "Noto Sans KR", "PingFang SC", "Apple SD Gothic Neo", "Microsoft YaHei UI", "Malgun Gothic", sans-serif;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    font-weight: 400;
    text-align: left;
    padding-left: 9px;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #767676;
}
</style>