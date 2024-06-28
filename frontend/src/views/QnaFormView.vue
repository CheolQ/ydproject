<template>
            <!-- Checkout Page Start -->
            <div class="container-fluid py-5">
            <div class="container py-5">
                <h1 class="mb-4">QnA</h1>
                <form action="#">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-6 col-xl-7">
                            <div class="row">
                                <img :src="`/img/prodImg/${prodInfo.main_img}`" class="img-fluid rounded" alt="Image">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3" for="prod_no">상품번호</label>
                                <input type="text" class="form-control" id="prod_no" v-model=this.searchNo >
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3" for="user_id">Id</label>
                                <input type="text" class="form-control" id="user_id" v-model="qna.user_id">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3" for="title">Title</label>
                                <input type="text" class="form-control" id="title" v-model="qna.title">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3" for="content">Content</label>
                                <textarea name="text" class="form-control" id="content" spellcheck="false" cols="30" rows="11"  v-model="qna.content" placeholder="Oreder Notes (Optional)"></textarea>
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3" for="board_pw">PW</label>
                                <input type="text" class="form-control" id="boarad_pw" v-model="qna.board_pw">
                            </div>
        
                            <hr>
                            
                            <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="row g-3 text-center align-items-center justify-content-center pt-4">
                                <button type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                                @click="saveQna(searchNo)">
                                    등록</button>
                            </div>
                            <div class="row g-3 text-center align-items-center justify-content-center pt-4">
                                <button type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">목록</button>
                            </div>
                           </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Checkout Page End -->
</template>

<script	>
import axios from "axios";

export	default {
    props:{
        qnadata:{type:Object}
    },
 	data ()	{
 	 return {
        searchNo:"",
        qna: { ...this.qnadata
        },
        prodInfo: {},   
 	 };
 	},
 	created()	{
        this.qna.prod_no = this.$route.query.no
        this.searchNo = this.qna.prod_no;   
        this.getProdInfo();     
 	},

 	methods: {
        async getProdInfo()	{
 	        this.prodInfo = 
            (await axios.get(`/api/shop/${this.searchNo}`)).data[0];
 	    },
        async saveQna(no)	{
             let test = this.qna
            console.log(test);
            await axios.post("/api/shop/qna",test);
            this.$router.push({	name:"shopinfo", query: { no:no } });
         	        }
 	    },

};
</script>
<style>
.thw{
    width: 70%;
}
.thwidth{
    width: 10%;
}
.dd{
   text-align: left;
}
</style>