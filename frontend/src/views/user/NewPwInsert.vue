<template>
  <div class="pw-account">
    <h2>새로운 비밀번호</h2><br>
    <div class="form-group">
      <label for="password">새로운 비밀번호</label>
      <input type="password" id="password" v-model="newPassword" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="password2">비밀번호 확인</label>
      <input type="password" id="password2" v-model="newPassword2" class="form-control" required />
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <button type="button" class="btn btn-danger" @click="updatePassword">비밀번호 수정</button>
    <router-link to="/user/home">
      <button class="btn btn-success">홈으로</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newPassword: '',
      newPassword2: '',
      error: '',
    };
  },
  methods: {
    async updatePassword() {
      if (this.newPassword !== this.newPassword2) {
        this.error = '비밀번호가 일치하지 않습니다.';
        return;
      }

      const token = this.$route.query.token;
      try {
        await axios.post('/api/users/updatepassword', { token, newPassword: this.newPassword });
        alert('비밀번호가 성공적으로 변경되었습니다.');
        this.$router.push('/user/login');
      } catch (error) {
        console.error(error);
        this.error = '비밀번호 변경에 실패하였습니다. 다시 시도해 주세요.';
      }
    }
  }
}
</script>
<style scoped>
.pw-account {
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