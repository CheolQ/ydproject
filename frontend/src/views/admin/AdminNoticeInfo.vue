<template>
    <div>
        <ContentHeader title="공지사항"></ContentHeader>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class ="table width:100%">
                    <thead>
                        <tr class="tr1">
                            <th class="thwidth">제목</th>
                            <td scope ="col"  colspan="4">{{noticeInfo.title }}</td>
                            <th class ="thwidth">작성일</th>
                            <td scope ="col" class="thwidth">{{getDateFormat(noticeInfo.create_date)}}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td scope ="col" class="dd" colspan="6">{{noticeInfo.user_id }}</td>  
                        </tr>        
                    </thead>
                    <tbody>
                        <tr>
                            <td scope ="col" class="text-center"  colspan="7">
                                <span>{{noticeInfo.content }}</span>
                            </td>
                        </tr>
                    </tbody>               
                </table>
            </div>
        </div> 
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="noticeModify" class="btn btn-primary">수정</button>        
            <button @click="noticeDelete" class="btn btn-secondary">삭제</button>
        </div>   
    </div>
</template>
<script>
import Paging from "../../mixin";
import axios from 'axios';

import ContentHeader from '@/components/admin/ContentHeader.vue'
export default {
    mixins : [Paging],
    components: {
        ContentHeader
    },
    data() {
        return{
            noticeInfo: {},
            bno: 1,
        }
    },
    created(){
        this.bno = this.$route.query.bno;
        axios.get(`/api/notice/${this.bno}`)
        .then( result=> this.noticeInfo = result.data[0])
        .catch(err=> console.log(err))
        console.log(this.noticeInfo);
    },
    methods: {
        noticeModify(){
            this.$router.push({path: 'noticeModify', query: {bno: this.bno}})
        },
        noticeDelete(){
            axios.delete(`/api/adminNotice/${this.bno}`)
            .then(()=> {
                if(confirm("삭제하시겠습니까?")){
                    alert("정상적으로 삭제되었습니다")
                    this.$router.push({path: 'notice'})
                }
            })
            .catch(err=> console.log(err))
        },
        getDateFormat (date ){
            return this .$dateFormat (date );
        },
    },
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>