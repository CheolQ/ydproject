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
                    <img src="../../public/img/prodImg/시리얼.jpg" class="img-fluid w-100 rounded-top" alt="">
                </div>
            </div>
            <div class="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
				<div class ="container">
					 <table class ="table table-hover">
						<thead>
					   <tr>
						<th>NO.</th>
						<th>CONTENT</th>
						<th>NAME</th>
						<th>DATE</th>
						<th>Rating</th>
					   </tr>
					  </thead>
					  <tbody>
					<tr :key ="i" v-for ="(review, i) in reviewList">
					 <td>{{review.review_no}}</td>
					 <td>{{review.user_id }}</td>
					 <td>{{review.review_content }}</td>
					 <td>{{review.create_date }}</td>
					 <td>
						<i class="fa fa-star text-secondary"></i>                                    
						<i class="fa fa-star text-secondary"></i>                                    
						<i class="fa fa-star"></i>
					 </td>
					</tr>
				   </tbody>
				  </table>
				 </div>
            </div>
			<div class="tab-pane" id="nav-qna" role="tabpanel" aria-labelledby="nav-qna-tab">
				<div class ="container">
					 <table class ="table table-hover">
						<thead>
					   <tr>
						<th>222222NO.</th>
						<th>CONTENT</th>
						<th>NAME</th>
						<th>DATE</th>
						<th>Rating</th>
					   </tr>
					  </thead>
					  <tbody>
					<tr :key ="i" v-for ="(qna, i) in qnaList">
					 <td>{{qna.user_id }}</td>
					 <td>{{qna.title }}</td>
					 <td>{{qna.create_date }}</td>
					 <td>
						<i class="fa fa-star text-secondary"></i>                                    
						<i class="fa fa-star text-secondary"></i>                                    
						<i class="fa fa-star"></i>
					 </td>
					</tr>
				   </tbody>
				  </table>
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
			qnaList:[]
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
        this.getReviewList();
        this.getQnaList();

    },
    methods: {
        async getReviewList()	{
 	  	this.reviewList = (await axios.get(`/api/shop/review/${this.searchNo}`)).data ;	 	
        // console.log(this.reviewList);
    },
	async getQnaList()	{
 	  	this.qnaList = (await axios.get(`/api/shop/qna/${this.searchNo}`)).data ;	 	
        // console.log(this.reviewList);
    },
    }
}

</script>

<style>
</style>