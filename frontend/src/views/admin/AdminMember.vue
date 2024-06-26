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
                            <th scope="col">아이디</th>
                            <th scope="col">이름</th>
                            <th scope="col">권한</th>
                            <th scope="col">적립금</th>
                            <!-- <th scope="col">누적 구매금액</th> -->
                            <th scope="col">가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in userList" v-bind:key="user">
                            <th scope="row">{{ user.user_no }}</th>
                            <td>{{user.user_id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.resp}}</td>
                            <td>{{user.point}}</td>
                            <td>{{user.hiredate}}</td>
                        </tr>
                    </tbody>
                </table>
                <paging-component v-bind="page" @go-page="goPage"/>
            </div>
        </div>
    </div>        
</template>
<script>
import Paging from "../../mixin";
import axios from 'axios';
import PagingComponent from '@/components/Paging.vue'
export default {
    mixins : [Paging],
    components: {
        PagingComponent
    },
    data() {
        return {
            userList: [],
            page: {},
            pageUnit: 5,
        }
    },
    created() {
        this.goPage(1);
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminMember?pageUnit=${this.pageUnit}&page=${page}`)
            .then(result => {
                this.userList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
            .catch(err => console.log(err))
        }
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>