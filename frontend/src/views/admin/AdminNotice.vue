<template>
    <div>
        <ContentHeader title="공지사항"></ContentHeader>
        <SearchForm title1="검색어" title2="주문기한" title3="주문상태" :Categorys="Categorys" @obj="searchfrom" ref="reset_com"></SearchForm>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button @click="prodSearchBtn" class="btn btn-primary">검색</button>        
            <button @click="resetBtn" class="btn btn-secondary">초기화</button>
        </div>
        <br>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">게시글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="n in noticeList" v-bind:key="n" @click="noticeInfo(n.notice_no)">
                            <th scope="row" v-if="n.category_code === 'F1'">공지</th>
                            <th scope="row" v-else>{{ n.notice_no }}</th>
                            <td>{{ n.title }}</td>
                            <td>{{ n.user_id }}</td>
                            <td>{{ getDateFormat(n.create_date) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-sm" @click="addNotice">글쓰기</button>
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
        ContentHeader, PagingComponent, SearchForm
    },
    data() {
        return {
            noticeList: [],
            page: {},
            pageUnit: 10,

            Categorys: [
                {category_code: 'F1', category_name: '공지', seqs: 1},
                {category_code: 'F2', category_name: '일반', seqs: 2}
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
            axios.get(`/api/adminNotice?pageUnit=${this.pageUnit}&page=${page}&name=${this.name}&date1=${this.date1}&date2=${this.date2}&category=${this.category}`)
            .then(result=>{
                this.noticeList = result.data.list;
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
        noticeInfo(no){
            this.$router.push({path: 'noticeInfo', query: {bno : no}})
        },
        addNotice(){
            this.$router.push({path: 'noticeForm'})
        },
        getDateFormat (date ){
 	        return this .$dateFormat (date );
 	    },
    }
}    
</script>

<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>

