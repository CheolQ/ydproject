<template>
    <div id="mypage">
        <h3 id="mypage-sub">문의상세</h3>
        <div id="qna-detail">
            <div class="product-info">
                <img :src="`/img/prodImg/${qna.main_img}`" alt="Product Image" class="product-img">
                <div class="product-details">
                    <p>상품명: {{ qna.prod_name }}</p>
                    <p>상품가격: {{ numberFormat(qna.prod_price) }}원</p>
                </div>
            </div>
            <div class="question-details">
                <h4>{{ qna.title }}</h4>
                <p>Date: {{ new Date(qna.create_date).toLocaleDateString() }}</p>
                <p>{{ qna.content }}</p>
            </div>
            <div v-if="qna.reply_create_date != null" class="question-details">
                <h4>답변</h4>
                <p>Date: {{ new Date(qna.reply_create_date).toLocaleDateString() }}</p>
                <p>{{ qna.reply_content }}</p>
            </div>
        </div>
        <div class="buttons">
            <button class="btn border border-secondary rounded-pill px-3 text-primary"
                v-if="qna.reply_create_date == null" @click="editQna">수정</button>
            <button class="btn border border-secondary rounded-pill px-3 text-primary"
                v-if="qna.reply_create_date == null" @click="deleteQna">삭제</button>
            <button class="btn border border-secondary rounded-pill px-3 text-primary" @click="goBack">돌아가기</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            no: 0,
            qna: {}
        }
    },
    created() {
        this.no = this.$route.query.no;
        axios.get(`/api/mypage/qnainfo/${this.no}`)
            .then(result => {
                this.qna = result.data[0];
            })
    },
    methods: {
        numberFormat(number) {
            if (number == 0)
                return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
        },
        editQna() {
            this.$router.push({
                name: 'qna',
                query: { no: this.qna.prod_no, qna: JSON.stringify(this.qna) }
            });
        },
        deleteQna() {
            // 삭제 로직 구현
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/mypage/deleteqna/${this.no}`)
                        .then(result => {
                            console.log('삭제완료');
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            this.$router.go(-1);
                        })
                        .catch(err => console.log(err));
                }
            });

        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
/* 기존 페이지 컨테이너 스타일 */
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

#qna-detail {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans KR', sans-serif;
}

#qna-detail {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans KR', sans-serif;
}

.product-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    /* 간격 줄이기 */
}

.product-img {
    width: 100px;
    /* 크기 조정 */
    height: 100px;
    /* 크기 조정 */
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
    /* 간격 줄이기 */
}

.product-details {
    flex-grow: 1;
    text-align: right;
    /* 오른쪽 정렬 */
}

.product-details p {
    margin: 0 0 5px 0;
    /* 간격 줄이기 */
    font-size: 16px;
    color: #333;
}

.question-details {
    border-top: 1px solid #ddd;
    padding-top: 20px;
}

.question-details h4 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #555;
    text-align: left;
    /* 제목 좌측 정렬 */
}

.question-details p {
    margin: 10px 0;
    font-size: 14px;
    color: #666;
    text-align: left;
    /* 좌측 정렬 */
}

.buttons {
    justify-content: space-around;
    margin-top: 20px;
}

.buttons button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin: 0px 10px 0px 10px;
}

.buttons button:hover {
    background-color: #f0f0f0;
}
</style>