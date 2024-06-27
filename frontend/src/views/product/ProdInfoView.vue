<template>
        <!-- Single Product Start -->
        <div class="container-fluid py-5 mt-5">
            <div class="container py-5">
                <div class="row g-4 mb-5">
                    <div class="col-lg-8 col-xl-9">
                        <div class="row g-4">
                            <div class="col-lg-6">
                                <div class="border rounded">
                                    <a href="#">
                                        <!--<img :src="public경로일 경우 require 필요 없음, 상대경로일때 필요
                                        require(`../../../public/img/prodImg/${prodInfo.main_img}`)" class="img-fluid rounded" alt="Image">-->
                                        <img :src="`/img/prodImg/${prodInfo.main_img}`" class="img-fluid rounded" alt="Image">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <h4 class="fw-bold mb-3">{{prodInfo.prod_name }}</h4>
                                <h5 class="fw-bold mb-3">{{numberFormat(prodInfo.prod_price) }}</h5>
                                <p class="mb-3">원산지   {{prodInfo.origin }}</p>
                                <p class="mb-3">제조사   {{prodInfo.maker }}</p>
                                <p class="mb-3">유통기한   {{getDateFormat(prodInfo.exp_date) }}</p>
                                <div class="d-flex mb-4">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="input-group quantity mb-5" style="width: 100px;">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-minus rounded-circle bg-light border"
                                        v-on:click="decrease" >
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm text-center border-0"  v-model="number">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-plus rounded-circle bg-light border"
                                        v-on:click="increase" >
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <a href="#" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary marinleftjh"><i class="fa fa-shopping-bag me-2 text-primary"></i> Like</a>
                                <a href="#" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary marinleftjh"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                <a href="#" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Buy Now</a>
                             </div>
                            <review />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Single Product End -->
</template>

<script	>
import axios from "axios";
import review from '@/components/Review.vue'

export	default {
    components:{review},
 	data ()	{
 	 return {
 	  searchNo:"",
 	  prodInfo: {},
      number: 1
 	 };
 	},
 	created()	{
 	 this.searchNo = this.$route.query.no ;
 	 this.getProdInfo();
 	},
 	methods: {
 	 async getProdInfo()	{
 	    this.prodInfo = 
        (await axios.get(`/api/shop/${this.searchNo}`)).data[0];
 	 },
 	//  getDateFormat(date )	{
 	//   return this .$dateFormat(date );
 	//  },
     getDateFormat(val )	{
        let date = val == '' ? new Date() : new Date(val);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
 	 },

 	 goToList( ){
 	  this.$router.push({ path:"/shop"});
 	 },
     increase(){
        this.number++;
     },
     decrease(){
        this.number--;
     },
     numberFormat: function (number) {
        if (number == 0)
        return 0;
        let regex = /(^[+-]?\d+)(\d{3})/;
        let nstr = (number + '');
        while (regex.test(nstr)) {
            nstr = nstr.replace(regex, '$1' + ',' + '$2');
        }
        return nstr;
        }
 	},
 	
};
</script	>


<style>
.col-lg-6{
    text-align: left
}

.marinleftjh{
    margin-right: 10px;
}

</style>