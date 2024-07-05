<template>
  <br>
  <div class="delete-account">
    <h2>회원 탈퇴</h2><br>

    <div class="form-group">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="form.user_pw" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="Password2">비밀번호 확인</label>
      <input type="password" id="password2" v-model="form.user_pw2" class="form-control" required />
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary" @click="deleteuser">회원 탈퇴</button>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        user_pw: '',
        user_pw2: ''
      }
    };
  },
  methods: {
    confirmPassword() {
      if (this.form.user_pw !== this.form.user_pw2) {
        Swal.fire({
          icon: 'error',
          title: '비밀번호 불일치',
          text: '비밀번호가 일치하지 않습니다.',
        });
        return false;
      }
      return true;
    },
    async deleteuser() {
      if (!this.confirmPassword()) {
        return;
      }
      const url = '/api/users/userdelete';
      const param = {
        user_pw: this.form.user_pw,
      };
      try {
        const result = await axios.post(url, param);
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: '회원탈퇴 완료',
          text: '회원탈퇴가 성공적으로 처리되었습니다.',
        }).then(() => {
          this.$router.push('/user/home');
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: '회원탈퇴 실패',
          text: '회원탈퇴를 실패하였습니다. 다시 시도해 주세요.',
        });
      }
    }
  }
}
</script>

<style scoped>
.delete-account {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 100px;
}

.form-group {
  margin-bottom: 1em;
}
</style>