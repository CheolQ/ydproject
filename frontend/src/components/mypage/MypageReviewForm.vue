<template>
    <div>
        <div class="review-container">
            <h5 id="mypage-sub">후기작성</h5>
            <div class="product-info" @click="goToDetail(prod.prod_no)">
                <img :src="`/img/prodImg/${prod.main_img}`" alt="Product Image" class="product-img">
                <div class="product-details">
                    <p>상품명: {{ prod.prod_name }}</p>
                    <p>상품가격: {{ numberFormat(prod.prod_price) }}원</p>
                </div>
            </div>
            <hr>
            <form>
                <div class="form-group">
                    <label for="title">제목</label>
                    <input type="text" id="title" name="title" v-model="review.review_title" required>
                </div>
                <div class="form-group">
                    <label for="rating">평점</label>
                    <div class="rating">
                        <input type="radio" id="star5" name="rating" value="5" v-model.number="review.rating"
                            required><label for="star5">★</label>
                        <input type="radio" id="star4" name="rating" value="4" v-model.number="review.rating"
                            required><label for="star4">★</label>
                        <input type="radio" id="star3" name="rating" value="3" v-model.number="review.rating"
                            required><label for="star3">★</label>
                        <input type="radio" id="star2" name="rating" value="2" v-model.number="review.rating"
                            required><label for="star2">★</label>
                        <input type="radio" id="star1" name="rating" value="1" v-model.number="review.rating"
                            required><label for="star1">★</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="content">문단</label>
                    <textarea id="content" name="content" rows="5" v-model="review.review_content" required></textarea>
                </div>
                <div class="form-group">
                    <label for="files">첨부파일</label>
                    <input type="file" id="files" @change="handleFileUpload" multiple>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary"
                        @click="insertReviewHandler">등록</button>
                    <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary"
                        @click="goBack">취소</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
export default {
    data() {
        return {
            // isEdit: false // 나중에 입력 수정 같이 쓸때 이용
            review: {
                rating: 0
            },
            files: [],
            no: 0,
            prod: {}

        }
    },
    created() {
        // order_no
        // console.log(this.$route.query.orderno);
        // order_detail_no
        // console.log(this.$route.query.orderdetailno);
        this.review.order_no = Number(this.$route.query.orderno);
        this.review.order_detail_no = Number(this.$route.query.orderdetailno);
        this.review.prod_no = Number(this.$route.query.prodno);
        this.review.user_id = this.$route.query.id;

        axios.get(`/api/shop/${this.review.prod_no}`)
            .then(result => {
                this.prod = result.data[0];
            })
    },
    methods: {
        insertReviewHandler: function () {
            if (!this.review.review_title || !this.review.rating || !this.review.review_content) {
                alert('제목, 평점, 내용은 필수 입력 항목입니다.');
                return;
            }
            this.review.rating = Number(this.review.rating);
            let temp = { ...this.review }
            axios.post(`/api/mypage/insertreview`, temp)
                .then(result => {
                    // 파일 데이터가 있는 경우 파일 데이터를 전송
                    console.log(this.files)
                    if (this.files.length > 0) {
                        let formData = new FormData();
                        this.files.forEach((file, idx) => {
                            formData.append(`files`, file);
                        });
                        console.log(formData)
                        axios.get(`/api/mypage/getreviewno/${this.review.order_detail_no}`)
                            .then(result => {
                                axios.post('/api/mypage/review/uploadfiles', formData, {
                                    params: { table_no: result.data[0].review_no, division: 'E2' }
                                })
                                    .then(result => {
                                        Swal.fire({
                                            icon: "success",
                                            title: "등록완료",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        this.resetForm();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        alert('파일 업로드 실패')
                                    });
                            })

                    } else {
                        this.resetForm();
                    }
                    Swal.fire({
                        icon: "success",
                        title: "등록완료",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.goBack();
                })
                .catch(err => { console.log(err) })
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

        handleFileUpload(e) {
            Array.from(e.target.files).forEach(file => {
                this.files.push(file);
            })
        },
        resetForm() {
            this.review = {
                review_title: '',
                rating: '',
                review_content: ''
            };
            this.files = [];
        },
        confirm: function () {
            this.review.rating = Number(this.review.rating);
            console.log(this.review)
        },
        goBack() {
            this.$router.go(-1);
        },
        async goToDetail(no) {
            await this.$router.push({ name: "shopinfo", query: { no: no } });
        }


    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
}

.review-container {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
    max-width: 1200px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

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

h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

form {
    margin-top: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="file"],
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    gap: 5px;
}

.rating input[type="radio"] {
    display: none;
}

.rating label {
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
}

.rating input[type="radio"]:checked~label {
    color: #ffcc00;
}

.rating label:hover,
.rating label:hover~label {
    color: #ffcc00;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
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
</style>