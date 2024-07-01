<template>
    <div class="login-wrapper">
        <h2>아이디 찾기</h2>
            <input type="text" name="userName" placeholder="Name" v-model="name" required>
            <input type="text" name="userTel" placeholder="TEL" v-model="tel" required>
            <button class="btn btn-success" @click="findUserId">아이디찾기</button>
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
        };
    },
    methods: {
        async findUserId() {
            try {
                const result = await axios.post('/api/users/userfindid', { name: this.name, tel: this.tel });
                const userId = result.data.user_id;
                if (userId) {
                    this.userId = userId;
                    alert(`아이디는 ${userId}입니다.`);
                } else {
                    alert('아이디를 찾을 수 없습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                console.error(error);
                alert('아이디 찾기에 실패하였습니다. 다시 시도해 주세요.');
            }
        }
}
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    border: none;
}

body {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
}

.login-wrapper {
    width: 400px;
    height: 350px;
    padding: 40px;
    box-sizing: border-box;
}

.login-wrapper > h2 {
    font-size: 24px;
    color: #6A24FE;
    margin-bottom: 20px;
}

#login-form > input {
    width: 100%;
    height: 48px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
    border-radius: 6px;
    background-color: #F8F8F8;
}

#login-form > input::placeholder {
    color: #D2D2D2;
}

#login-form > input[type="submit"] {
    color: #fff;
    font-size: 16px;
    background-color: #6A24FE;
    margin-top: 20px;
}
</style>
