<template>
    <div>
        <div class="card mb-4">
            <div class="card-body shadow">상품 등록</div>
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
                            <input type="text" v-model="prodInfo.name" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">가격</span>
                            <input type="number" v-model="prodInfo.price" class="form-control"  aria-label="Username" aria-describedby="basic-addon1">
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
                            <input class="form-control" type="file" id="formFile" ref="file1" @change="FileUpload1">
                        </div>
                    </div>
                    <div class="col">
                        <div>상세이미지</div>
                        <div class="mb-3">
                            <input class="form-control" type="file" id="formFile" ref="file2" @change="FileUpload2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="prodReg">등록</button>        
    </div>            
</template>
<script>
import axios from 'axios';
import FormData from 'form-data';

export default{
    data() {
        return {
            parentCategory: [],
            childCategory: [],
            parentSelect: '0',
            childSelect: '0',

            prodInfo: {category: ''},
            file1: [],
            file2: [],
        }
    },
    created() {
        axios.get(`/api/adminProd/category`)
        .then(result => {
            console.log(result.data)
            this.parentCategory = result.data;
        })
        .catch(err => console.log(err))
    },
    methods:{
        childView(){
            axios.post(`/api/adminProd/category`, {parentView : this.parentSelect})
            .then(result => {
                console.log(result.data);
                this.childCategory = result.data;
            })
            .catch(err => console.log(err))
        },
        FileUpload1(){
            this.file1 = this.$refs.file1.files[0]
            console.log(this.file1);
        },
        FileUpload2(){
            this.file2 = this.$refs.file2.files[0]
            console.log(this.file2);
        },
        prodReg(){
            this.prodInfo.category = this.childSelect;
            let formData = new FormData();
            formData.append("file1", this.file1);
            formData.append("file2", this.file2);
            
            let prodInfo = new Blob([JSON.stringify(this.prodInfo)], {
                    type: 'application/json',
                });
            formData.append("prod", prodInfo);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData
            };
            axios.post('/api/adminProd/prod', config)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        }
    }
}
</script>
<style scoped src="../../assets/admin/css/sb-admin-2.css"></style>
<style scoped src="../../assets/admin/css/sb-admin-2.min.css"></style>
<style></style>
