<template>
    <div>
        <ContentHeader title="공지사항"></ContentHeader>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">제목</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">내용</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <input class="form-control" type="file" id="formFile"  accept="image/*">
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="noticeReg" class="btn btn-primary btn-lg">등록</button>        
            <button @click="noticeCancel" class="btn btn-secondary btn-lg">취소</button>
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
        return{}
    },
    methods:{
        noticeCancel(){
            
        },
        noticeReg(){

        }
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>