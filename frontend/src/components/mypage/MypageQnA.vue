<template>
    <div id="mypage">
        <h5 id="mypage-sub">문의내역</h5>
        <div class="user-message">{{ loggedInUserId }}님께서 작성하신 게시글 내역입니다.</div>
        <div v-if="qnaList.length > 0">
            <table class="table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>답변상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="v in qnaList" @click="qnaInfoHandler(v.board_no)">
                        <td>{{ v.board_no }}</td>
                        <td>{{ v.title }}</td>
                        <td>{{ formatDate(v.create_date) }}</td>
                        <td v-if="v.reply_no != null">답변 완료</td>
                        <td v-else>답변 대기중</td>
                    </tr>
                </tbody>
            </table>
            <paging-component v-bind="page" @go-page="goPage" />
        </div>
        <div v-else>
            <p>문의 내역이 없습니다.</p>
        </div>
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
            // userid: this.$store.state.user[0].user_id,
            qnaList: [],
            page: {},
            pageUnit: 10,
        }
    },
    created() {
        // axios.get(`/api/mypage/qnalist/${this.userid}`)
        //     .then(result => {
        //         console.log('aa')
        //         console.log(result.data);
        //         this.qnaList = result.data;
        //     })
        this.goPage(1);
    },
    computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
    },
    methods: {
        goPage(page) {
            axios.get(`/api/mypage/qnalist?pageUnit=${this.pageUnit}&page=${page}`)
                .then(result => {
                    console.log(result)
                    this.qnaList = result.data.result;
                    this.page = page;
                    this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
                })
                .catch(err => console.log(err));

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
        qnaInfoHandler: function (no) {
            console.log(no);
            this.$router.push({ name: 'mypageqnainfo', query: { no: no } })
        }
    }
}
</script>

<style></style>
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

/* 사용자 메시지 스타일 */
.user-message {
    text-align: right;
    margin-bottom: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color: #333;
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
    /* background-color: #007bff; */
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