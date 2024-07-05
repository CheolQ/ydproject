<template>
	<div class="col-lg-12" v-show="!isSelected">
        <div class="tab-content mb-5">
			<div class ="container">
				<div class="col-lg-6">
					<h4 class="fw-bold mb-3">Review</h4>
				</div>
				<div v-if="this.reviewList[0] == undefined"><h6>리뷰없음</h6> </div>
 					<table class ="table table-hover" v-else>
						<thead>
					   		<tr>
								<th style="width:60%">TITLE</th>
								<th>NAME</th>
								<th>DATE</th>
								<th>Rating</th>
					   		</tr>
					  	</thead>
					  	<tbody >
							<tr  @click= "goToReview(review.review_no)" :key ="i" v-for ="(review, i) in reviewList">
					 			<td>{{review.review_title }}</td>
					 			<td>{{review.user_id }}</td>
					 			<td>{{getDateFormat(review.create_date) }}</td>
					 			<td v-if="review.rating != undefined">
								<i :key = "i" v-for="(i) in Number(review.rating)" class="fa fa-star text-secondary"></i>
                        		<i :key = "i" v-for="(i) in 5- Number(review.rating)"class="fa fa-star"></i>
					 			</td>
							</tr>
				   		</tbody>
				  	</table>
				<paging v-bind="page" @go-page="goPage" />
			</div>
        </div>
	</div>
	<ReviewInfo v-if="isSelected" :no="reviewInfo.no" :prodNo="reviewInfo.prodNo" @goToList="displayList"/>
</template>

<script>
import PageMixin from '@/mixin';
import axios from "axios";
import paging from "@/components/Paging.vue"
import Swal from "sweetalert2";
import prodDetail from "@/components/ProdDetail.vue"
import ReviewInfo from "@/components/ReviewInfo.vue"

export default { 
	mixins: [PageMixin],
    components: { paging, prodDetail, ReviewInfo },
    data() { 
        return {
            searchNo:"",
			reviewList: [],
			prodList: [],
			page: {},
            pageUnit: 5,
			isSelected : false,
			reviewInfo : {
				no : null,
				prodNo : null
			}
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
		this.getProdList();
		this.goPage(1);

    },
	computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
	},
    methods: {
		async goPage(page) {
            let pageUnit = this.pageUnit;
            let result =(await axios.get(`/api/shop/review/${this.searchNo}?pageUnit=${pageUnit}&page=${page}`));
            this.reviewList = result.data.list;
            console.log(this.page)
            this.page = this.pageCalc(page, result.data.count, 5, pageUnit)
        },
		async getProdList()	{
 	  	let result =	await axios.get(`/api/shop/${this.searchNo}`);
 	  	this.prodList =	result.data[0] ;
 	 	},
        // async getReviewList()	{
 	  	// this.reviewList = (await axios.get(`/api/shop/review/${this.searchNo}`)).data ;	 	
  		// },
		// async getQnaList()	{
 	  	// 	this.qnaList = (await axios.get(`/api/shop/qna/${this.searchNo}`)).data ;	
    	// },
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

		 goToReview(no)	{
 	  		//this.$router.push({	name:"reviewinfo",	query: { no : no, prodNo : this.searchNo }	});
			this.reviewInfo.no = no;
			this.reviewInfo.prodNo = this.searchNo;
			this.isSelected = true;
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