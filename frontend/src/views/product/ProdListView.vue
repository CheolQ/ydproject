<template>
	        <!-- Fruits Shop Start-->
			<div class="container-fluid fruite py-5">
            <div class="container py-5">
                <h1 class="mb-4">Fresh fruits shop</h1>
                <div class="row g-4">
                    <div class="col-lg-12">
                        <div class="row g-4">
                            <div class="col-xl-3">
                                <div class="input-group w-100 mx-auto d-flex">
                                    <input type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                                    <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div class="col-6"></div>
                            <div class="col-xl-3">
                                <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label for="fruits">Default Sorting:</label>
                                    <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3" form="fruitform">
                                        <option value="volvo">신상품</option>
                                        <option value="saab">상품명</option>
                                        <option value="opel">베스트</option>
                                        <option value="audi">높은가격</option>
                                        <option value="audi">낮은가격</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-lg-3">
                                <div class="row g-4">
                                    <div class="col-lg-12">
                                        <div class="mb-3">
                                            <h4>Categories</h4>
                                            <ul class="list-unstyled fruite-categorie">
                                                <li>
                                                    <div class="d-flex justify-content-between fruite-name">
                                                        <a href="#"><i class="fas fa-apple-alt me-2"></i>Apples</a>
                                                        <span>(3)</span>
                                                    </div>
                                                </li>                                            
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="row g-4 justify-content-center">
                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                        <div class="rounded position-relative fruite-item">
                                            <div class="fruite-img">
                                                <img src="../../../public/img/prodImg/칸쵸.jpg" class="img-fluid w-100 rounded-top" alt="">
                                            </div>
                                            <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits</div>
                                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                <h4>Grapes</h4>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                <div class="d-flex justify-content-between flex-lg-wrap">
                                                    <p class="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                                    <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               
									<div class="col-md-6 col-lg-6 col-xl-4" 
									:key ="i" v-for ="(prod, i) in prodList" @click ="goToDetail(prod.prod_no)">
										<div class="rounded position-relative fruite-item" >
                    						<div class="fruite-img">
                      						  <img :src="require(`../../../public/img/prodImg/${prod.main_img}`)" class="img-fluid w-100 rounded-top" alt="">
                  							</div>
                   						  	<div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits</div>
                    						<div class="p-4 border border-secondary border-top-0 rounded-bottom">
                        						<h4>{{prod.prod_name }}</h4>
												<div class="d-flex justify-content-between flex-lg-wrap">
                  									<p class="text-dark fs-5 fw-bold mb-0">{{prod.prod_price }}</p>
                    								<a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
               								 	</div>
                   							 </div>
                  						</div>
         							</div>           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fruits Shop End-->

</template>

<script>
import axios from "axios";
import { computed } from "vue";
export default { 
    data() { 
        return {
			prodList: [],
        }
    },

    created() {
		this.getProdList();
    },
    methods: {
		async getProdList()	{
 	  	let result =	await axios.get(`/api/shop`);
 	  	this.prodList =	result.data ;
 	 	},
	 	goToDetail(no)	{
 	  	this.$router.push({	path:"/shopinfo",	query: { no:no }	});
 	 	},
  
    }
}
</script>

<style>

</style>