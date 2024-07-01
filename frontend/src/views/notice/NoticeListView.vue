<template>
	<div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">Notice</h1>
 			<table class ="table	table-hover">
 	  	 		<thead>
 	      			<tr>
						<th>NO.</th>
						<th style="width:75%">CONTENT</th>
 	    				<th>NAME</th>
 	      				<th>DATE</th>
 	    			</tr>
 	     		</thead>
 	     		<tbody>
 	   				<tr :key ="i" v-for ="(notice, i) in noticeList" @click ="goToDetail(notice.notice_no)">
 	    				<td>{{notice.notice_no}}</td>
 	   		 			<td>{{notice.title }}</td>
 	   		 			<td>{{notice.user_id }}</td>
 	   		 			<td>{{getDateFormat(notice.create_date) }}</td>
 	   				</tr>
 	  			</tbody>
 	 		</table>
			<div class ="wrbtn">
			  <a href="#" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
				Write</a>
			</div>

 		</div>
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
			console.log('번호',no);
 	  		this.$router.push({	path:"/noticeinfo",	query: {no:no }	});
 	 	},
		getDateFormat(val )	{
    		let date = val == '' ? new Date() : new Date(val);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
 	 },
    }
}
</script>

<style>
.wrbtn{
	margin-left: 1000px;
}
</style>