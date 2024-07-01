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
                                            <!-- <div class="d-flex justify-content-between fruite-name" v-for="v in categories"  >

                                                <a href="#"><i class="fas fa-apple-alt me-2"></i>{{v.parent }}</a> -->
<!--                                             
                                                <span>(3)</span>
                                            </div> -->
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
                            :key ="i" v-for ="(cate, i) in prodCategory" @click ="goToDetail(cate.prod_no)">
                                <div class="rounded position-relative fruite-item" >
                                    <div class="fruite-img">
                                        <img :src="`/img/prodImg/${cate.main_img}`" class="img-fluid w-100 rounded-top" alt="">
                                      </div>
                                         <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits</div>
                                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                        <h4>{{cate.prod_name }}</h4>
                                        <div class="d-flex justify-content-between flex-lg-wrap">
                                              <p class="text-dark fs-5 fw-bold mb-0">{{numberFormat(cate.prod_price) }}</p>
                                            <button @click="gotoCart(cate.prod_no,$event)" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
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

<script	>
import axios from "axios";
import Swal from "sweetalert2";

export	default {
 	data ()	{
        return {
                searchCode:"",
                prodCategory: {},
                
        };
 	},
 	created(){
        this.searchCode = this.$route.query.code ;
        this.getProdCategory();
 	},
 	methods: {
        async getProdCategory()	{
            // axios.get(`/api/shop/${this.searchCode}`)
            //     .then(response => {
            //         console.log('상품',this.prodCategory)
            //         this.prodCategory = response.data; // 서버에서 받은 카테고리 데이터를 설정합니다.
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
            this.prodCategory = 
            (await axios.get(`/api/shop/code/${this.searchCode}`)).data;
        },
   
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
       
        numberFormat: function (number) {
            if (number == 0)
            return 0;
            let regex = /(^[+-]?\d+)(\d{3})/;
            let nstr = (number + '');
            while (regex.test(nstr)) {
                nstr = nstr.replace(regex, '$1' + ',' + '$2');
            }
            return nstr;
            },
        gotoWish(no){
            axios.post(`/api/cart/insert/${no}`,this.prodInfo.prod_no)
            //.then(()=> alert('관심상품에 등록되었습니다.'))
            .then(
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "관심상품에 등록되었습니다.",
                    showConfirmButton: false,
                    timer: 1500
                })
            )
        },
        gotoCart(no){
            axios.post(`/api/cart/cartInsert/${no}`, this.prodInfo.prod_no)
            .then(
                Swal.fire({
                title: "장바구니로 이동하겠습니까?",
                showDenyButton: true,
				confirmButtonText: "이동",
				denyButtonText: `계속 쇼핑`
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push('cart')
                    } else if (result.isDenied) {
                    }
                })
            )
        },
        gotoPayments(){
            
        }
 	},
 	
};
</script>


<style>
.col-lg-6{
    text-align: left
}

.marinleftjh{
    margin-right: 10px;
}
</style>