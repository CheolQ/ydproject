<template>
    <div class="container-fluid py-5">
        <div class="container py-5">
            <h1 class="mb-4">{{ isEdit ? 'QnA 수정' : 'QnA 등록' }}</h1>
            <form @submit.prevent="isEdit ? updateQna() : saveQna()">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7">
                        <div class="row">
                            <img :src="`/img/prodImg/${prodInfo.main_img}`" class="img-fluid rounded" alt="Image">
                        </div>
                        <div class="form-item" v-if="isEdit">
                            <label class="form-label my-3" for="board_no">QnA 번호</label>
                            <input type="text" class="form-control" id="board_no" v-model="qna.board_no" readonly>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3" for="prod_no">상품번호</label>
                            <input type="text" class="form-control" id="prod_no" v-model="qna.prod_no" readonly>
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
                            <textarea name="text" class="form-control" id="content" spellcheck="false" cols="30"
                                rows="11" v-model="qna.content"></textarea>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3" for="board_pw">PW</label>
                            <input type="text" class="form-control" id="board_pw" v-model="qna.board_pw">
                        </div>

                        <hr>

                        <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="row g-3 text-center align-items-center justify-content-center pt-4">
                                <button type="submit"
                                    class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                                    {{ isEdit ? '수정' : '등록' }}
                                </button>
                            </div>
                            <div class="row g-3 text-center align-items-center justify-content-center pt-4">
                                <button type="button"
                                    class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                                    @click="goToList">목록</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
            isEdit: false
        };
    },
    created() {
        const queryNo = this.$route.query.no;
        if (queryNo) {
            this.qna.prod_no = queryNo;
            this.searchNo = queryNo;
            this.getProdInfo();
        }

        if (this.qna.board_no) {
            this.isEdit = true;
        } else {
            this.qna.prod_no = this.$route.query.no;
        }
    },
    methods: {
        async getProdInfo() {
            this.prodInfo = (await axios.get(`/api/shop/${this.qna.prod_no}`)).data[0];
        },
        async saveQna() {
            let userNo = await axios.get(`/api/shop/getuserno/${this.qna.user_id}`);
            this.qna.user_no = userNo.data[0].user_no;
            await axios.post("/api/shop/qna", this.qna);
            this.$router.push({ name: "shopinfo", query: { no: this.qna.prod_no } });
        },
        async updateQna() {
            await axios.put(`/api/shop/qna/${this.qna.board_no}`, this.qna);
            this.$router.push({ name: "shopinfo", query: { no: this.qna.prod_no } });
        },
        goToList() {
            this.$router.push({ name: "shopinfo", query: { no: this.qna.prod_no } });
        }
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
</style>