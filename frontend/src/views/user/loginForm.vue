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
        <button id="naverIdLogin" class="btn-naver"> 네이버로 로그인</button>
        <button @click="kakaoLogin" class="btn-kakao">카카오로 로그인</button>
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

export default {
  data() {
    return {
      form: {
        user_id: '', user_pw: ''
      }
    };
  },
  computed: {
    account() {
      return this.$store.loggedInUserId.user_id;
    }
  },
  created() {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('8f90883ee7aceafe1ce44fb81519b379'); // YOUR_APP_KEY를 실제 앱 키로 교체
    }

    axios.get("/api/user/account")
      .then(result => {
        this.$store.commit('setUser', result.data);
      })
      .catch(err => {
        console.log(err);
      });
      // 네이버 SDK 초기화
      // const naverLogin = new window.naver.LoginWithNaverId({
      //   clientId: "YOUR_NAVER_CLIENT_ID",
      //   callbackUrl: "http://localhost:8080/user/naver-callback", // 실제 콜백 URL로 교체
      //   isPopup: false,
      //   loginButton: { color: "green", type: 3, height: 48 }
      // });
      // naverLogin.init();
  
      // window.addEventListener('load', () => {
      //   naverLogin.getLoginStatus(status => {
      //     if (status) {
      //       const email = naverLogin.user.getEmail();
      //       if (!email) {
      //         alert("이메일은 필수 정보입니다. 정보제공을 동의해주세요.");
      //         naverLogin.reprompt();
      //         return;
      //       }
  
      //       axios.post('/api/users/naver-login', {
      //         accessToken: naverLogin.accessToken.accessToken,
      //         email
      //       }).then(result => {
      //         this.$store.commit('user', result.data);
      //         this.$router.push('/user/home');
      //       }).catch(err => {
      //         console.log('Login error:', err);
      //         alert('네이버 로그인 실패');
      //       });
      //     }
      //   });
      // });
  },
  methods: {
    loginHandler() {
      axios.post("/api/users/login", this.form)
        .then(result => {
          this.$store.commit('setUser', result.data);
          this.$router.push('/user/home');
        })
        .catch(err => {
          console.log(err);
          alert('로그인 실패');
          this.$router.push('/user/login');
        });
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        success: (authObj) => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              const kakaoAccount = res.kakao_account;
              // 백엔드와 연동하여 사용자 정보 확인 및 저장
              axios.post('/api/users/kakao-login', {
                accessToken: authObj.access_token,
                kakaoAccount
              }).then(result => {
                this.$store.commit('setUser', result.data);
                this.$router.push('/user/home');
              }).catch(err => {
                console.log(err);
                alert('카카오 로그인 실패');
              });
            },
            fail: (error) => {
              console.log(error);
              alert('사용자 정보를 가져오는 데 실패했습니다.');
            }
          });
        },
        fail: (err) => {
          console.log(err);
          alert('카카오 로그인 실패');
        }
      });
    },
    logoutHandler() {
      axios.post("/api/users/logout")
        .then(() => {
          this.$store.commit('setUser', {});
          alert('로그아웃');
        })
        .catch(err => {
          console.log(err);
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.login-left, .login-right {
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
  margin-top: 40px; /* 간격 조정 */
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

#login-form > .form-group > input {
  width: 100%;
  height: 48px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
}

#login-form > .form-group > input::placeholder {
  color: #d2d2d2;
}

#login-form > .btn-primary {
  color: #fff;
  font-size: 16px;
  background-color: #6a24fe;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  width: 100%;
  height: 48px;
  border-radius: 6px;
}

#login-form > .btn-primary:hover {
  background-color: #5b1fe3;
}

.btn-naver, .btn-kakao {
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
  background-color: #18b200;
}

.btn-kakao {
  background-color: #ffeb00;
  color: #3c1e1e;
}

.btn-kakao:hover {
  background-color: #e8d600;
}

.divider {
  width: 1px;
  background-color: #ddd;
  height: auto;
  margin: 0 40px; /* 간격 조정 */
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
  background-color: #6a24fe;
  color: #fff;
  border: none;
}


.btn-success:hover {
  background-color: #5b1fe3;
}

.btn:hover {
  background-color: #f0f0f0;
}
</style>
