<template>
    <div id="mypage">
        <div class="page-body">
            <h5 id="mypage-sub">주문내역</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            번호
                        </th>
                        <th>
                            주문일
                        </th>
                        <th>
                            상품명
                        </th>
                        <th>
                            결제금액
                        </th>
                        <th>
                            주문처리상태
                        </th>
                        <th>
                            주문상세
                        </th>
                        <th>
                            재구매
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            asdas
                        </td>
                        <td>
                            asdas
                        </td>
                        <td>
                            asdas
                        </td>
                        <td>
                            asdas
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm">주문상세</button>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm">재구매</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            orderList: []
        }
    },
    created() {
        axios.get(`/api/`)
            .then((result) => {

            })
    },
    methods: {

    }
}
</script>

<style>
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

table {
    font-family: 'Noto Sans KR', sans-serif;
}
</style>