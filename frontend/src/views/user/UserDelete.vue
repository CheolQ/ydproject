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
      <button type="button" class="btn btn-danger" @click="deleteuser">회원 탈퇴</button>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
          user_pw: '',
      }
    };
  },
  methods: {
    confirmPassword() {
            if (this.form.user_pw !== this.form.user_pw2) {
                alert('비밀번호가 일치하지 않습니다.');
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
                alert('회원탈퇴 완료');
                this.$router.push('/user/home');
            } catch (error) {
                console.error(error);
                alert('회원탈퇴 실패');
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