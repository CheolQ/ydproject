<template>
    <div>
        <ContentHeader title="QnA"></ContentHeader>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class="table" v-for="q in qnaInfo" :key="q">
                    <tbody>
                        <tr>
                            <th scope="row">작성자</th>
                            <td>{{ q.user_id }}</td>
                        </tr>
                        <tr>
                            <th scope="row">등록일</th>
                            <td>{{getDateFormat( q.create_date )}}</td>
                        </tr>
                        <tr>
                            <th scope="row">진행상태</th>
                            <td v-if="q.cnt == 0">답변대기</td>
                            <td v-else>답변완료</td>
                        </tr>
                        <tr>
                            <th scope="row">질문제목</th>
                            <td>{{ q.title }}</td>
                        </tr>
                        <tr>
                            <th scope="row">질문내용</th>
                            <td>{{ q.content }}</td>
                        </tr>
                        <tr>
                            <th scope="row" colspan="2">
                                <div class="mb-3">
                                    <label for="Textarea1" class="form-label">답변</label>
                                    <textarea class="form-control" id="Textarea1" rows="3" v-model="replys"></textarea>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button @click="qnaReg" class="btn btn-primary" v-if="check == 0">등록</button>
            <button @click="qnaUpdate" class="btn btn-primary" v-if="check == 1">수정</button>    
            <button @click="qnaCancel" class="btn btn-secondary">취소</button>
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
    data(){ 
        return {
            qnaInfo: {},
            qnaNo: 1,
            check: 0,
            replys: '',
        }; 
    },
    created(){
        this.qnaNo = this.$route.query.bno
        this.qnaLists();
    },
    methods: {
        qnaLists(){
            axios.get(`/api/adminQna/${this.qnaNo}`)
            .then(result=>{
                this.qnaInfo = result.data;
                this.check = this.qnaInfo[0].cnt;
                this.replys = this.qnaInfo[0].reply_content
            })
            .catch(err => console.log(err))
        },
        qnaReg(){
            console.log(this.replys);
            axios.post(`/api/adminQna/${this.qnaNo}`, {replys: this.replys})
            .then(()=> {
                alert("등록되었습니다")
                this.qnaLists();
            })
            .catch((err)=> console.log(err))
        },
        qnaUpdate(){
            axios.put(`/api/adminQna/${this.qnaNo}`, {replys: this.replys})
            .then(()=> {
                alert("수정되었습니다")
                this.qnaLists();
            })
            .catch((err)=> console.log(err))
        },
        qnaCancel(){
            this.$router.go(-1);
        },
        getDateFormat (date ){
 	        return this .$dateFormat (date );
 	    },
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>