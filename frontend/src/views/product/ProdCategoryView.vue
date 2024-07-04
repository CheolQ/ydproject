<template>
    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
    <div class="container py-5" >
        <!-- <h1 class="mb-4">{{ Object.keys(prodCategory)[0].codename }}</h1> -->
        <h1 class="mb-4">{{ codename }}</h1>
        <div class="row g-4">
            <div class="col-lg-12">
                <div class="row g-4">
                    <div class="col-xl-3">           
                    </div>
                    <div class="col-6"></div>
                    <div class="col-xl-3">
                        <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                            <label for="fruits">Default Sorting:</label>
                            <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3"
                                    form="fruitform" v-model="prodSort" @change="setSelect()">
                                    <option v-for="option in sort" :value="option.value">
                                     {{ option.text }}
                                    </option>
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
                        <div class="input-group w-100 mx-auto d-flex">
                            <input type="search"  v-model="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                            <span id="search-icon-1" class="input-group-text p-3"  @click="searchBtn"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="row g-4 justify-content-center" v-if="smallCategory != null">
                            <div class="col-md-6 col-lg-6 col-xl-4" 
                            :key ="i" v-for ="(cate, i) in smallCategory" @click ="goToDetail(cate.prod_no)">
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
                        <div class="row g-4 justify-content-center" v-else>
                            <div class="col-md-6 col-lg-6 col-xl-4">
                                <br>   <br>   <br>   <br>
                                <h4>상품 준비 중입니다.</h4>
                             </div>           
                        </div>
                        
                    </div>
                </div>
            </div>   
        </div>
        <paging v-if="smallCategory != null" v-bind="page" @go-page="goPage"/>
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
                searchCode:"",
                smallCategory: [],
                prodCategoryCnt : [],
                codename: '',
                page:{},
	            pageUnit:9,
	            search: '',
                sort : [
                    { text: '신상품', value: '1' },       
                    { text: '상품명', value: '2' },
                    { text: '높은가격', value: '3' },   
                    { text: '낮은가격', value: '4' }     
                ],
                prodSort:''
        };
 	},     
    computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
    },
    
 	created(){
        this.searchCode = this.$route.query.code ;
        // this.getSmallCategory();    //소분류 검색
        this.getProdCategoryCnt();  //대분류 상품 갯수
        this.goPage(1);             // 페이징
 	},
 	methods: {
        async goPage(page){
        let pageUnit = this.pageUnit;
        let result = await axios.get(`/api/shop/code/${this.searchCode}?pageUnit=${pageUnit}&page=${page}&search=${this.search}&sort=${this.prodSort}`)
        if(result.data.list.length==0) {
            // 검색결과가 없는 경우
            this.smallCategory = null;
            return;
        }
        this.smallCategory = result.data.list;
        this.codename=result.data.list[0].codename;
        this.page = this.pageCalc(page, result.data.count,5,pageUnit)
        },
        setSelect(){
            console.log('check',this.prodSort)
        },
        async getProdCategoryCnt()   {
            let result = await axios.get(`/api/shop/cnt`);
            console.log('체크', result.data[0]);
            this.prodCategoryCnt = result.data ;
        },
        async goToDetail(no)	{
 	  	await this.$router.push({	name:"shopinfo",	query: { no:no }	});
 	 	},
          gotoProd(code){
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
        gotoCart(no,e){
            if(this.loggedInUserId){
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
            )}
            else{
                Swal.fire({
                    title: '로그인이 필요합니다.',
                    icon: 'warning',
                    confirmButtonText: '확인'
                })
            }
        },
        searchBtn(){
			this.goPage(1);
		}
 	},
     watch : {
        prodSort(){
            this.goPage(1);
        }
    }
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