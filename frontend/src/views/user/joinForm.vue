<template>
    <div class="container">
        <h2 class="aside-tit">회원가입</h2>
        <div>
            <label for="id">아이디</label>
            <input v-model="form.user_id" type="text" id="username" required />
        </div>
        <div>
            <label for="password" >비밀번호</label>
            <input type="password" id="password" v-model="form.user_pw" />
        </div>
        <div>
            <label for="password2" >비밀번호확인</label>
            <input type="password" id="password2" v-model="form.user_pw2"/>
        </div>
        <div>
            <label for="name" >이름</label>
            <input type="text" id="name" v-model="form.name" />
        </div>
        <div>
            <label for="email" >이메일</label>
            <input type="email" id="email" v-model="form.email" />
        </div>
        <div>
            <label for="phone" >전화번호</label>
            <input type="tel" id="tel" v-model="form.tel" />
        </div>
        <div>
            <label for="postcode" >우편번호</label>
            <input type="text" id="postcode" v-model="form.postcode" />
            <input type="button"@click="search()" value="검색"><br>
        </div>
        <div>
            <label for="address" >도로명 주소</label>
            <input type="text" id="roadAddress" v-model="form.address" placeholder="도로명주소"/>
        </div>
        <div>
            <label for="detailAddress" >상세주소</label>
            <input type="text" id="detailAddress" v-model="form.detail_address" />
        </div>
        <button  class="btn btn-primary">회원가입</button>
    </div>
</template>

<script>
// import axios from "axios";

export default {
    data() {
        return {
            form : { },
    };
},



name: "Address",
    methods : {
        search(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            new window.daum.Postcode({
            oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("roadAddress").value = roadAddr;
                document.getElementById("jibunAddress").value = data.roadAddr;
                
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                if(roadAddr !== ''){
                    document.getElementById("extraAddress").value = extraRoadAddr;
                } else {
                    document.getElementById("extraAddress").value = '';
                }

                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
            
        }).open();
    }
    }




    // created () {
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
    // },


}
</script>

<style>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}
</style>

