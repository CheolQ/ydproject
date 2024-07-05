<template>
	<div class="col-lg-12" v-show="!isSelected">
		<div class="col-lg-12">
        	<div class="tab-content mb-5">
				<div class ="container">
					<div class="col-lg-6">
						<h4 class="fw-bold mb-3">QnA</h4>
					</div>
					<div v-if="this.qnaList[0] == undefined">
						<h6>문의없음</h6>
					</div>
			 		<table class ="table table-hover" v-else>
						<thead>
			   				<tr>
								<th style="width:60%">TITLE</th>
								<th>NAME</th>
								<th>DATE</th>
								<th>UPDATE DATE</th>
								<th>REPLY</th>
			   				</tr>
			  			</thead>
			  			<tbody>
							<tr @click= "goToQna(qna.board_no, qna.user_id)"  :key ="i" v-for ="(qna, i) in qnaList" >
								 <td>{{qna.title }}</td>
								 <td>{{qna.user_id }}</td>
								 <td>{{getDateFormat(qna.create_date) }}</td>
								 <td v-if="qna.create_date != qna.update_date">{{getDateFormat(qna.update_date) }}</td>
								 <td v-else> - </td>
								 <td v-if="qna.reply_no == null">X</td>
								 <td v-else>O</td>
							</tr>
						</tbody>
		  			</table>
					<div v-if="!this.loggedInUserId">ddd</div>
		  			<div v-else>
						<button @click="goToInsert" class="btnq border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
						Write</button>
					</div>
					<paging v-bind="page" @go-page="goPage" />
				</div>
       		</div>
		</div>
	</div>
	<qnaInfo v-if="isSelected" :no="qnaInfo.no" :prodNo="qnaInfo.prodNo" @goToList="displayList"/>
</template>

<script>
import PageMixin from '@/mixin';
import axios from "axios";
import paging from "@/components/Paging.vue"
import Swal from "sweetalert2";
import prodDetail from "@/components/ProdDetail.vue"
import qnaInfo from "@/components/QnAInfo.vue"

export default { 
	mixins: [PageMixin],
    components: { paging, prodDetail, qnaInfo },
    data() { 
        return {
            searchNo:"",
			qnaList:[],
			prodList: [],
			page: {},
            pageUnit: 5,
			isSelected : false,
			qnaInfo : {
				no : null,
				prodNo : null
			}
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
		this.getProdList();
		this.goPage(1)
    },
	computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
	},
    methods: {
		async goPage(page) {
			console.log(this.loggedInUserId,'11아이디먼데')
            let pageUnit = this.pageUnit;
            let result =(await axios.get(`/api/shop/qna/${this.searchNo}?pageUnit=${pageUnit}&page=${page}`));
            this.qnaList = result.data.list;
            console.log(this.page)
            this.page = this.pageCalc(page, result.data.count, 5, pageUnit)
        },
		async getProdList()	{
			console.log(this.loggedInUserId,'22아이디먼데')
 	  		let result =	await axios.get(`/api/shop/${this.searchNo}`);
 	  		this.prodList =	result.data[0] ;
 	 	},
		goToInsert( ){
			if(this.loggedInUserId){
 		  	this.$router.push({ name:"qna", query:{no : this.searchNo}});
			}
            else{
                Swal.fire({
                    title: '로그인이 필요합니다.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                })
            }
 		 },
		getDateFormat(val )	{
    	    let date = val == '' ? new Date() : new Date(val);
    	    let year = date.getFullYear();
    	    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    	    let day = ('0' + date.getDate()).slice(-2);
    	    return `${year}-${month}-${day}`;
 		 },
		 goToQna(no, userId)	{
			if(this.loggedInUserId == userId){
				this.qnaInfo.no = no;
				this.qnaInfo.prodNo = this.searchNo;
				this.isSelected = true;
			}
			else{
                Swal.fire({
                    title: '비밀글 입니다.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                })
            }
 		},
		 displayList(){
			this.isSelected = false;
		}
	}
}	

</script>

<style>
.btnq{
	margin-left: 700px;
}
</style>