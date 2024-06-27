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
                        <td>{{ v.prod_price }}원</td>
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
            {{ delInfo }}
        </div>
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
                for (let v of this.orderDetailList) {
                    v.prod_price = this.numberFormat(v.prod_price)
                }
                console.log(result.data[0].order_date)
                this.orderDate = result.data[0].order_date;
                this.orderDate = this.getDateFormat(this.orderDate)
            })
        axios.get(`/api/mypage/orderdetaildelinfo/` + this.no)
            .then(result => {
                console.log(result)
                this.delInfo = result.data[0]
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
</style>