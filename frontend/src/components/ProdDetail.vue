<template>
	<div class="col-lg-12">
		<div class="fruite-img">
            <img :src="`/img/prodImg/${prodList.detail_img}`"  class="img-fluid w-100 rounded-top" alt="">
        </div>
	</div>
</template>

<script>
import axios from "axios";
export default { 
    data() { 
        return {
            searchNo:"",
			prodList: [],
        }
    },
    created() {
        this.searchNo = this.$route.query.no ;
		this.getProdList();
    },
    methods: {
		async getProdList()	{
 	  	let result =	await axios.get(`/api/shop/${this.searchNo}`);
 	  	this.prodList =	result.data[0] ;
 	 	},
	}
}	

</script>

<style>

</style>