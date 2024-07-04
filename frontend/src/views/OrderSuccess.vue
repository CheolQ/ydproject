<template>
    <h2 class="aside-tit">ORDER COMPLETE</h2>
    <div id="mypage">
        <div class="page-body">
            <p style="margin-bottom: 60px;">주문이 완료되었습니다.<br>
                주문 내역은 <a href="/user/mypage/orderhistory/" style="font-weight: bold">My Page</a>에서 확인 가능합니다.<br>
                주문 후 배송은 2-3일 소요 됩니다.<br><br>
                <span style="">Thank you! Your order is completed.</span>
            </p>
        </div>
        <div>
            <button><router-link to="/user/mypage/orderhistory/" class="link">주문 내역으로 이동</router-link></button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{};
        },
        created(){
        },
        methods : {
        }
    }
</script>
<style scoped>
.link{
    color: black;
    font-weight: bold;
}
/* div {
  background-color: #f5d682;
  border: 1px solid red;
} */
#mypage {
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
}

#mypage .page-body {
    padding-top: 60px
}
</style>