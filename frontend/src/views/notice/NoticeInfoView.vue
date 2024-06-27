<template>
    <div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
         <h3>상세화면</h3>
         <div class="row">
            <div class="col-md-12 border p-3">
         <table class="table table-spride table-hover border">
            <thead>
            <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>내용</th>
             </tr>
        </thead>
        <tbody>
            <tr>
                <td scope ="col"class ="text-center">{{noticeInfo.title }}</td>
                <td scope ="col"class ="text-center">{{noticeInfo.user_id }}</td>
                <td scope ="col"class ="text-center">{{noticeInfo.create_date }}</td>
                <td scope ="col"class ="text-center">{{noticeInfo.content }}</td>
            </tr>
        </tbody>
            </table>
     </div>
     </div>
     <button @click="goToList">목록</button>
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
 	//  getDateFormat(date )	{
 	//   return this .$dateFormat(date );
 	//  },


 	 goToList( ){
 	  this.$router.push({ path:"/user/notice"});
 	 },
 	},
 	
};
</script>
<style>
</style>