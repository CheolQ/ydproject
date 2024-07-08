<template>
    <div id="mypage">
        <h3 id="mypage-sub">후기상세</h3>
        <div id="qna-detail">
            <div class="product-info">
                <img :src="`/img/prodImg/${prodInfo.main_img}`" class="product-img" alt="Product Image">
                <div class="product-details">
                    <p>상품명: {{ prodInfo.prod_name }}</p>
                    <p>상품가격: {{ numberFormat(prodInfo.prod_price) }}원</p>
                </div>
            </div>
            <div class="question-details">
                <h4>{{ reviewInfo.review_title }}</h4>
                <p>Date: {{ new Date(reviewInfo.create_date).toLocaleDateString() }}</p>
                <span style="float: left" v-if="reviewInfo.rating != undefined">
                <i :key = "i" v-for="i in reviewInfo.rating" class="fa fa-star text-secondary"></i>
                <i :key = "i" v-for="i in 5- reviewInfo.rating"class="fa fa-star"></i>
                </span>
                <div v-if="reviewImg != undefined">  
                <img :src="`/api/upload/review/${reviewImg.file_name}`" class="product-img" alt="Product Image">
            </div>
            <br>
                <p>{{ reviewInfo.review_content }}</p>
            </div>
        </div>
        <div class="buttons">
            <button @click="goBack">목록</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props : ['no', 'prodNo'],
    data() {
        return {
            //no: '',
            reviewInfo: {},
            //prodNo : '',
            prodInfo: {},
            reviewImg:{}
        }
    },
    created() {
        //this.no = this.$route.query.no;
        //this.prodNo = this.$route.query.prodNo;
        this.getReviewInfo();
        this.getProdInfo();
        this.getReviewImg();

    },
    methods: {
        async getReviewInfo()	{
            console.log('aaa')
            this.reviewInfo = 
            (await axios.get(`/api/shop/reviewinfo/${this.no}`)).data[0];
            console.log(this.reviewInfo,'reivewinfo')
        },
        async getReviewImg()	{
            console.log('aaa')
            this.reviewImg = 
            (await axios.get(`/api/shop/reviewinfoimg/${this.no}`)).data[0];
            console.log(this.reviewInfo,'imgreivewinfo')
            console.log(this.reviewImg,'i사진있니mgreivewinfo')

        },
        async getProdInfo()	{
            this.prodInfo = 
            (await axios.get(`/api/shop/${this.prodNo}`)).data[0];
        },
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
        goBack() {
            //this.$router.go(-1);
            this.$emit('goToList');
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