<template>
    <div>
        <div id="aside">
            <h2 class="aside-tit">MY PAGE</h2>
            <div class="lnb-wrap">
                <div class="lnb-bx">
                    <h2 class="txt txt1">SHOPPING INFO</h2>
                    <div class="lnb">
                        <ul>
                            <li class="first">
                                <router-link to="/user/mypage/orderhistory/" class="aHover">주문내역</router-link>
                            </li>
                            <li>
                                <router-link to="/user/mypage/mypagepoint/">포인트내역</router-link>
                            </li>
                            <li>
                                <router-link to="/user/mypage/mywishlist/">관심상품</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="lnb-bx">
                    <h2 class="txt txt2">SHOPPING QUESTION</h2>
                    <div class="lnb">
                        <ul>
                            <li class="first">
                                <router-link to="/user/mypage/mypageqna/">문의내역</router-link>
                            </li>
                            <li>
                                <router-link to="/user/mypage/mypagereview/">후기관리</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="lnb-bx">
                    <h2 class="txt txt3">CUSTOMER INFO</h2>
                    <div class="lnb">
                        <ul>
                            <li class="first">
                                <router-link to="/user/UserModify/">회원정보변경</router-link>
                            </li>
                            <li>
                                <router-link to="/user/UserDelete/">회원탈퇴</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: String
        }
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style scoped>
#aside {
    position: relative;
    overflow: hidden
}

#aside .aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}

/* lnb */
#aside .lnb-wrap {
    padding: 19px 0;
    border: 1px solid #000;
    ;
    overflow: hidden;
}

#aside .lnb-wrap:after {
    display: block;
    clear: both;
    content: ''
}

#aside .lnb-wrap .lnb-bx {
    margin-left: -1px;
    padding-left: 20px;
    float: left;
    width: 367px;
    min-height: 130px;
    border-left: 1px solid #e2e2e2;
    overflow: hidden
}

#aside .lnb-wrap .lnb-bx .txt {
    margin-top: 14px;
    padding-left: 27px;
    height: 18px;
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
}

#aside .lnb-wrap .lnb-bx .txt1 {
    background-position: 0 0;
    padding-left: 0px;
}

#aside .lnb-wrap .lnb-bx .txt2 {
    background-position: 0 -18px;
    padding-left: 0px;
}

#aside .lnb-wrap .lnb-bx .txt3 {
    background-position: 0 -36px;
    padding-left: 0px;
}

#aside .lnb-wrap .lnb {
    overflow: hidden
}

#aside .lnb-wrap .lnb ul {
    margin-left: -10px;
    padding-top: 20px;
    list-style: none;
}

#aside .lnb-wrap .lnb ul:after {
    display: block;
    clear: both;
    content: ''
}

#aside .lnb-wrap .lnb ul li {
    padding: 5px 0;
    float: left;
    white-space: nowrap
}

#aside .lnb-wrap .lnb ul li a {
    padding: 0 35px;
    font-size: 16px;
    color: #8d8d8d;
    color: #000 !important;
}

#aside .lnb-wrap .lnb ul li a:hover {
    color: #ffb524 !important;
}
</style>