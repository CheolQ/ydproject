<template>
    <div class="container">
        <h2 class="aside-tit">회원가입</h2>
        <div>
            <label for="id">아이디</label>
            <input type="text" id="username" v-model="form.user_id" required />
        </div>
        <div>
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="form.user_pw" />
        </div>
        <div>
            <label for="password2">비밀번호확인</label>
            <input type="password" id="password2" v-model="form.user_pw2" />
        </div>
        <div>
            <label for="name">이름</label>
            <input type="text" id="name" v-model="form.name" />
        </div>
        <div>
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="form.email" />
        </div>
        <div>
            <label for="phone">전화번호</label>
            <input type="tel" id="tel" v-model="form.tel" placeholder="ex) 010-1111-1111" />
        </div>
        <div>
            <label for="postcode">우편번호</label>
            <input type="text" id="postcode" v-model="form.postcode" ref="postcode" />
            <input type="button" @click="showApi" value="검색"><br>
        </div>
        <div>
            <label for="address">주소</label>
            <input type="text" id="roadAddress" v-model="form.address" placeholder="주소" ref="roadAddress" />
        </div>
        <div>
            <label for="detailAddress">상세주소</label>
            <input type="text" id="detailAddress" v-model="form.detail_address" placeholder="상세주소" />
        </div>
        <button class="btn btn-success" @click="joinUser">회원가입</button>
        <router-link to="/user/home">
            <button class="btn btn-warning">취소</button>
        </router-link>
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
        async joinUser() {
            if (!this.confirmPassword()) {
                return;
            }
            const url = '/api/users/join';
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

            console.log(param);

            try {
                const result = await axios.post(url, param);
                console.log(result);
                alert('회원가입에 성공하셨습니다');
                this.$router.push('/user/login');
            } catch (error) {
                console.error(error);
                alert('회원가입에 실패하였습니다. 다시 시도해 주세요.');
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
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px;
}
</style>