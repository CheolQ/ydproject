<template>
    <div>
        <div class="review-container">
            <h2>상품후기</h2>
            <p>상품후기 게시판입니다.</p>
            <form>
                <div class="form-group">
                    <label for="title">제목</label>
                    <input type="text" id="title" name="title" v-model="review.review_title">
                </div>
                <div class="form-group">
                    <label for="rating">평점</label>
                    <div class="rating">
                        <input type="radio" id="star5" name="rating" value="5" v-model="review.rating"><label
                            for="star5">★</label>
                        <input type="radio" id="star4" name="rating" value="4" v-model="review.rating"><label
                            for="star4">★</label>
                        <input type="radio" id="star3" name="rating" value="3" v-model="review.rating"><label
                            for="star3">★</label>
                        <input type="radio" id="star2" name="rating" value="2" v-model="review.rating"><label
                            for="star2">★</label>
                        <input type="radio" id="star1" name="rating" value="1" v-model="review.rating"><label
                            for="star1">★</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="content">문단</label>
                    <textarea id="content" name="content" rows="5" v-model="review.review_content"></textarea>
                </div>
                <div class="form-group">
                    <label for="file1">첨부파일1</label>
                    <input type="file" id="file1" name="file1" @change="fileHandler(1)">
                </div>
                <div class="form-group">
                    <label for="file2">첨부파일2</label>
                    <input type="file" id="file2" name="file2" @change="fileHandler(2)">
                </div>
                <div class="form-actions">
                    <button type="submit">등록</button>
                    <button type="reset">취소</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // isEdit: false // 나중에 입력 수정 같이 쓸때 이용
            review: {},
            files: [],

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style scope>
body {
    font-family: Arial, sans-serif;
}

.review-container {
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
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
    justify-content: flex-start;
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

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"] {
    background-color: #007bff;
    color: white;
}

button[type="reset"] {
    background-color: #6c757d;
    color: white;
}
</style>