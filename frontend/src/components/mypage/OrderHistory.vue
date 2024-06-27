<template>
    <div id="mypage">
        <div class="page-body">
            <h5 id="mypage-sub">주문내역</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>주문일</th>
                        <th>상품명</th>
                        <th>결제금액</th>
                        <th>주문처리상태</th>
                        <th>주문상세</th>
                        <th>주문취소</th>
                        <th>재구매</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, i) in orderList">
                        <td>{{ v.order_no }}</td>
                        <td>{{ v.order_date }}</td>
                        <td v-if="v.cnt > 0">{{ v.prod_name }} 외 {{ v.cnt - 1 }}</td>
                        <td v-else>{{ v.prod_name }}</td>
                        <td>{{ v.pay_price }}원</td>
                        <td>{{ v.order_status }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="orderInfoHandler(v.order_no)">주문상세</button>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm">주문취소</button>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm">재구매</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userid: 'user1',
            orderList: []
        }
    },
    created() {
        axios.get(`/api/mypage/orderinfo/` + this.userid)
            .then((result) => {
                console.log(result.data);
                this.orderList = result.data;
                for (let v of this.orderList) {
                    v.pay_price = this.numberFormat(v.pay_price)
                }
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
        orderInfoHandler: function (no) {
            this.$router.push({ name: 'orderdetailinfo', query: { no: no } })
        }

    }
}
</script>

<style>
#mypage-sub {
    width: 100%;
    text-align: left;
    margin-left: 15px;
    font-family: 'Noto Sans KR', sans-serif;
}

#mypage {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
}

#mypage .page-body {
    padding-top: 60px
}

table {
    font-family: 'Noto Sans KR', sans-serif;
}
</style>