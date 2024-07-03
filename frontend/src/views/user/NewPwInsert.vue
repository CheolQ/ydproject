<template>
  <div class="pw-account">
      <h2>새로운 비밀번호</h2><br>
      <div class="form-group">
          <label for="password">새로운 비밀번호</label>
          <input type="password" id="password" v-model="newPassword" class="form-control" required />
      </div>
      <div class="form-group">
          <label for="password2">비밀번호 확인</label>
          <input type="password" id="password2" v-model="confirmPassword" class="form-control" required />
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
          confirmPassword: '',
          error: '',
      };
  },
  methods: {
      async updatePassword() {
          if (this.newPassword !== this.confirmPassword) {
              this.error = '비밀번호가 일치하지 않습니다.';
              return;
          }
          try {
              const user_id = this.$route.query.user_id;
              const tel = this.$route.query.tel;
              const response = await axios.post('/api/users/updatePassword', {
                  user_id,
                  tel,
                  new_password: this.newPassword,
              });
              if (response.data.success) {
                  alert('비밀번호가 성공적으로 업데이트되었습니다.');
                  this.$router.push('/user/login');
              } else {
                  this.error = '비밀번호를 업데이트할 수 없습니다. 다시 시도해 주세요.';
              }
          } catch (error) {
              console.error(error);
              this.error = '비밀번호 업데이트에 실패하였습니다. 다시 시도해 주세요.';
          }
      },
  },
};
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