<template>
    <div id="mypage">
        <div class="page-body" v-if="orderList.length > 0 && codes.OrderStatus">
            <h5 id="mypage-sub">주문내역</h5>
            <div v-if="orderList.length > 0">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v, i) in orderList">
                            <td>{{ v.order_no }}</td>
                            <td>{{ formatDate(v.order_date) }}</td>
                            <td v-if="v.cnt > 0">{{ v.prod_name }} 외 {{ v.cnt - 1 }}</td>
                            <td v-else>{{ v.prod_name }}</td>
                            <td>{{ numberFormat(v.pay_price) }}원</td>
                            <td>{{ getCodeMeaning(v.order_status) }}</td>
                            <td>
                                <button class="btn btn-primary btn-sm"
                                    @click="orderInfoHandler(v.order_no)">주문상세</button>
                            </td>
                            <td>
                                <button v-if="v.order_status == 'D1'" class="btn btn-primary btn-sm"
                                    @click="applyOrderCancel(v.order_no)">주문취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <paging-component v-bind="page" @go-page="goPage" />
            </div>
            <div v-else>
                <p>주문 내역이 없습니다.</p>
            </div>
        </div>
        <form action="/api/mypage/orderinfo/" method="post">
            <input type="hidden" name="userid" id="userid">
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import PagingComponent from '@/components/Paging.vue'
import Paging from "../../mixin";
export default {
    mixins: [Paging],
    components: {
        PagingComponent
    },
    data() {
        return {
            orderList: [],
            codes: {},
            page: {},
            pageUnit: 10,
        }
    },
    created() {
        axios.get('/api/common/codes')
            .then(response => {
                this.codes = response.data;
                console.log(response.data)
            })
            .catch(error => {
                console.error('API 호출 중 오류:', error);
            });
        this.goPage(1);
        // axios.get(`/api/mypage/orderinfo/` + this.userid)
        //     .then((result) => {
        //         console.log(result.data);
        //         this.orderList = result.data;
        //     })
    },
    methods: {
        goPage(page) {
            axios.get(`/api/mypage/orderinfo/?pageUnit=${this.pageUnit}&page=${page}`)
                .then(result => {
                    console.log(result)
                    this.orderList = result.data.result;
                    this.page = page;
                    this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
                })
                .catch(err => console.log(err));

        },
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
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        orderInfoHandler: function (no) {
            this.$router.push({ name: 'orderdetailinfo', query: { no: no } })
        },
        getCodeMeaning(code) {
            if (this.codes) {
                console.log("OrderStatus 객체:", this.codes.OrderStatus);
                return this.codes.OrderStatus[code] || code; // 코드에 맞는 의미 있는 문자열 반환
            }
            console.error(`Code meaning not found for code: ${code}`);
            return code; // 또는 적절한 기본값을 반환
        },
        applyOrderCancel: function (no) {
            axios.patch(`/api/mypage/ordercancel/` + Number(no))
                .then((result) => {
                    console.log(result.data);
                    axios.post(`/api/mypage/ordercancel/` + Number(no))
                        .then((result) => {
                            console.log(result.data)
                            this.goPage(1);
                        })
                })
                .catch(err => console.log(err))
        }

    },
    mounted() {

    }
}
</script>
<style>
#mypage-sub {
    width: 100%;
    text-align: left;
    margin-left: 15px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 24px;
    color: #555;
    padding: 20px 0;
    border-bottom: 2px solid #ddd;
}

/* 페이지 컨테이너 스타일 */
#mypage {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
    max-width: 1200px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
</style>
<style scoped>
/* #mypage-sub {
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
} */

/* 기본 스타일 설정 */

/* 페이지 제목 스타일 */
/* #mypage-sub {
    width: 100%;
    text-align: left;
    margin-left: 15px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 24px;
    color: #555;
    padding: 20px 0;
    border-bottom: 2px solid #ddd;
} */

/* 페이지 컨테이너 스타일 */
#mypage {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
    max-width: 1200px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

/* 테이블 스타일 */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

table thead {
    background-color: #f0f0f0;
}

table th,
table td {
    padding: 12px 15px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

table th {
    font-weight: bold;
    color: #333;
}

table tbody tr:hover {
    background-color: #f9f9f9;
}

/* 버튼 스타일 */
.btn {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin: 5px 0;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c82333;
}

.btn-success {
    background-color: #28a745;
    color: #fff;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-sm {
    padding: 6px 10px;
    font-size: 12px;
}
</style>