<template>
    <div id="mypage">
        <h5 id="mypage-sub">후기 작성 상품</h5>
        <div class="review-card">
            <img src="path/to/your/image.jpg" alt="Product Image" class="product-image">
            <div class="product-info">
                <p>상품명: 동결건조 캔디 50g</p>
                <p>상품가: 3,000원</p>
                <p>구매일: 2024-06-11</p>
            </div>
            <div class="review-buttons">
                <button class="btn btn-primary btn-sm">후기작성</button>
            </div>
        </div>
        <div class="review-card">
            <img src="path/to/your/image.jpg" alt="Product Image" class="product-image">
            <div class="product-info">
                <p>상품명: 동결건조 캔디 50g</p>
                <p>상품가: 3,000원</p>
                <p>구매일: 2024-06-11</p>
            </div>
            <div class="review-buttons">
                <button class="btn btn-primary btn-sm">후기조회</button>
                <button class="btn btn-primary btn-sm">후기수정</button>
                <button class="btn btn-primary btn-sm">후기삭제</button>
            </div>
        </div>
        <paging-component v-bind="page" @go-page="goPage" />
    </div>
</template>

<script>
import axios from 'axios';
import PagingComponent from '@/components/Paging.vue'
import Paging from "../../mixin";
export default {
    data() {
        return {
            reviews: []
        }
    },
    created() {
        this.goPage(1)
    },
    methods: {
        goPage(page) {
            axios.get(`/api/mypage/reviewlist?pageUnit=${this.pageUnit}&page=${page}`)
                .then(result => {
                    console.log(result)
                    this.qnaList = result.data.result;
                    this.page = page;
                    this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.review-card {
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-card:nth-child(1) {
    border: 1px solid #00f;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
}

.product-info {
    flex: 1;
}

.product-info p {
    margin: 5px 0;
}

.review-buttons {
    display: flex;
    flex-direction: column;
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