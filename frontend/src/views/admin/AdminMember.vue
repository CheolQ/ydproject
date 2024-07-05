<template>
    <div>
        <ContentHeader title="회원조회"></ContentHeader>
        <SearchForm title1="검색어" title2="가입일" title3="권한" :Categorys="Categorys" @obj="searchfrom" ref="reset_com"></SearchForm>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button @click="prodSearchBtn" class="btn btn-primary">검색</button>        
            <button @click="resetBtn" class="btn btn-secondary">초기화</button>
        </div>
        <br>
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
                            <th scope="col">누적 구매금액</th>
                            <th scope="col">가입일</th>
                            <th>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in userList" v-bind:key="user">
                            <th scope="row">{{ user.user_no }}</th>
                            <td>{{user.user_id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.resp}}</td>
                            <td>{{getNumberFormat(user.point)}}p</td>
                            <td>{{ getNumberFormat(user.price) }}</td>
                            <td>{{getDateFormat(user.hiredate)}}</td>
                            <td><button @click="modalOpen(user.user_id)" class="btn btn-primary">조회</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <paging-component v-bind="page" @go-page="goPage"/>
        <div class="modal-wrap" v-show="modalCheck">
        <div class="modal-container">
            <div class="row">
                <div class="col-md-12 col-lg-6">
                    <h3>QnA</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">상품명</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="qna in qnas" :key="qna">
                                <th scope="row">{{ qna.board_no }}</th>
                                <td>{{ shortenWords(qna.prod_name) }}</td>
                                <td>{{ qna.title }}</td>
                                <td>{{ getDateFormat(qna.create_date) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-12 col-lg-6">
                    <h3>리뷰</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">상품명</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성일</th>
                                <th scope="col">점수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="review in reviews" :key="review">
                                <th scope="row">{{ review.review_no }}</th>
                                <td>{{ review.prod_name}}</td>
                                <td>{{ review.review_title }}</td>
                                <td>{{ review.create_date }}</td>
                                <td>{{ getDateFormat(review.rating) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-btn">
                <button type="button" class="btn btn-secondary" @click="modalOpen">닫기</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Paging from "../../mixin";
import axios from 'axios';
import PagingComponent from '@/components/Paging.vue'
import ContentHeader from '@/components/admin/ContentHeader.vue'
import SearchForm from '@/components/admin/SearchForm.vue'
export default {
    mixins : [Paging],
    components: {
        PagingComponent, ContentHeader, SearchForm
    },
    data() {
        return {
            modalCheck: false,
            userList: [],
            page: {},
            pageUnit: 10,

            Categorys: [
                {category_code: 'b2', category_name: '회원', seqs: 1},
                {category_code: 'b1', category_name: '관리자', seqs: 2}
            ],
            name: '',
            date1: '',
            date2: '',
            category: '',

            qnas: [],
            reviews: [],
        }
    },
    created() {
        this.goPage(1);
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminMember?pageUnit=${this.pageUnit}&page=${page}&name=${this.name}&date1=${this.date1}&date2=${this.date2}&category=${this.category}`)
            .then(result => {
                this.userList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
            .catch(err => console.log(err))
        },
        prodSearchBtn(){
            this.goPage(1);
        },
        resetBtn(){
            this.$refs.reset_com.test2();
            this.goPage(1);
        },
        searchfrom(name, date1, date2, category){
            this.name = name;
            this.date1 = date1;
            this.date2 = date2;
            this.category = category;
        },
        getDateFormat (date ){
 	        return this .$dateFormat (date );
 	    },
        getNumberFormat (number ){
            return this .$numberFormat (number );
        },
        modalOpen(id) {
            this.modalCheck = !this.modalCheck;
            axios.get(`/api/adminMember/${id}`)
            .then(result => {
                console.log(result.data.qna)
                this.qnas = result.data.qna;
                console.log(result.data.review)
                this.reviews = result.data.review;
            })
            .catch(err => console.log(err))
        },
        shortenWords(str, length = 10){
            let result = '';
            if (str.length > length) {
                result = str.substr(0, length - 2) + '...';
            } else {
                result = str;
            }
            return result;
        },
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>