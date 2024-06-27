<template>
    <div class="container">
        <!-- <div v-if="account">
            {{ account.userid }}
            <button type="button" @click="logoutHandler">로그아웃</button>
        </div> -->
        <h2 class="aside-tit">로그인</h2>
        <div>
            <label for="user_id" class="exmargin">아이디</label>
            <input v-model="form.user_id" type="text" placeholder="ID">
            <br>
            <label for="user_pw">비밀번호 </label>
            <input v-model="form.user_pw" type="password" placeholder="PassWord">
            <br>
            <button type="button" @click="loginHandler">로그인</button>
            <router-link to="/user/join">
                <button>회원가입</button>
            </router-link>
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
    // computed: {
    //     account() {
    //         return this.$store.state.user.userid
    //     }
    // },
    created() {
        // axios.post("/api/users", this.form)
        //     .then(result => {
        //         console.log(result);
        //         // this.$store.commit('user', result.data);
        //     }).catch((err) => { console.log(err) });
    },

    methods: {
        loginHandler() {
            axios.post("/api/users", this.form)
                .then((result) => {
                    console.log("성공")
                    // if (result.data.success) {
                    //     this.$store.commit('user', result.data.user);
                    //     alert('로그인 성공');
                    // } else {
                    //     alert('로그인 실패: ' + result.data.message);
                    // }
                })
                .catch((err) => {
                    console.error('로그인 실패:', err);
                    alert('로그인 실패');
                })
        },

        // logoutHandler() {
        //     axios.post("/api/logout")
        //         .then(() => {
        //             this.$store.commit('user', {});
        //             alert('로그아웃');
        //         })
        //         .catch((err) => {
        //             console.error('로그아웃 실패:', err);
        //             alert('로그아웃 실패');
        //         });
        // },
    },
}
</script>
<style>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}
</style>