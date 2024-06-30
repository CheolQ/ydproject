<template>
  <div class="container">

      <div class="login-wrapper">
          <h2 class="aside-tit">Login</h2>
          <form id="login-form">
              <input v-model="form.user_id" type="text" placeholder="ID" name="userName">
              <input v-model="form.user_pw" type="password" placeholder="PassWord" name="userPassword">
              <!-- <label for="remember-check">
                  <input type="checkbox" id="remember-check">아이디 저장하기
              </label> -->
              <input type="button" @click="loginHandler" value="로그인" />
          </form>
          <router-link to="/user/join">
      <button class="btn btn-primary">회원가입</button>
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
  computed: {
    account() {
      return this.$store.state.user.user_id;
    }
  },
  created() {
    axios.get("/api/user/account")
      .then(result => {
        this.$store.commit('user', result.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    loginHandler() {
      axios.post("/api/users/login", this.form)
        .then(result => {
          this.$store.commit('user', result.data);
          console.log("성공");
          this.$router.push('/user/home');
        })
        .catch(err => {
          console.log(err);
          alert('로그인 실패');
          this.$router.push('/user/login');
        });
    },
    logoutHandler() {
      axios.post("/api/user/logout")
        .then(() => {
          this.$store.commit('user', {});
          alert('로그아웃');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
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


*{

  padding: 0;
  margin: 0;
  border: none;
}

body{
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}
.login-wrapper{

  width: 400px;
  height: 350px;
  padding: 40px;
  box-sizing: border-box;
}

.login-wrapper > h2{

  font-size: 24px;
  color: #6A24FE;
  margin-bottom: 20px;
}

#login-form > input{

  width: 100%;
  height: 48px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #F8F8F8;
}

#login-form > input::placeholder{
  color: #D2D2D2;
}
#login-form > input[type="button"]{

  color: #fff;
  font-size: 16px;
  background-color: #6A24FE;
  margin-top: 20px;
}

#login-form > input[type="checkbox"]{
  display: none;
}
#login-form > label{
  color: #999999;
}
#login-form input[type="submit"] + label{


  cursor: pointer;
  padding-left: 26px;
  /* background-image: url("checkbox.png"); */
  background-repeat: no-repeat;
  background-size: contain;
}

#login-form input[type="checkbox"]:checked + label{


  /* background-image: url("checkbox-active.png"); */
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
