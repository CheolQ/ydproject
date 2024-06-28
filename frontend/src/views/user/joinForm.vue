<template>
    <div class="container">
        <h2 class="aside-tit">회원가입</h2>
        <div>
            <label for="id">아이디</label>
            <input v-model="form.user_id" type="text" id="username" required />
        </div>
        <div>
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="form.user_pw" />
        </div>
        <div>
            <label for="password2">비밀번호확인</label>
            <input type="password" id="password2" v-model="form.user_pw2"/>
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
            <input type="tel" id="tel" v-model="form.tel" placeholder="ex) 010-1111-1111"/>
        </div>
        <div>
            <label for="postcode">우편번호</label>
            <input type="text" id="postcode" v-model="form.postcode" ref="postcode" />
            <input type="button" @click="showApi()" value="검색"><br>
        </div>
        <div>
            <label for="address">주소</label>
            <input type="text" id="roadAddress" v-model="form.address" placeholder="주소" ref="roadAddress" />
        </div>
        <div>
            <label for="detailAddress">상세주소</label>
            <input type="text" id="detailAddress" v-model="form.detail_address" placeholder="상세주소"/>
        </div>
        <button class="btn btn-primary" @click="joinUser()">회원가입</button>
    </div>
</template>

<script>
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

    computed: {},
    created() {
        this.searchNo = this.$route.query.form.user_id;
        if (this.searchNo > 0) {
            this.getuserInfo();
        }
    },
    methods: {
        confirmPassword() {
            // 비밀번호 확인 메서드
            if (this.userInfo.form.user_pw !== this.userInfo.form.user_pw2) {
                alert('비밀번호가 일치하지 않습니다.');
                return false;
            }
            return true;
        },
        async getuserInfo() {
            let result = await axios.get(`/api/users/${this.searchNo}`);
            this.userInfo = result.data[0];
        },
        async joinUser() {
            if (!this.confirmPassword()) {
                return;
            }
            const url = "/api/users/insert";
            let param = {
                user_id: this.userInfo.form.user_id,
                user_pw: this.userInfo.form.user_pw,
                user_name: this.userInfo.user_name,
                user_post: this.userInfo.user_post || 0,  // 기본값을 0으로 설정
                user_address: this.userInfo.user_address,
                user_detail_addr: this.userInfo.user_detail_addr,
                user_phone: this.userInfo.user_phone,
                user_email: this.userInfo.user_email
            };

            console.log(param);  // 추가된 콘솔 로그
            const result = (await axios.post(url, param)).data;
            alert("회원가입에 성공하셨습니다");
        }
    },
        

    showApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
              extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            this.form.postcode = data.zonecode; //5자리 새우편번호 사용
            this.form.address = fullRoadAddr;
        }
    }).open()
    }
  }


</script>

<style>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px;
}
</style>



<!-- // created () {
//     this.searchNo = this.$route.query.user_id;
//     if (this.searchNo > 0) {
//         this.getuserInfo();
//     }
// },

// methods : {
//     signUp() {
//         axios.post("/api/users", this.form)
//         .then((result) => {
//             console.log("회원가입");
//         })
//         .catch((err) => {
//                 console.error('회원가입 실패:', err);
//                 alert('회원가입 실패');
//         })
//     }
// }, -->