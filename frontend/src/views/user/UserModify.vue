<template>
    <div class="container">
        <div class="signup-wrapper">
            <h2 class="aside-tit">회원정보변경 페이지</h2>
            <form id="signup-form">
                <div class="form-group">
                    <label for="password">비밀번호 *</label>
                    <input type="password" id="password" v-model="form.user_pw" placeholder="6~20자 이내로 영문,숫자 혼합해서 입력하세요" @change="validatePw" />
                </div>
                <div class="form-group">
                    <label for="password2">비밀번호 확인 *</label>
                    <input type="password" id="password2" v-model="form.user_pw2" placeholder="비밀번호를 다시 입력하세요" @change="validateCheckedPw" />
                </div>
                <div class="form-group">
                    <label for="name">이름 *</label>
                    <input type="text" id="name" v-model="form.name" placeholder="이름을 입력하세요" required />
                </div>
                <div class="form-group">
                    <label for="email">이메일 *</label>
                    <input type="email" id="email" v-model="form.email" placeholder="이메일을 입력하세요" @change="validateEmail" />
                </div>
                <div class="form-group">
                    <label for="tel">전화번호 *</label>
                    <input type="tel" id="tel" v-model="form.tel" placeholder="ex) 010-1111-1234" @click="" />
                </div>
                <div class="form-group">
                    <label for="postcode">우편번호 *</label>
                    <div class="postcode-wrapper">
                        <input type="text" id="postcode" v-model="form.postcode" ref="postcode" placeholder="우편번호를 입력하세요" required  readonly/>
                        <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary" @click="showApi">검색</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="roadAddress">주소 *</label>
                    <input type="text" id="roadAddress" v-model="form.address" placeholder="주소" ref="roadAddress" required readonly />
                </div>
                <div class="form-group">
                    <label for="detailAddress">상세주소 *</label>
                    <input type="text" id="detailAddress" v-model="form.detail_address" placeholder="상세주소" required />
                </div>
                <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary" @click="modifyuser">회원정보 변경</button>
                <router-link to="/user/home">
                    <button type="button" class="btn border border-secondary rounded-pill px-3 text-primary">홈으로</button>
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
            }
        };
    },
    async created() {
        try {
            const response = await axios.get('/api/users/usermodifyinfo');
            if (response.status === 200) {
                this.form = {
                    user_id: response.data.user_id,
                    user_pw: response.data.user_pw,
                    user_pw2: response.data.user_pw,
                    name: response.data.name,
                    email: response.data.email,
                    tel: response.data.tel,
                    postcode: response.data.postcode,
                    address: response.data.addr,
                    detail_address: response.data.detail_addr
                };
            }
        } catch (error) {
            console.error('회원정보를 불러오는데 실패했습니다.', error);
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '회원정보를 불러오는데 실패했습니다.'
            });
        }
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
            let checkedPw = this.form.user_pw2;

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
            } else if (email.match(regExp) === null) {
                Swal.fire({
                    icon: 'error',
                    title: '이메일 오류',
                    text: '이메일 형식이 맞지 않습니다.'
                });
                return false;
            } else {
                console.log("성공");
                return true;
            }
        },
        async modifyuser() {
            if (!this.confirmPassword()) {
                return;
            }
            const url = '/api/users/usermodify';
            const param = {
                user_id: this.form.user_id,
                user_pw: this.form.user_pw,
                name: this.form.name,
                email: this.form.email,
                tel: this.form.tel,
                postcode: this.form.postcode,
                addr: this.form.address,
                detail_addr: this.form.detail_address
            };
            try {
                const result = await axios.put(url, param);
                console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: '회원정보 수정 완료',
                    text: '회원정보가 수정되었습니다.'
                }).then(() => {
                    this.$router.push('/user/home');
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: '회원정보 수정 실패',
                    text: '회원정보 수정에 실패했습니다.'
                });
            }
        },
        showApi() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    let fullRoadAddr = data.roadAddress;
                    let extraRoadAddr = '';

                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                    }
                    if (extraRoadAddr !== '') {
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
                    if (fullRoadAddr !== '') {
                        fullRoadAddr += extraRoadAddr;
                    }

                    this.form.postcode = data.zonecode;
                    this.form.address = fullRoadAddr;
                }
            }).open();
        }
    },
    mounted() {
        if (typeof window.daum === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js';
            script.onload = () => {
                console.log('Daum Postcode script loaded');
            };
            document.head.appendChild(script);
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

.form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
}

.form-group .postcode-wrapper {
    display: flex;
    align-items: center;
}

.form-group .postcode-wrapper input {
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

.join{
  background-color: rgb(88, 127, 255);
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;  
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.join:hover{
  background-color: rgb(142, 129, 255);
}

.cancel{
  background-color: rgb(131, 127, 126);
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;  
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.cancel:hover{
  background-color: rgb(163, 163, 163);
}

</style>
