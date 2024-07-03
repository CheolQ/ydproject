<template>
    <div>
        <div id="mypage">
            <h3 id="mypage-sub">후기상세</h3>
            <div id="review-detail">
                <div class="product-info">
                    <img :src="`/img/prodImg/${review.main_img}`" alt="Product Image" class="product-img">
                    <div class="product-details">
                        <p>상품명: {{ review.prod_name }}</p>
                        <p>상품가격: {{ numberFormat(review.prod_price) }}원</p>
                    </div>
                </div>
                <div class="question-details">
                    <h4>{{ review.review_title }}</h4>
                    <p>Date: {{ getDateFormat(review.create_date) }}</p>
                    <div v-for="v in files">
                        <img :src="`/api/upload/review/${v.file_name}`" alt="">
                    </div>
                    <p>{{ review.review_content }}</p>
                </div>
                <div class="buttons">
                    <button @click="editReview">수정</button>
                    <button @click="deleteReview">삭제</button>
                    <button @click="goBack">돌아가기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            review: {},
            no: 0,
            files: [],
        }
    },
    created() {
        this.no = this.$route.query.no;
        axios.get(`/api/mypage/reviewinfo/${this.no}`)
            .then(result => {
                this.review = result.data[0];
                console.log(this.review)
            })
        axios.get(`/api/mypage/getreviewimg/${this.no}`)
            .then(result => {
                this.files = result.data
                console.log(this.files)
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
        goBack() {
            this.$router.go(-1);
        },
        editReview() {
            this.$router.push({ name: 'mypagereviewform' })
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

#review-detail {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans KR', sans-serif;
}

#review-detail {
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
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.buttons button:hover {
    background-color: #f0f0f0;
}
</style>