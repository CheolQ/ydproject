<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-left">
        <h2 class="aside-tit">로그인</h2>
        <p class="login-description">가입하신 아이디와 비밀번호를 입력해주세요.<br>비밀번호는 대소문자를 구분합니다.</p>
        <form id="login-form">
          <div class="form-group">
            <input v-model="form.user_id" type="text" placeholder="ID" name="userName">
          </div>
          <div class="form-group">
            <input v-model="form.user_pw" type="password" placeholder="Password" name="userPassword">
          </div>
          <input type="button" @click="loginHandler" value="로그인" class="btn-primary" />
        </form>
      </div>
      <div class="divider"></div>
      <div class="login-right">
        <h2 class="aside-tit">회원가입</h2>
        <p class="login-description">회원가입을 하시면 다양한 혜택을 편하게 이용하실 수 있습니다</p>
        <router-link to="/user/join">
          <button class="btn btn-success">회원가입</button>
        </router-link>
        <p class="login-description spaced">간편한 정보를 입력 후 아이디와 비밀번호 정보를 찾으실 수 있습니다</p>
        <router-link to="/user/UserFind">
          <button class="btn">아이디/비밀번호 찾기</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        user_id: '',
        user_pw: ''
      }
    };
  },
  computed: {
    account() {
      return this.$store.loggedInUserId.user_id;
    }
  },
  created() {

  },
  methods: {
    loginHandler() {
      axios.post("/api/users/login", this.form)
        .then(result => {
          this.$store.commit('setUser', result.data);
          if (result.data.user_id === 'admin') {
            Swal.fire({
              icon: 'success',
              title: '로그인 성공',
              text: '관리자로 로그인 되었습니다.',
            }).then(() => {
              this.$router.push('../../admin');
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: '로그인 성공',
              text: '사용자로 로그인 되었습니다.',
            }).then(() => {
              this.$router.push('/user/home');
            });
          }
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '로그인 실패',
            text: '아이디 또는 비밀번호가 올바르지 않습니다.',
          }).then(() => {
            this.$router.push('/user/login');
          });
        });
    },
    
    logoutHandler() {
      axios.post("/api/users/logout")
        .then(() => {
          this.$store.commit('setUser', {});
          Swal.fire({
            icon: 'success',
            title: '로그아웃',
            text: '로그아웃 되었습니다.',
          }).then(() => {
            this.$router.push('/user/login');
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: '오류',
            text: '로그아웃을 실패하였습니다.',
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.login-wrapper {
  display: flex;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-left,
.login-right {
  padding: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.aside-tit {
  font-size: 24px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.login-description {
  font-size: 14px;
  color: #666;
  text-align: left;
  margin-bottom: 20px;
}

.login-description.spaced {
  margin-top: 40px;
  /* 간격 조정 */
  margin-bottom: 20px;
}

#login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

#login-form>.form-group>input {
  width: 100%;
  height: 48px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
}

#login-form>.form-group>input::placeholder {
  color: #d2d2d2;
}

#login-form>.btn-primary {
  color: #fff;
  font-size: 16px;
  background-color: rgb(255, 181, 36);
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  width: 100%;
  height: 48px;
  border-radius: 6px;  
  border: none;
  font-size: 16px;
  font-weight: bold;
}

#login-form>.btn-primary:hover {
  background-color: #ffd16f;
}

/* .btn-naver,
.btn-kakao {
  width: 100%;
  height: 48px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-naver {
  background-color: #1ec800;
  color: #fff;
}

.btn-naver:hover {
  background-color: #ff0000;
}

.btn-kakao {
  background-color: #ffeb00;
  color: #3c1e1e;
}

.btn-kakao:hover {
  background-color: #e8d600;
} */

.divider {
  width: 1px;
  background-color: #ddd;
  height: auto;
  margin: 0 40px;
  /* 간격 조정 */
}

.btn {
  width: 100%;
  height: 48px;
  padding: 10px;
  background-color: #fff;
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.btn-success {
  background-color: rgb(255, 181, 36);
  color: #fff;
  border: none;
}


.btn-success:hover {
  background-color: rgb(255, 181, 36);
}

.btn:hover {
  background-color: #ffd16f;
}
</style>
