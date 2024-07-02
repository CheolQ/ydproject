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
					 <table class ="table table-hover">
						<thead>
					   <tr>
						<th style="width:60%">TITLE</th>
						<th>NAME</th>
						<th>DATE</th>
						<th>Rating</th>
					   </tr>
					  </thead>
					  <tbody>
					<tr :key ="i" v-for ="(review, i) in reviewList">
					 <td>{{review.review_title }}</td>
					 <td>{{review.user_id }}</td>
					 <td>{{getDateFormat(review.create_date) }}</td>
					 <td>
						<i :key = "i" v-for="(i) in Number(review.rating)" class="fa fa-star text-secondary"></i>
                        <i :key = "i" v-for="(i) in 5- Number(review.rating)"class="fa fa-star"></i>
					 </td>
					</tr>
				   </tbody>
				  </table>
				 </div>
            </div>
			<div class="tab-pane" id="nav-qna" role="tabpanel" aria-labelledby="nav-qna-tab">
				<div class ="container">
					<div class="col-lg-6">
					<h4 class="fw-bold mb-3">QnA</h4>
					</div>
					 <table class ="table table-hover">
						<thead>
					   <tr>
						<th style="width:60%">TITLE</th>
						<th>NAME</th>
						<th>DATE</th>
						<th>UPDATE DATE</th>
					   </tr>
					  </thead>
					  <tbody :key ="i" v-for ="(qna, i) in qnaList">
					<tr @click= "qnaOnOff(qna.board_title)"  >
					 <td>{{qna.title }}</td>
					 <td>{{qna.user_id }}</td>
					 <td>{{getDateFormat(qna.create_date) }}</td>

					 <td v-if="qna.create_date != qna.update_date">{{getDateFormat(qna.update_date) }}</td>
					 <td v-else> - </td>
					</tr>
					<tr v-if="qnaInfo">
						<td>{{ qna.content }}</td>
					</tr>
				</tbody>
				  </table>
				  <button @click="goToInsert" class="btnq border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
					Write</button>
				 </div>
            </div>
		</div>
		
       
	</div>
</template>

<script>
import axios from "axios";

export default { 
    data() { 
        return {
            searchNo:"",
			reviewList: [],
			qnaList:[],
			prodList: [],
			qnaInfo: false,
			qnacon: {},
			qnacontent:{ prodno: 1 , qnano: 1},
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
        this.getReviewList();
        this.getQnaList();
		this.getProdList();
    },
    methods: {
		async getProdList()	{
 	  	let result =	await axios.get(`/api/shop/${this.searchNo}`);
 	  	this.prodList =	result.data[0] ;
 	 	},
        async getReviewList()	{
 	  	this.reviewList = (await axios.get(`/api/shop/review/${this.searchNo}`)).data ;	 	
  		},
		async getQnaList()	{
 	  		this.qnaList = (await axios.get(`/api/shop/qna/${this.searchNo}`)).data ;	
    	},
		goToInsert( ){
 		  this.$router.push({ name:"qna", query:{no : this.searchNo}});
 		 },
		getDateFormat(val )	{
    	    let date = val == '' ? new Date() : new Date(val);
    	    let year = date.getFullYear();
    	    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    	    let day = ('0' + date.getDate()).slice(-2);
    	    return `${year}-${month}-${day}`;
 		 },
		  qnaOnOff:function(no){
			this.qnacontent.prodno = this.searchNo;
			this.qnacontent.qnano = no;
			console.log('제품번호',this.qnacontent.prodno);
			console.log('qna번호',this.qnacontent.qnano);
			console.log('보드번호',this.qnaList[0].board_no);

			// if(this.qnaList[{no}].board_no == no){
			// this.qnacon

			axios.post(`/api/shop/qna/${no}`)
			.then(result => {
				// this.qnaList = result.data;
				this.qnaInfo = !this.qnaInfo;
				console.log('버튼',no);
				this.qnacon = result.data[0]
				})
			},
		}
    	// }
}	

</script>

<style>
.btnq{
	margin-left: 700px;
}
</style>