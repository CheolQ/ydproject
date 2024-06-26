<template>
    <div>
        <div class="card mb-4">
            <div class="card-body shadow">회원조회</div>
        </div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">이름</th>
                            <th scope="col">아이디</th>
                            <th scope="col">주소</th>
                            <th scope="col">등급</th>
                            <th scope="col">적립금</th>
                            <th scope="col">누적 구매금액</th>
                            <th scope="col">가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td><button>보기</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>        
</template>
<script>
export default {
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
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>