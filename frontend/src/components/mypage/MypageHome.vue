<template>
    <div id="mypage">
        <h5 id="mypage-sub">마이페이지</h5>
        <div class="info-wrap" v-if="user.name">
            <div class="info">
                <div class="user">
                    <div class="user-info">
                        <p class="user-name">{{ user.name }}[{{ user.user_id }}]님</p>
                        <div class="box">
                            <dl>
                                <dt>전 &nbsp;&nbsp;&nbsp; 화</dt>
                                <dd>{{ user.tel }}</dd>
                            </dl>
                            <dl>
                                <dt>이 메 일</dt>
                                <dd>{{ user.email }}</dd>
                            </dl>
                            <dl>
                                <dt>주 &nbsp;&nbsp;&nbsp; 소</dt>
                                <dd>{{ user.addr }}</dd> <br>
                            </dl>
                            <dl>
                                <dt>상 세 주 소</dt>
                                <dd>{{ user.detail_addr }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <dl class="order">
                    <dt class="tot">총 주문금액</dt>
                    <dd v-if="user.total_order_price == 'null'" class="tot"><strong>0</strong>원</dd>
                    <dd v-else class="tot"><strong>{{ user.total_order_price }}</strong>원</dd>
                    <dt>포 인 트</dt>
                    <dd v-if="user.point == 'null'"><strong>0</strong>원</dd>
                    <dd v-else><strong>{{ user.point }}</strong>원</dd>
                </dl>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p> <!-- 로딩 중 메시지 -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            user: {
                name: null,
                user_id: null,
                tel: null,
                email: null,
                addr: null,
                detail_addr: null,
                total_order_price: null,
                point: null
            }
        }
    },
    created() {
        axios.get(`/api/mypage/userinfo/`)
            .then(result => {
                // console.log(result.data);
                this.user = result.data[0] || this.user;
                this.user.total_order_price = this.numberFormat(this.user.total_order_price)
                this.user.point = this.numberFormat(this.user.point)
            })
            .catch(err => console.log(err))
    },
    methods: {
        numberFormat: function (number) {
            if (number == 0)
                return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
        }
    }

}
</script>

<style scoped>
#mypage-sub {
    width: 100%;
    text-align: left;
    margin-left: 15px;
    font-family: 'Noto Sans KR', sans-serif;
}

#mypage {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
}

#mypage .page-body {
    padding-top: 60px
}

/* 회원 정보 */
#mypage .info {
    border: 1px solid #e9e9e9;
    overflow: hidden
}

#mypage .info:after {
    display: block;
    clear: both;
    content: ''
}

#mypage .info .user,
#mypage .info .order {
    margin: 25px 0;
    float: left;
    min-height: 155px
}

#mypage .info .user {
    margin-left: 35px;
    position: relative;
    width: 720px;
    border-right: 1px dashed #e9e9e9
}

#mypage .info .user .user-img {
    position: absolute;
    top: 7px;
    left: 0;
    width: 140px;
    height: 140px;
}

#mypage .info .user .user-img img {
    width: 140px;
    height: 140px
}

#mypage .info .user .user-info {
    padding: 15px 0 0 30px
}

#mypage .info .user .user-info p {
    font-size: 15px;
    color: #202020
}

#mypage .info .user .user-info .box {
    padding-top: 10px
}

#mypage .info .user .user-info .box dl {
    padding-top: 10px;
}

#mypage .info .user .user-info .box dl:after {
    display: block;
    clear: both;
    content: ''
}

#mypage .info .user .user-info .box dl dt {
    float: left;
    width: 90px;
    font-size: 14px
}

#mypage .info .user .user-info .box dl dd {
    float: left;
    font-size: 14px;
    color: #8d8d8d
}


#mypage .info .order {
    padding: 10px 0 0 49px;
    float: left;
    width: 243px
}

#mypage .info .order dt,
#mypage .info .order dd {
    padding-top: 8px;
    float: left;
    font-size: 14px
}

#mypage .info .order dt {
    width: 45%;
    clear: both;
}

#mypage .info .order dd {
    width: 50%;
    text-align: right;
}

#mypage .info .order dd a {
    font-size: 14px;
    color: #8d8d8d
}

#mypage .info .order dd a:hover {
    text-decoration: underline;
}

#mypage .info .order .tot {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
}
</style>
