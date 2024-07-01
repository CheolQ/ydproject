<template>
    <div>
        <ContentHeader title="공지사항"></ContentHeader>
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
                            <th scope="row">{{ n.notice_no }}</th>
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
export default {
    mixins : [Paging],
    components: {
        ContentHeader, PagingComponent
    },
    data() {
        return {
            noticeList: [],
            page: {},
            pageUnit: 5,
        }
    },
    created(){
        this.goPage(1);
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminNotice?pageUnit=${this.pageUnit}&page=${page}`)
            .then(result=>{
                this.noticeList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
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

