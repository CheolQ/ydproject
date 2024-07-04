<template>
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">Notice</h1>
 			<table class ="table width:100%">
                <thead>
                    <tr class="tr1">
                        <th class="thwidth">제목</th>
                        <td scope ="col"  colspan="4">{{noticeInfo.title }}</td>
                        <th class ="thwidth">작성일</th>
                        <td scope ="col"class ="thwidth">{{getDateFormat(noticeInfo.create_date) }}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td scope ="col" class ="dd" colspan="6">{{noticeInfo.user_id }}</td>                 
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td colspan="6">
                            <a v-for="(file, index) in files" :key="index" :href="`/api/upload/notice/${file.file_name}`" download>다운로드</a>
                        </td>
                    </tr>        
                </thead>
                <tbody>
                    <tr>
                        <td scope ="col" class="text-center"  colspan="7">
                            <span>{{noticeInfo.content }}</span>
                            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active" v-for="(image, index) in images" :key="index">
                                        <img :src="`/api/upload/notice/${image.file_name}`" class="d-block w-100" alt="...">
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>               
            </table>
        </div>
        <button @click="goToList" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
            List</button>
       
    </div>
</template>

<script	>
import axios from "axios";
export	default {
 	data ()	{
 	 return {
 	    searchNo:"",
 	    noticeInfo: {},
        images: [],
        files: [],
 	 };
 	},
 	created()	{
 	    this.searchNo = this.$route.query.no ;
 	    axios.get(`/api/adminNotice/info/${this.searchNo}`)
        .then(result=>{
            this.noticeInfo = result.data.list[0];
            this.images = result.data.img;
            this.files = result.data.files;
        })
        .catch(err=> console.log(err))
 	},
 	methods: {
     getDateFormat(val )	{
        let date = val == '' ? new Date() : new Date(val);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
 	 },
 	 goToList( ){
 	  this.$router.push({ path:"/user/notice"});
 	 },
 	},
};
</script>
<style>
.thw{
    width: 70%;
}
.thwidth{
    width: 10%;
}
.dd{
   text-align: left;
}
</style>