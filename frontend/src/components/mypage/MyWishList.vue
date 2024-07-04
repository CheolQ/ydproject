<template>
    <div id="mypage">
        <h5 id="mypage-sub">관심상품</h5>
        <!-- Wish Page Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="table-responsive">
                    <div v-if="wish.length > 0">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col"><input type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"></th>
                                <!-- <th scope="col">상품번호</th> -->
                                <th scope="col">이미지</th>
                                <th scope="col">상품명</th>
                                <th scope="col">금액</th>
                                <th scope="col">삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="w in wish">
                                    <td>
                                        <p class="mb-0 mt-4">{{ w.like_no }}</p>
                                    </td>
                                    <td>
                                        <p class="mb-0 mt-4"><input type="checkbox" v-model="w.selected" @change="AllChecked"></p>
                                    </td>
                                    <!-- <td>
                                        <p class="mb-0 mt-4">{{ w.prod_no }}</p>
                                    </td> -->
                                    <td scope="row">
                                        <div class="align-items-center">
                                            <img :src="`/api/upload/${w.main_img}`" @click="gotoProdInfo(w.prod_no)" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                                        </div>
                                    </td>
                                    <td>
                                        <p class="mb-0 mt-4">{{ w.prod_name }}</p>
                                    </td>
                                    <td>
                                        <p class="mb-0 mt-4">{{ formatPrice(w.prod_price) }}원</p>
                                    </td>
                                    <td>
                                        <button class="btn btn-md rounded-circle bg-light border mt-4"  @click="delSel(w.like_no)" >
                                            <i class="fa fa-times text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="button-container">
                            <button @click="gotoCart" class="btn btn-warning">장바구니에 담기</button>
                            <button @click="delAll" class="btn btn-danger">전체삭제</button>
                        </div>
                    </div>
                    <div v-else>
                        <p>관심상품 내역이 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Wish Page End -->
        <Paging v-if="wish.length > 0" v-bind="page" @go-page="goPage" />
    </div>
</template>
<script>
    import PageMixins from '@/mixin';
    import axios from 'axios';
    import Paging from '../Paging.vue';

    export default {
        mixins : [PageMixins],
        components: {
            Paging
        },
        data(){
            return{
                wish : [], page : {}, pageUnit : 5, nowPage : 1, allChecked : false
            };
        },
        created(){
            this.goPage(1);
            //this.getWish();
        },
        methods : {
            async goPage(page){
                try{
                    let pageUnit = this.pageUnit;
                    let result = await axios.get(`/api/wish?pageUnit=${pageUnit}&page=${page}`);
                    console.log(result.data.list.length,'결과')
                    if(result.data.list.length == 0 && this.nowPage != 1){
                        this.nowPage = this.nowPage - 1;
                        this.goPage(this.nowPage);
                    }
                    this.wish = result.data.list;
                    this.page = this.pageCalc(page, result.data.count, 5, pageUnit)
                    //console.log(this.page,'현재 페이지를 배열로 가져옴');
                    this.nowPage = page;
                    //console.log('현재 페이지는', this.nowPage)
                }catch(err){
                    console.log(err);
                }
            },
            // getWish(){
            //     axios.get('/api/wish/', {
            //             headers: { 'Cache-Control': 'no-cache' }
            //         })
            //     .then(result => {
            //     //console.log(result.data,"데이터는")
            //     this.wish = result.data;
            //     })
            //     .catch(err => console.log(err))
            // },
            async gotoCart(no){
                let selectedWish = [];
                this.wish.forEach(a => {
                    if(a.selected){
                        selectedWish.push({
                            prod_no : a.prod_no,
                            price : a.prod_price
                        })
                    }
                });
                await axios.post(`/api/cart`, selectedWish)
                .then(result => result.data.count); //result.data.count는 몇개가 장바구니 insert되었는지
                //this.$router.push('../../cart');
                this.$router.push({
                    path : '../../cart'
                })
            },
            formatPrice(price){
                    return price.numberFormat();
            },
            async delSel(no){
                await axios.delete(`/api/wish/${no}`);
                //this.goPage(this.page);
                //console.log('페이지 이동한 뒤 현재 페이지는', this.nowPage)
                this.goPage(this.nowPage); 
            },  
            async delAll(){
                await axios.delete('/api/wish');
                this.goPage(this.nowPage);
            },
            checkedAll(checked){
                this.wish.forEach(a => a.selected = checked);
            },
            gotoProdInfo(prodNo){
                this.$router.push({ name : 'shopinfo', query : { no : prodNo } })
            }
        }
    }
</script>
<style>
/* .aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
} */
/* .button-container-left {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px; 
}
.button-container-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px; 
} */
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* 필요에 따라 간격 조정 */
  align-items: center; /* 버튼을 수직으로 중앙에 정렬 */
}
</style>