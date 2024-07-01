<template>
    <div class="container">
        <h2 class="aside-tit">회원정보수정</h2>
        <div>
            <label for="id">아이디</label>
            <input type="text" id="username" v-model="form.user_id" readonly>
        </div>
        <div>
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="form.user_pw" />
        </div>
        <div>
            <label for="password2">비밀번호확인</label>
            <input type="password" id="password2" v-model="form.user_pw2" />
        </div>
        <div>
            <label for="name">이름</label>
            <input type="text" id="name" v-model="form.name" />
        </div>
        <div>
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="form.email" />
        </div>
        <div>
            <label for="phone">전화번호</label>
            <input type="tel" id="tel" v-model="form.tel" placeholder="ex) 010-1111-1111" />
        </div>
        <div>
            <label for="postcode">우편번호</label>
            <input type="text" id="postcode" v-model="form.postcode" ref="postcode" />
            <input type="button" @click="showApi" value="검색"><br>
        </div>
        <div>
            <label for="address">주소</label>
            <input type="text" id="roadAddress" v-model="form.address" placeholder="주소" ref="roadAddress" />
        </div>
        <div>
            <label for="detailAddress">상세주소</label>
            <input type="text" id="detailAddress" v-model="form.detail_address" placeholder="상세주소" />
        </div>
        <button class="btn btn-success" @click="">수정</button>
        <router-link to="/user/home">
            <button class="btn btn-warning">취소</button>
        </router-link>
    </div>
</template>
<script>
export default {
    data() { return {}; },
    created() { },
    methods: {},
}
</script>
<style scoped></style>