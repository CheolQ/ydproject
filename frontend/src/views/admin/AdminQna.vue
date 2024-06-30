<template>
    <div>
        <ContentHeader title="QnA"></ContentHeader>
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
                            <td><button type="button" class="btn btn-primary" @click="prodInfo(q.board_no)">조회</button></td>
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
export default {
    mixins : [Paging],
    components: {
            PagingComponent, ContentHeader
        },
    data() {
        return {
            qnaList: [],
            page: {},
            pageUnit: 5,
        }
    },
    created(){
        this.goPage(1);
    },
    methods: {
        goPage(page){
            axios.get(`/api/adminQna?pageUnit=${this.pageUnit}&page=${page}`)
            .then(result=>{
                this.qnaList = result.data.list;
                this.page = page;
                this.page = this.pageCalc(page, result.data.count[0].cnt, 5, this.pageUnit);
            })
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