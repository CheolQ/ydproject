<template>
    <div class ="container">
 		<table class ="table	table-hover">
 	  	 <thead>
 	      <tr>
			<th>NO.</th>
			<th>CONTENT</th>
 	    	<th>NAME</th>
 	      	<th>DATE</th>
 	      </tr>
 	     </thead>
 	     <tbody>
 	   <tr :key ="i" v-for ="(notice, i) in noticeList" @click ="goToDetail(notice.NOTICE_NO)">
 	    <td>{{notice.NOTICE_NO}}</td>
 	    <td>{{notice.TITLE }}</td>
 	    <td>{{notice.USER_ID }}</td>
 	    <td>{{notice.CREATE_DATE }}</td>


 	    

 	   </tr>
 	  </tbody>
 	 </table>
 	</div>
</template>

<script>
import axios from "axios";
export default { 
    data() { 
        return {
			noticeList: [],
        }
    },
    created() {
		this.getNoticeList();
    },
    methods: {
		async getNoticeList()	{
 	  	let result =	await axios.get(`/api/notice`);
 	  	this.noticeList =	result.data ;
 	 	},
	 	goToDetail(no)	{
 	  	this.$router.push({	path:"/noticeinfo",	query: {no:no }	});
 	 	},
    }
}
</script>

<style>
</style>