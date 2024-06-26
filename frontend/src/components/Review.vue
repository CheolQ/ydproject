<template>
    <div class ="container">
 		<table class ="table table-hover">
 	  	 <thead>
 	      <tr>
			<th>NO.</th>
			<th>CONTENT</th>
 	    	<th>NAME</th>
 	      	<th>DATE</th>
 	      </tr>
 	     </thead>
 	     <tbody>
 	   <tr :key ="i" v-for ="(review, i) in reviewList">
 	    <td>{{review.review_no}}</td>
 	    <td>{{review.user_id }}</td>
 	    <td>{{review.review_content }}</td>
 	    <td>{{review.create_date }}</td>
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
            searchNo:"",
			reviewList: [],
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
        this.getReviewList();
    },
    methods: {
        async getReviewList()	{
 	  	this.reviewList = (await axios.get(`/api/review/${this.searchNo}`)).data ;	 	
        // console.log(this.reviewList);
    },
    }
}

</script>

<style>
</style>