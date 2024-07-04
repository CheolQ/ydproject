<template>
    <div>
        <ContentHeader title="공지수정"></ContentHeader>
        <div class="card mb-4">
            <div class="card-body shadow">
                <table class ="table width:100%">
                    <thead>
                        <tr class="tr1">
                            <th class="thwidth">제목</th>
                            <td scope ="col"  colspan="4"><input type="text" v-model="noticeInfo.title"></td>
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
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="noticeInfo.content"></textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>               
                </table>
                <div class="mb-3">
                    <input multiple @change="upload" ref="imageFile" class="form-control" type="file" id="formFile"  accept="image/*">
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="noticeModify" class="btn btn-primary">수정</button>        
            <button @click="$router.go(-1)" class="btn btn-secondary">취소</button>
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
        return {
            noticeInfo: {},
            imgFile: [],
            bno: 1,
        }
    },
    created(){
        this.bno = this.$route.query.bno;
        axios.get(`/api/notice/${this.bno}`)
        .then( result=> this.noticeInfo = result.data[0])
        .catch(err=> console.log(err))
    },
    methods:{
        upload() {
            this.imgFile = [];
            const files = Array.from(this.$refs.imageFile.files);
            this.imgFile = [...this.imgFile, ...files];
            console.log(this.imgFile);
        },
        async noticeModify(){
            let data = new FormData();
            for (let i = 0; i< this.imgFile.length; i++) {
                data.append("files", this.imgFile[i]);
            }
            data.append("title", this.noticeInfo.title);
            data.append("content", this.noticeInfo.content);
            await axios.post(`/api/adminNotice/${this.bno}`, data,
                { headers:{'Content-Type':'multipart/form-data'}}
            )
            .then(() => {
                alert("수정완료");
                this.$router.push({path: 'noticeInfo', query: {bno : this.bno}})
            })
            .catch(err=> console.log(err))
        },
        getDateFormat (date ){
            return this .$dateFormat (date );
        },
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>