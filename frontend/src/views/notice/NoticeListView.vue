<template>
	<div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">Notice</h1>
			<div class="col-xl-3">
                         <div class="input-group w-100 mx-auto d-flex">
                             <input type="search" v-model="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                             <span id="search-icon-1" class="input-group-text p-3" @click="searchBtn"><i class="fa fa-search"></i></span>
                         </div>
                     </div>
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
			<paging v-bind="page" @go-page="goPage"/>
 		</div>
	</div>
</template>

<script>
import PageMixin from '../../mixin';
import axios from "axios";
import paging from "@/components/Paging.vue"
export default { 
	mixins : [PageMixin],
	components:{paging},
    data() { 
        return {
			noticeList: [],
			page:{},
			pageUnit:9,
			search: '',
        }
    },
    created() {
		this.getNoticeList();
		this.goPage(1)    
    },
    methods: {
		async goPage(page){
                let pageUnit = this.pageUnit;
                let result = await axios.get(`/api/notice?pageUnit=${pageUnit}&page=${page}&search=${this.search}`)
                this.noticeList = result.data.list;
                console.log(this.page)
                this.page = this.pageCalc(page, result.data.count,5,pageUnit)
        
            },
		async getNoticeList()	{
 	  		let result =	await axios.get(`/api/notice`);
 	  		this.noticeList =	result.data ;
 	 	},
	 	goToDetail(no)	{
			console.log('번호',no);
 	  		this.$router.push({	path:"noticeinfo",	query: {no:no }	});
 	 	},
		getDateFormat(val )	{
    		let date = val == '' ? new Date() : new Date(val);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
 	 	},
		searchBtn(){
			this.goPage(1);
		}
    }
}
</script>

<style>
.wrbtn{
	margin-left: 1000px;
}
</style>