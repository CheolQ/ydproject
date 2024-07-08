<template>
    <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="p-5 bg-light rounded">
                    <div class="row g-4">
                        <div class="col-12">
                        <h1 class="mb-4">{{ isEdit ? 'QnA 수정' : 'QnA 등록' }}</h1>
                        
                        <form @submit.prevent="isEdit ? updateQna() : saveQna()">
                            <div class="centeralign">
                            <div class="col-md-12 col-lg-6 col-xl-7">
                                <div class="d-flex align-items-center flex-nowrap">
                                    <div class="bg-secondary rounded">
                                        <img :src="`/img/prodImg/${prodInfo.main_img}`" class="img-fluid rounded" style="width: 120px; height: 120px;" alt="">
                                    </div>
                                    <div class="ms-4 d-block">
                                        <h6 class="text-dark"> 상품 번호 : {{ qna.prod_no }}</h6>
                                        <h6 class="text-dark">상품 명 : {{ prodInfo.prod_name }}</h6>
                                        <h6 class="text-dark">금액 :  {{ numberFormat(prodInfo.prod_price) }}원</h6>
                                        <div class="d-flex pe-5" v-if="prodRating == 0" >
                                            <i :key = "i" v-for="(i) in 5" class="fa fa-star"></i>
                                        </div>
                                        <div class="d-flex pe-5" v-else >
                                            <i :key = "i" v-for="(i) in this.stars" class="fa fa-star text-secondary"></i>
                                            <i :key = "i" v-for="(i) in 5- this.stars"class="fa fa-star"></i>
                                        </div>
                                     </div>
                                 </div>
                                  <div class="form-item" v-if="isEdit">
                                      <label class="form-label my-3" for="board_no">QnA 번호</label>
                                      <input type="text" class="form-control" id="board_no" v-model="qna.board_no" readonly>
                                  </div>                        
                                  <div class="form-item">
                                      <label class="form-label my-3" for="user_id">Id</label>
                                      <input type="text" class="form-control" id="user_id" v-model="loggedInUserId" readonly>
                                  </div>
                                  <div class="form-item">
                                      <label class="form-label my-3" for="title">Title</label>
                                      <input type="text" class="form-control" id="title" v-model="qna.title">
                                  </div>
                                  <div class="form-item">
                                      <label class="form-label my-3" for="content">Content</label>
                                      <textarea name="text" class="form-control" id="content" spellcheck="false" cols="30"
                                      rows="11" v-model="qna.content"></textarea>
                                  </div>
                                  <hr>
                                  <div class="qnbtn">
                                    <button class="btn border-secondary px-4 py-3 text-uppercase btn-custom marinleftjh" type="submit">{{ isEdit ? '수정' : '등록' }} </button>
                                  <button class="btn border-secondary px-4 py-3 text-uppercase text-primary marinleftjh" type="button"  @click="goToList">목록</button>
                                </div>
                            </div>
                        </div>
                        </form>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        qnadata: { type: Object, default: () => ({}) }
    },
    data() {
        return {
            qna: {
                ...this.qnadata
            },
            prodInfo: {},
            isEdit: false,
            prodRating: [],
            stars: 0,
        };
    },
    created() {
        const queryNo = this.$route.query.no;
        if (queryNo) {
            this.qna.prod_no = queryNo;
            this.searchNo = queryNo;
            this.getProdInfo();
            this.getProdRating();
        }

        if (this.qna.board_no) {
            this.isEdit = true;
        } else {
            this.qna.prod_no = this.$route.query.no;
        }
    },
    computed: {
        loggedInUserId() {
            return this.$store.getters.loggedInUserId;
        }
    },
    methods: {
        async getProdInfo() {
            this.prodInfo = (await axios.get(`/api/shop/${this.qna.prod_no}`)).data[0];
        },
        async getProdRating()	{
            this.prodRating = 
            (await axios.get(`/api/shop/star/${this.searchNo}`)).data[0];
                console.log('별점은',this.prodRating);
                if(this.prodRating == undefined){
                    this.prodRating = 0
                }else{
                    this.stars = Number(this.prodRating.stars)
                }
        },

        async saveQna() {
            this.qna.user_id = this.loggedInUserId;
            let userNo = await axios.get(`/api/shop/getuserno/${this.loggedInUserId}`);
            this.qna.user_no = userNo.data[0].user_no;
            await axios.post("/api/shop/qna", this.qna);
            this.$router.push({ name: "shopinfo", query: { no: this.qna.prod_no } });
        },
        async updateQna() {
            let userNo = await axios.get(`/api/shop/getuserno/${this.loggedInUserId}`);
            console.log(this.qna);
            let modqna = { ...this.qna };
            console.log("확인")
            console.log(modqna)
            console.log(this.qna.prod_name);
            delete modqna.prod_name;
            delete modqna.prod_price;
            delete modqna.main_img;
            delete modqna.reply_content;
            delete modqna.reply_create_date;
            delete modqna.create_date;
            modqna.user_no = userNo.data[0].user_no;
            modqna.update_date = new Date().toISOString().slice(0, 19).replace('T', ' ');;

            await axios.patch(`/api/mypage/updateqna/${this.qna.board_no}`, modqna);
            this.$router.push({ name: "shopinfo", query: { no: this.qna.prod_no } });
        },
        goToList() {
            this.$router.push({ name: "shopinfo", query: { no: this.qna.prod_no } });
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

    }
};
</script>
<style>
.thw {
    width: 70%;
}

.thwidth {
    width: 10%;
}

.dd {
    text-align: left;
}
.primg-fluid {
    width :120px;
     height:100px;
}
.centeralign{
    display: flex;
  justify-content: center;
}
.marinleftjh{
    margin-right: 10px;
    display: inline-block;
}
.qnbtn{
    text-align: center;
}

.btn-custom {
    color: black !important; /* !important를 사용하여 우선 순위 부여 */
    border-color: #6c757d; /* 기존 스타일 유지 */
}
</style>