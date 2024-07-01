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
                </thead>
                <tbody>
                    <tr>
                        <td scope ="col"class ="text-center"  colspan="7">{{noticeInfo.content }} <br>
                        <img :src="`/img/prodImg/${noticeInfo.file_name}.jpg`" class="img-fluid rounded" alt="Image">
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
 	 };
 	},
 	created()	{
 	 this.searchNo = this.$route.query.no ;
 	 this.getNoticeInfo();
 	},
 	methods: {
 	 async getNoticeInfo()	{
 	  this.noticeInfo = (await axios.get(`/api/notice/${this.searchNo}`)).data[0];
 	 },
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