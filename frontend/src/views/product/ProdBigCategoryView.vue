<template>
    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
    <div class="container py-5" >
        <!-- <h1 class="mb-4">{{ Object.keys(prodCategory)[0].codename }}</h1> -->
        <h1 v-if="searchBigCode == 'A1'"class="mb-4">과자,스낵,쿠키</h1>
        <h1 v-if="searchBigCode == 'A2'"class="mb-4">초콜릿,젤리,캔디,껌</h1>
        <h1 v-if="searchBigCode == 'A3'"class="mb-4">라면,간식</h1>
        <h1 v-if="searchBigCode == 'A4'"class="mb-4">음료,커피</h1>
        <div class="row g-4">
            <div class="col-lg-12">
                <div class="row g-4">
                    <div class="col-xl-3">
                        <div class="input-group w-100 mx-auto d-flex">
                            <input type="search"  v-model="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                            <span id="search-icon-1" class="input-group-text p-3"  @click="searchBtn"><i class="fa fa-search"></i></span>
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
                                            <div class="d-flex justify-content-between fruite-name" v-for="v in prodCategoryCnt"  >
                                                <a @click="gotoProd(v.category_code)"><i class="fas fa-apple-alt me-2"></i>{{v.category_name }}</a>
                                                <span>({{ v.prodcnt }})</span>
                                            </div>
                                        </li>                                           
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="row g-4 justify-content-center">
                            <div class="col-md-6 col-lg-6 col-xl-4" 
                            :key ="i" v-for ="(cate, i) in bigCategory" @click ="goToDetail(cate.prod_no)">
                                <div class="rounded position-relative fruite-item" >
                                    <div class="fruite-img">
                                        <img :src="`/img/prodImg/${cate.main_img}`" class="img-fluid w-100 rounded-top" alt="">
                                      </div>
                                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                        <h4>{{cate.prod_name }}</h4>
                                        <div class="d-flex justify-content-between flex-lg-wrap">
                                              <p class="text-dark fs-5 fw-bold mb-0">{{numberFormat(cate.prod_price) }}원</p>
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
        <paging v-bind="page" @go-page="goPage"/>
    </div>
</div>
<!-- Fruits Shop End-->

</template>

<script	>
import PageMixin from '../../mixin';
import axios from "axios";
import Swal from "sweetalert2";
import paging from "@/components/Paging.vue"

export	default {
    mixins : [PageMixin],
	components:{paging},
 	data ()	{
        return {
                searchBigCode:"",
                bigCategory: [],
                prodCategoryCnt : [],
                codename: '',
                page:{},
	            pageUnit:9,
	            search: '',
        };
 	},
 	created(){
        this.searchBigCode = this.$route.query.code ;
        // this.getBigCategory();
        this.getProdCategoryCnt();
        this.goPage(1);
 	},
 	methods: {
        async goPage(page){
        let pageUnit = this.pageUnit;
        let result = await axios.get(`/api/shop/bigcode/${this.searchBigCode}?pageUnit=${pageUnit}&page=${page}&search=${this.search}`)
        this.bigCategory = result.data.list;
    
        console.log(this.bigCategory[0],'daas');
        console.log(this.bigCategory[0],'daas');

       
        console.log(this.page)
        this.page = this.pageCalc(page, result.data.count,5,pageUnit)
    },

        async getProdCategoryCnt()   {
        let result = await axios.get(`/api/shop/cnt`);
        console.log('갯수',result.data);
        this.prodCategoryCnt = result.data ;
        // console.log(result.data.catename,'1111111',result.data.list)

        },
        async goToDetail(no)	{
 	  	await this.$router.push({	name:"shopinfo",	query: { no:no }	});
 	 	},
        gotoProd(code){
            this.codename = code;
            console.log(this.codename,'ddddd')
            this.$router.push({   name:"prodBigcategory" , query: {code : code}});
        },
        getDateFormat(val )	{
            let date = val == '' ? new Date() : new Date(val);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
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
        searchBtn(){
			this.goPage(1);
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