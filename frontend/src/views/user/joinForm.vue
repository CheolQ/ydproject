<template>
  <div class="container">
    <div class="signup-wrapper">
      <h2 class="aside-tit">회원가입</h2>
      <form id="signup-form" @submit.prevent="joinUser">
        <div class="form-group">
          <label for="username">아이디 <span class="required">*</span></label>
          <div class="username-wrapper">
            <input type="text" id="username" v-model="form.user_id" @input="resetUserIdState" placeholder="ID" required />
            <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary" @click="checkUserId">중복 체크</button>
          </div>
          <span v-if="userIdError" class="error">{{ userIdError }}</span>
          <span v-if="userIdSuccess" class="success">{{ userIdSuccess }}</span>
        </div>
        <div class="form-group">
          <label for="password">비밀번호 <span class="required">*</span></label>
          <input type="password" id="password" v-model="form.user_pw" placeholder="6~20자 이내로 영문,숫자 혼합해서 입력하세요" @change="validatePw" required />
        </div>
        <div class="form-group">
          <label for="checkedPassword">비밀번호 확인 <span class="required">*</span></label>
          <input type="password" id="checkedPassword" v-model="form.user_pw2" placeholder="비밀번호를 다시 입력하세요" @change="validateCheckedPw" required />
        </div>
        <div class="form-group">
          <label for="name">이름 <span class="required">*</span></label>
          <input type="text" id="name" v-model="form.name" placeholder="이름을 입력하세요" required />
        </div>
        <div class="form-group">
          <label for="email">이메일 <span class="required">*</span></label>
          <input type="email" id="email" v-model="form.email" placeholder="이메일을 입력하세요" @change="validateEmail" required />
        </div>
        <div class="form-group">
          <label for="tel">전화번호 <span class="required">*</span></label>
          <div class="tel-wrapper">
            <input type="tel" id="tel" v-model="form.tel" placeholder="ex) 010-1111-1234" required />
          </div>
        </div>
        <div class="form-group">
          <label for="postcode">우편번호 <span class="required">*</span></label>
          <div class="postcode-wrapper">
            <input type="text" id="postcode" v-model="form.postcode" ref="postcode" placeholder="우편번호를 입력하세요" required readonly />
            <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary" @click="showApi">검색</button>
          </div>
        </div>
        <div class="form-group">
          <label for="roadAddress">주소 <span class="required">*</span></label>
          <input type="text" id="roadAddress" v-model="form.address" placeholder="주소" ref="roadAddress" required readonly />
        </div>
        <div class="form-group">
          <label for="detailAddress">상세주소 </label>
          <input type="text" id="detailAddress" v-model="form.detail_address" placeholder="상세주소" />
        </div>
        <button type="submit" class="btn border border-secondary rounded-pill px-3 text-primary join">회원가입</button>
        <router-link to="/user/home">
          <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary cancel">취소</button>
        </router-link>
      </form>
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
        user_pw: '',
        user_pw2: '',
        name: '',
        email: '',
        tel: '',
        postcode: '',
        address: '',
        detail_address: ''
      },
      userIdError: null,
      userIdSuccess: null
    };
  },
  methods: {
    resetUserIdState() {
      this.userIdError = null;
      this.userIdSuccess = null;
    },
    async checkUserId() {
      if (!this.form.user_id) {
        this.userIdError = '아이디를 입력해주세요.';
        this.userIdSuccess = null;
        return;
      }
      try {
        const response = await axios.post('/api/users/checkId', { user_id: this.form.user_id });
        if (response.data.exists) {
          this.userIdError = '이미 사용 중인 아이디입니다.';
          this.userIdSuccess = null;
        } else {
          this.userIdError = null;
          this.userIdSuccess = '사용 가능한 아이디입니다.';
        }
      } catch (error) {
        console.error('아이디 중복 체크 실패:', error);
        this.userIdError = '아이디 중복 체크 중 오류가 발생했습니다.';
        this.userIdSuccess = null;
      }
    },
    validatePw() {
      let pw = this.form.user_pw;

      let number = pw.search(/[0-9]/g);
      let english = pw.search(/[a-z]/ig);

      if (pw.length < 6 || pw.length > 20) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '6자리 ~ 20자리 이내로 입력해주세요.'
        });
        return false;
      } else if (pw.search(/\s/) !== -1) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '비밀번호는 공백 없이 입력해주세요.'
        });
        return false;
      } else if (number < 0 || english < 0) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '영문, 숫자를 혼합하여 입력해주세요.'
        });
        return false;
      } else {
        console.log("비밀번호 사용가능");
        return true;
      }
    },
    validateCheckedPw() {
      let pw = this.form.user_pw;
      let checkedPw = this.form.user_pw2;
      
      let number = checkedPw.search(/[0-9]/g);
      let english = checkedPw.search(/[a-z]/ig);

      if (checkedPw.length < 6 || checkedPw.length > 20) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '6자리 ~ 20자리 이내로 입력해주세요.'
        });
        return false;
      } else if (checkedPw.search(/\s/) !== -1) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '비밀번호는 공백 없이 입력해주세요.'
        });
        return false;
      } else if (number < 0 || english < 0) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '영문, 숫자를 혼합하여 입력해주세요.'
        });
        return false;
      } else if (pw !== checkedPw) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '비밀번호가 일치하지 않습니다.'
        });
        return false;
      } else {
        console.log("비밀번호 체크 사용가능");
        return true;
      }
    },
    confirmPassword() {
      if (this.form.user_pw !== this.form.user_pw2) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 오류',
          text: '비밀번호가 일치하지 않습니다.'
        });
        return false;
      }
      return true;
    },
    validateEmail() {
      let email = this.form.email;

      const regExp = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;

      if (email.search(/\s/) !== -1) {
        Swal.fire({
          icon: 'error',
          title: '이메일 오류',
          text: '이메일은 공백 없이 입력해주세요.'
        });
        return false;
      } else if (!regExp.test(email)) {
        Swal.fire({
          icon: 'error',
          title: '이메일 오류',
          text: '이메일 형식에 맞게 입력해주세요.'
        });
        return false;
      } else {
        console.log("이메일 사용가능");
        return true;
      }
    },
    showApi() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.form.postcode = data.zonecode;
          this.form.address = data.address;
        }
      }).open();
    },
    async joinUser() {
      const isValidPw = this.validatePw();
      const isCheckedPw = this.validateCheckedPw();
      const isConfirmedPw = this.confirmPassword();
      const isValidEmail = this.validateEmail();
      
      if (!isValidPw || !isCheckedPw || !isConfirmedPw || !isValidEmail) {
        return;
      }

      try {
        await axios.post('/api/users/join', this.form)
        .then(()=>{
          Swal.fire({
            icon: 'success',
            title: '회원가입 성공',
            text: '회원가입이 성공적으로 완료되었습니다.'
          });
          this.$router.push('/user/home');
        });
      } catch (error) {
        console.error('회원가입 실패:', error);
        Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: '회원가입 중 문제가 발생했습니다.'
        });
      }
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

.signup-wrapper {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 500px;
  box-sizing: border-box;
  margin-top: 50px;
}

.aside-tit {
  font-size: 24px;
  color: #000;
  font-weight: bold;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group .required {
  color: red;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.tel-wrapper, .username-wrapper, .postcode-wrapper {
  display: flex;
  align-items: center;
}

.tel-wrapper input, .username-wrapper input, .postcode-wrapper input {
  flex: 1;
  margin-right: 10px;
}

.form-group button {
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;  
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.form-group button:hover {
  background-color: rgb(255, 178, 130);
}

.join {
  background-color: rgb(88, 127, 255);
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;  
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.join:hover {
  background-color: rgb(142, 129, 255);
}

.cancel {
  background-color: rgb(131, 127, 126);
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;  
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.cancel:hover {
  background-color: rgb(163, 163, 163);
}
</style>
