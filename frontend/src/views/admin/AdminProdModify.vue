<template>
    <div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <h3>상품 수정</h3>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div class="row">
                    <div class="col">
                        <div>카테고리 선택</div>
                        <br>
                        <select v-model="parentSelect" class="form-select" aria-label="Default select example" @change="childView">
                            <option selected value="0">parent menu</option>
                            <option :key="c" :value="c.category_code" v-for="c in parentCategory">{{ c.category_name }}</option>
                        </select>
                    </div>
                    <div class="col">
                        <br><br>
                        <select v-model="childSelect" class="form-select" aria-label="Default select example">
                            <option selected value="0">child menu</option>
                            <option :key="c" :value="c.category_code" v-for="c in childCategory">{{ c.category_name }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">제품이름</span>
                            <input type="text" v-model="prodInfo.prod_name" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">가격</span>
                            <input type="number" v-model="prodInfo.prod_price" class="form-control"  aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">제조사</span>
                            <input type="text" v-model="prodInfo.maker" class="form-control"  aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">원산지</span>
                            <input type="text" v-model="prodInfo.origin" class="form-control"  aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body shadow">
                <div class="row">
                    <div class="col">
                        <div>메인이미지</div>
                        <div class="mb-3">
                            <input class="form-control" type="file" id="formFile" ref="file1" @change="FileUpload1" accept="image/*">
                        </div>
                    </div>
                    <div class="col">
                        <div>상세이미지</div>
                        <div class="mb-3">
                            <input class="form-control" type="file" id="formFile" ref="file2" @change="FileUpload2" accept="image/*">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="prodReg" class="btn btn-primary btn-lg">수정</button>        
            <button @click="$router.go(-1)" class="btn btn-secondary btn-lg">취소</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data() {
        return {
            prodNo: 1,

            parentCategory: [],
            childCategory: [],
            parentSelect: '0',
            childSelect: '0',

            prodInfo: {},
            file1: [],
            file2: [],
        }
    },
    created() {
        this.prodNo = this.$route.query.bno
        axios.get(`/api/adminProd/category`)
        .then(result => {
            console.log(result.data)
            this.parentCategory = result.data;
        })
        .catch(err => console.log(err))

        console.log(this.prodNo)
        this.getProd();
    },
    methods:{
        async getProd(){
            await axios.post(`/api/adminProd/ps/${this.prodNo}`)
            .then(result => {
                console.log(result.data[0]);
                this.prodInfo = result.data[0];
                this.parentSelect = this.prodInfo.category_code1;
                this.childView();
                this.childSelect = this.prodInfo.category_code;
            })
            .catch(err => console.log(err))
        },
        childView(){
            axios.post(`/api/adminProd/category`, {parentView : this.parentSelect})
            .then(result => {
                console.log(result.data);
                this.childCategory = result.data;
            })
            .catch(err => console.log(err))
        },
        FileUpload1(){
            this.file1 = this.$refs.file1.files[0];
            console.log(this.file1);
        },
        FileUpload2(){
            this.file2 = this.$refs.file2.files[0];
            console.log(this.file2);
        },
        async prodReg(){
            this.prodInfo.category = this.childSelect;
            if(!this.prodInfo.category){
                alert('카테고리를 입력하세요')
                return;
            }
            if(!this.prodInfo.prod_name){
                alert('제품이름을 입력하세요')
                return;
            }
            if(!this.prodInfo.prod_price){
                alert('가격을 입력하세요')
                return;
            }
            if(!this.prodInfo.maker){
                alert('제조사를 입력하세요')
                return;
            }
            if(!this.prodInfo.origin){
                alert('원산지를 입력하세요')
                return;
            }
            let data = new FormData();
            console.log(this.file1)
            console.log(this.file2)
            data.append('category_code', this.prodInfo.category);
            data.append('prod_name', this.prodInfo.prod_name);
            data.append('prod_price', this.prodInfo.prod_price);
            data.append('maker', this.prodInfo.maker);
            data.append('origin', this.prodInfo.origin);
            
            data.append("main_img", this.file1);
            data.append("detail_img", this.file2);

            await axios.post(`/api/adminProd/prod/${this.prodNo}`,data,
            { headers:{'Content-Type':'multipart/form-data'}})
            .then(result => {
                if(result.data === 'ok'){
                    alert("수정되었습니다");
                    this.$router.push({path: 'prodList'});
                }
            })
            .catch(err => console.log(err))
        }
    }
}    
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>