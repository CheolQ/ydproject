<template>
    <div>
        <ContentHeader title="상품 상세"></ContentHeader>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div class="row">
                    <div class="col">
                        <img :src="`/img/prodImg/${prodInfo.main_img}`" class="img-fluid rounded" alt="Image">
                    </div>
                    <div class="col">
                        <h4 class="fw-bold mb-3">{{prodInfo.prod_name }}</h4>
                        <h5 class="fw-bold mb-3">{{getNumberFormat(prodInfo.prod_price) }}</h5>
                        <p class="mb-3">원산지 :  {{prodInfo.origin }}</p>
                        <p class="mb-3">제조사 : {{prodInfo.maker }}</p>
                        <p class="mb-3">유통기한 : {{getDateFormat(prodInfo.exp_date) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="prodModify" class="btn btn-primary btn-lg">수정</button>
            <button class="btn btn btn-danger btn-lg" @click="prodDel">삭제</button>        
            <button class="btn btn-secondary btn-lg" @click="$router.go(-1)">목록</button>
        </div>
        <br>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div class="fruite-img">
                    <img :src="`/img/prodImg/${prodInfo.detail_img}`"  class="img-fluid w-100 rounded-top" alt="Image">
                </div>
            </div>
        </div>    
    </div>        
</template>
<script>
import Paging from "../../mixin";
import axios from "axios";
import ContentHeader from '@/components/admin/ContentHeader.vue'
    export default {
        mixins : [Paging],
        components: {
            ContentHeader
        },
        data() {
            return {
                prodInfo: {},
            }
        },
        created() {
            this.searchNo = this.$route.query.bno;
            this.getProdInfo();
        },
        methods: {
            async getProdInfo()	{
                this.prodInfo = 
                (await axios.get(`/api/shop/${this.searchNo}`)).data[0];
            },
            prodDel(){
                console.log(this.prodInfo.main_img);
                console.log(this.prodInfo.detail_img);
                console.log(this.searchNo)
                axios.delete(`/api/adminProd/${this.searchNo}`,{
                    data: {
                        main: this.prodInfo.main_img,
                        detail: this.prodInfo.detail_img
                    }
                })
                .then(() => {
                    this.$router.push({path: 'prodList'})
                })
                .catch(err=> console.log(err))
            },
            prodModify(){
                this.$router.push({path: 'ProdModify' , query: {bno: this.searchNo}})
            },
            getDateFormat (date ){
 	            return this .$dateFormat (date );
 	        },
            getNumberFormat (number ){
                return this .$numberFormat (number );
            }
        }
    }
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>