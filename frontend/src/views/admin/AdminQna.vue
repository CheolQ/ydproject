<template>
    <div>
        <ContentHeader title="QnA"></ContentHeader>
        <SearchForm title1="검색어" title2="작성일자" title3="진행상태" :Categorys="Categorys" @obj="searchfrom" ref="reset_com"></SearchForm>
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
                            <th scope="col">게시글번호</th>
                            <th scope="col">상품번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일자</th>
                            <th scope="col">진행상태</th>
                            <th scope="col">상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="q in qnaList" v-bind:key="q">
                            <th scope="row">{{ q.board_no }}</th>
                            <td>{{ q.prod_no }}</td>
                            <td>{{ q.title }}</td>
                            <td>{{ q.user_id }}</td>
                            <td>{{ getDateFormat(q.create_date) }}</td>
                            <td v-if="q.cnt == 0">답변대기</td>
                            <td v-else>답변완료</td>
                            <td><button type="button" class="btn btn-primary btn-sm" @click="qnaInfo(q.board_no)">조회</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <paging-component v-bind="page" @go-page="goPage"/>
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
            qnaList: [],
            page: {},
            pageUnit: 5,

            Categorys: [
                {category_code: '1', category_name: '답변완료', seqs: 1},
                {category_code: '0', category_name: '답변대기', seqs: 2}
            ],

            name: '',
            date1: '',
            date2: '',
            category: '',
        }
    },
    created(){
        this.goPage(1);
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminQna?pageUnit=${this.pageUnit}&page=${page}&name=${this.name}&date1=${this.date1}&date2=${this.date2}&category=${this.category}`)
            .then(result=>{
                this.qnaList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
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
        qnaInfo(no){
            this.$router.push({path : 'qnaInfo', query:{bno: no}})
        },
        getDateFormat (date ){
 	        return this .$dateFormat (date );
 	    },
    }
}
</script>

<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>