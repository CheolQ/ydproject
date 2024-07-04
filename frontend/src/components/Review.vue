<template>
	<div class="col-lg-12">
		<nav>
            <div class="nav nav-tabs mb-3">
                <button class="nav-link active border-white border-bottom-0" type="button" role="tab"
                    id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                    aria-controls="nav-about" aria-selected="true">Description</button>
                <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                    id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                    aria-controls="nav-mission" aria-selected="false">Reviews</button>
				<button class="nav-link border-white border-bottom-0" type="button" role="tab"
                    id="nav-qna-tab" data-bs-toggle="tab" data-bs-target="#nav-qna"
                    aria-controls="nav-qna" aria-selected="false">QnA</button>
            </div>
        </nav>
        <div class="tab-content mb-5">
            <div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
				<div class="fruite-img">
                    <img :src="`/img/prodImg/${prodList.detail_img}`"  class="img-fluid w-100 rounded-top" alt="">
                </div>
            </div>
            <div class="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
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
				  <paging v-bind="rpage" @go-page="rgoPage" />
				 </div>
            </div>
			<div class="tab-pane" id="nav-qna" role="tabpanel" aria-labelledby="nav-qna-tab">
				<div class ="container">
					<div class="col-lg-6">
					<h4 class="fw-bold mb-3">QnA</h4>
					</div>
					<div v-if="this.qnaList[0] == undefined"><h6>문의없음</h6> </div>
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
					<tr @click= "goToQna(qna.board_no)"  :key ="i" v-for ="(qna, i) in qnaList" >
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
				  <button @click="goToInsert" class="btnq border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
					Write</button>
					<!-- <QnaInfo /> -->
					<paging v-bind="qpage" @go-page="qgoPage" />
				 </div>
            </div>
		</div>
		
       
	</div>
</template>

<script>
import PageMixin from '@/mixin';
import axios from "axios";
import paging from "@/components/Paging.vue"
import Swal from "sweetalert2";
// import QnaInfo from "@/components/QnAInfo.vue"

export default { 
	mixins: [PageMixin],
    components: { paging },
	// components:{QnaInfo},
    data() { 
        return {
            searchNo:"",
			reviewList: [],
			qnaList:[],
			qnaInfo: {},
			prodList: [],
			rpage: {},
			qpage: {},
            pageUnit: 5,
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
		this.getProdList();
		this.rgoPage(1);
		this.qgoPage(1);

    },
	computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
	},
    methods: {
		async rgoPage(rpage) {
            let pageUnit = this.pageUnit;
            let result =(await axios.get(`/api/shop/review/${this.searchNo}?pageUnit=${pageUnit}&page=${rpage}`));
            this.reviewList = result.data.list;
            console.log(this.rpage)
            this.rpage = this.pageCalc(rpage, result.data.count, 5, pageUnit)
        },
		async qgoPage(qpage) {
            let pageUnit = this.pageUnit;
            let result =(await axios.get(`/api/shop/qna/${this.searchNo}?pageUnit=${pageUnit}&page=${qpage}`));
            this.qnaList = result.data.list;
            console.log(this.qpage)
            this.qpage = this.pageCalc(qpage, result.data.count, 5, pageUnit)
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
		async goToQna(no)	{
			if(this.loggedInUserId == this.qnaList[0].user_id){
 	  		await this.$router.push({	name:"qnainfo",	query: { no : no, prodNo : this.searchNo }	});
		}
            else{
                Swal.fire({
                    title: '비밀글 입니다.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                })
            }
 		},
		 async goToReview(no)	{
 	  		await this.$router.push({	name:"reviewinfo",	query: { no : no, prodNo : this.searchNo }	});
 		},
	}
}	

</script>

<style>
.btnq{
	margin-left: 700px;
}
</style>