<template>
    <div class="container">
        <div >
            <label for="user_id">아이디</label>
            <input v-model="form.user_id" placeholder="ID">
            <br>
            <label for="user_pw">비밀번호 </label>
            <input v-model="form.user_pw" type="password" placeholder="PassWord">
            <br>
            <button type="button" @click="loginHandler">로그인</button>
        </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: { user_id: '', user_pw: '' },
        }
    },
    computed: {
        account() {
            return this.$store.state.user.userid
        }
    },
    created() {
        axios.get("/api/account")
            .then(result => {
                this.$store.commit('user', result.data);
            }).catch((err) => { console.log(err) });
    },
    methods: {
        loginHandler() {
            axios.post("/api/login", this.form)
                .then((result) => {
                    if (result.data.success) {
                        this.$store.commit('user', result.data.user);
                        alert('로그인 성공');
                    } else {
                        alert('로그인 실패: ' + result.data.message);
                    }
                })
                .catch((err) => {
                    console.error('로그인 실패:', err);
                    alert('로그인 실패');
                })
        },
        logoutHandler() {
            axios.post("/api/logout")
                .then(() => {
                    this.$store.commit('user', {});
                    alert('로그아웃');
                })
                .catch((err) => {
                    console.error('로그아웃 실패:', err);
                    alert('로그아웃 실패');
                });
        },
    },
}
</script>

