<template>
    <div id="mypage">
        <h5 id="mypage-sub">포인트내역</h5>
        <div class="user-message">{{ loggedInUserId }}님의 포인트 사용 내역입니다.</div>
        <div>
            <div class="reward-container">
                <h4>보유중인 포인트</h4>
                <table class="reward-table">
                    <thead>
                        <tr>
                            <th>총 보유 포인트</th>
                            <th>{{ numberFormat(totalPoint) }}원</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>내역</th>
                        <th>유형</th>
                        <th>포인트</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="val in pointList">
                        <td v-if="val.points != 0">{{ formatDate(val.order_date) }}</td>
                        <td v-if="val.points != 0 && val.cnt > 0">{{ val.prod_name }} <span v-if="val.cnt > 1">외 {{
                            val.cnt - 1 }}</span>
                        </td>
                        <td v-if="val.points != 0 && val.cnt == 0">{{ val.prod_name }}</td>
                        <td v-if="val.points != 0 && val.point_type == 'earned'">적립</td>
                        <td v-if="val.points != 0 && val.point_type == 'used'">사용</td>
                        <td v-if="val.points != 0 && val.point_type == 'refunded'">취소</td>
                        <td v-if="val.points != 0 && val.points != null && val.point_type == 'used'"> - {{ val.points }}
                        </td>
                        <td v-if="val.points != 0 && val.points != null && val.point_type == 'earned'"> + {{ val.points
                            }}
                        </td>
                        <td
                            v-if="val.points != 0 && val.point_type == 'refunded' && val.points_used_refunded - val.points_refunded > 0">
                            + {{ val.points_used_refunded -
                                val.points_refunded }}</td>
                        <td
                            v-if="val.points != 0 && val.point_type == 'refunded' && val.points_used_refunded - val.points_refunded < 0">
                            - {{ val.points_used_refunded -
                                val.points_refunded }}</td>
                    </tr>
                </tbody>
            </table>
            <paging-component v-bind="page" @go-page="goPage" />
        </div>
        <!-- <div>
            <p>문의 내역이 없습니다.</p>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            totalPoint: 0,
            pointList: []
        }
    },
    created() {
        axios.get(`/api/mypage/point`)
            .then(result => {
                console.log(result.data.result);
                this.totalPoint = result.data.result2[0].point;
                this.pointList = result.data.result;
            })
    },
    computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
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

    }
}
</script>

<style scoped>
#mypage {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
    max-width: 1200px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}


.user-message {
    text-align: right;
    margin-bottom: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color: #333;
}

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

.reward-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.reward-container h4 {
    font-size: 18px;
    color: #333333;
    margin-bottom: 20px;
}

.reward-table {
    width: 100%;
    border-collapse: collapse;
}

.reward-table th {
    padding: 15px;
    background-color: #f5f5f5;
    color: #555555;
    font-size: 18px;
    border: 1px solid #dddddd;
}

.reward-table th:last-child {
    text-align: right;
}
</style>