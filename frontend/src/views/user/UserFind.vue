<template>
  <div class="login-container">
    <div class="login-wrapper">
      <h2>아이디 찾기</h2>
      <p>간단한 정보를 입력 후 아이디를 알려드립니다.</p>
      <input type="text" name="userName" placeholder="NAME" v-model="name" required>
      <input type="text" name="userTel" placeholder="PHONE" v-model="tel" required>
      <button class="btn btn-primary" @click="findUserId">아이디 찾기</button>
      <router-link to="/user/login">
        <button class="btn btn-secondary">로그인</button>
      </router-link>
    </div>
    <div class="login-wrapper">
      <h2>비밀번호 찾기</h2>
      <p>간단한 정보를 입력 후 비밀번호 재설정이 가능합니다.</p>
      <input type="text" name="userId" placeholder="ID" v-model="user_id" required>
      <input type="text" name="userTel" placeholder="PHONE" v-model="telPw" required>
      <button class="btn btn-primary" @click="findPassword">비밀번호 찾기</button>
      <router-link to="/user/login">
        <button class="btn btn-secondary">로그인</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      tel: '',
      user_id: '',
      telPw: ''
    };
  },
  methods: {
    async findUserId() {
      try {
        const result = await axios.post('/api/users/userfindid', { name: this.name, tel: this.tel });
        const userId = result.data.user_id;
        if (userId) {
          this.user_id = userId;
          alert(`아이디는 ${userId}입니다.`);
        } else {
          alert('아이디를 찾을 수 없습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.error(error);
        alert('아이디 찾기에 실패하였습니다. 다시 시도해 주세요.');
      }
    },
    async findPassword() {
      try {
        const result = await axios.post('/api/users/userfindpw', { user_id: this.user_id, tel: this.telPw });
        if (result.data.success) {
          this.$router.push({ name: 'NewPwInsert', query: { user_id: this.user_id, tel: this.telPw } });
        } else {
          alert('비밀번호를 초기화할 수 없습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.error(error);
        alert('비밀번호 찾기에 실패하였습니다. 다시 시도해 주세요.');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  height: 65vh;
  padding: 100px;
  background-color: #f9f9f9;
}

.login-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #ffc107;
}

.btn-primary:hover {
  background-color: #e0a800;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>