<template>
    <div class="container">
        <div class="signup-wrapper">
            <h2 class="aside-tit">회원정보변경 페이지</h2>
            <form id="signup-form">
                <!-- <div class="form-group">
                    <label for="username">아이디 *</label>
                    <input type="text" id="username" v-model="form.user_id" placeholder="ID" readonly />
                </div> -->
                <div class="form-group">
                    <label for="password">비밀번호 *</label>
                    <input type="password" id="password" v-model="form.user_pw" placeholder="PassWord" required />
                </div>
                <div class="form-group">
                    <label for="password2">비밀번호 확인 *</label>
                    <input type="password" id="password2" v-model="form.user_pw2" placeholder="비밀번호를 다시 입력하세요"
                        required />
                </div>
                <div class="form-group">
                    <label for="name">이름 *</label>
                    <input type="text" id="name" v-model="form.name" placeholder="이름을 입력하세요" required />
                </div>
                <div class="form-group">
                    <label for="email">이메일 *</label>
                    <input type="email" id="email" v-model="form.email" placeholder="이메일을 입력하세요" required />
                </div>
                <div class="form-group">
                    <label for="tel">전화번호 *</label>
                    <input type="tel" id="tel" v-model="form.tel" placeholder="ex) 010-1111-1234" required />
                </div>
                <div class="form-group">
                    <label for="postcode">우편번호 *</label>
                    <div class="postcode-wrapper">
                        <input type="text" id="postcode" v-model="form.postcode" ref="postcode"
                            placeholder="우편번호를 입력하세요" required />
                        <button type="button" @click="showApi">검색</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="roadAddress">주소 *</label>
                    <input type="text" id="roadAddress" v-model="form.address" placeholder="주소" ref="roadAddress"
                        required />
                </div>
                <div class="form-group">
                    <label for="detailAddress">상세주소 *</label>
                    <input type="text" id="detailAddress" v-model="form.detail_address" placeholder="상세주소" required />
                </div>
                <button type="button" class="btn btn-primary" @click="modifyuser">회원정보 변경</button>
                <router-link to="/user/home">
                    <button type="button" class="btn btn-wanning">홈으로</button>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
    methods: {
        confirmPassword() {
            if (this.form.user_pw !== this.form.user_pw2) {
                alert('비밀번호가 일치하지 않습니다.');
                return false;
            }
            return true;
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
          detail_addr: this.form.detail_address,
        };
        try {
            const result = await axios.put(url, param);
            console.log(result);
                alert('회원정보가 수정되었습니다.');
                this.$router.push('/user/home');
                console.log(response);
            } catch (error) {
                console.error(error);
                alert('회원정보 수정에 실패했습니다.');
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
    background-color: #6a24fe;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 10px 20px;
    border-radius: 5px;
  }
  
  .form-group button:hover {
    background-color: #5b1fe3;
  }
  </style>