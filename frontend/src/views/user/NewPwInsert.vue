<template>
    <div class="pw-account">
        <h2>새로운 비밀번호</h2><br>
        <div class="form-group">
            <label for="password">새로운 비밀번호</label>
            <input type="password" id="password" v-model="form.user_pw" class="form-control" @change="validatePw" />
        </div>
        <div class="form-group">
            <label for="password2">비밀번호 확인</label>
            <input type="password" id="password2" v-model="confirmPassword" class="form-control" @change="validateCheckedPw" />
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary" @click="updatePassword">비밀번호 수정</button>
        <router-link to="/user/home">
            <button class="btn border border-secondary rounded-pill px-3 text-primary">홈으로</button>
        </router-link>
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
            },
            confirmPassword: '',
            error: '',
        };
    },
    methods: {
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
                    text: '영문,숫자를 혼합하여 입력해주세요.'
                });
                return false;
            } else {
                console.log("비밀번호 사용가능");
                return true;
            }
        },
        validateCheckedPw() {
            let pw = this.form.user_pw;
            let checkedPw = this.confirmPassword;

            let number = checkedPw.search(/[0-9]/g);
            let english = checkedPw.search(/[a-z]/ig);
            let specialCharacter = checkedPw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

            if (checkedPw.length < 6 || checkedPw.length > 20) {
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호 확인 오류',
                    text: '6자리 ~ 20자리 이내로 입력해주세요.'
                });
                return false;
            } else if (checkedPw.search(/\s/) !== -1) {
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호 확인 오류',
                    text: '비밀번호는 공백 없이 입력해주세요.'
                });
                return false;
            } else if (number < 0 || english < 0 || specialCharacter < 0) {
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호 확인 오류',
                    text: '영문,숫자, 특수문자를 혼합하여 입력해주세요.'
                });
                return false;
            } else if (pw !== checkedPw) {
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호 확인 오류',
                    text: '비밀번호가 맞지 않습니다.'
                });
                return false;
            } else {
                console.log("비밀번호 체크 사용가능");
                return true;
            }
        },
        async updatePassword() {
            if (this.form.user_pw !== this.confirmPassword) {
                this.error = '비밀번호가 일치하지 않습니다.';
                return;
            }
            try {
                const user_id = this.$route.query.user_id;
                const tel = this.$route.query.tel;
                const response = await axios.post('/api/users/updatePassword', {
                    user_id,
                    tel,
                    new_password: this.form.user_pw,
                });
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '비밀번호 업데이트 성공',
                        text: '비밀번호가 성공적으로 업데이트되었습니다.',
                    }).then(() => {
                        this.$router.push('/user/login');
                    });
                } else {
                    this.error = '비밀번호를 업데이트할 수 없습니다. 다시 시도해 주세요.';
                    Swal.fire({
                        icon: 'error',
                        title: '오류',
                        text: this.error,
                    });
                }
            } catch (error) {
                console.error(error);
                this.error = '비밀번호 업데이트에 실패하였습니다. 다시 시도해 주세요.';
                Swal.fire({
                    icon: 'error',
                    title: '오류',
                    text: this.error,
                });
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
