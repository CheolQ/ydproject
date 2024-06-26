<template>
    <!-- <헤더이름> -->
    <div class="cointainer">
        <div>
            <label for="user_id">아이디</label>
            <input type="text" id="user_id" v-model="joinuser.user_id" required />
        </div>
        <div>
            <label for="user_pw">비밀번호</label>
            <input type="password" id="user_pw" v-model="joinuser.user_pw" />
        </div>
        <div>
            <label for="password2">비밀번호 확인</label>
            <input type="password" id="password2" v-model="password2" />
        </div>
        <div>
            <label for="name">이름</label>
            <input type="text" id="joinuser.name" v-model="joinuser.name" />
        </div>
        <div>
            <label for="post">우편주소</label>
            <input type="text" id="post" v-model="post" />
        </div>
        <div>
            <label for="address">주소</label>
            <input type="text" id="post" v-model="post" />
        </div>
        <div>
            <label for="address">상세주소</label>
            <input type="text" id="post" v-model="post" />
        </div>
        <div>
            <label for="tel">휴대폰번호</label>
            <input type="number" id="joinuser.tel" v-model="joinuser.tel" />
        </div>
        <!-- <푸터이름> -->
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() { return {}; },
    created() { },
    methods: {},
}
</script>
<style></style>