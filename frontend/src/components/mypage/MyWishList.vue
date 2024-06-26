<template>
    <div>
        <h2 class="aside-tit">WISH LIST</h2>
    </div>
        <!-- Wish Page Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">번호</th>
                            <th scope="col"><input type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"></th>
                            <th scope="col">상품번호</th>
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
                                <td>
                                    <p class="mb-0 mt-4">{{ w.prod_no }}</p>
                                </td>
                                <td scope="row">
                                    <div class="d-flex align-items-center">
                                        <img src="#" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="">
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4">{{ w.prod_name }}</p>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4">{{ w.prod_price }}원</p>
                                </td>
                                <td>
                                    <button class="btn btn-md rounded-circle bg-light border mt-4"  @click="delSel(w.cart_no)" >
                                        <i class="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button @click="delAll" class="btn btn-warning">전체삭제</button>
                    </div>
                    <div>
                        <button @click="gotoCart" class="btn btn-primary">장바구니로 이동</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Wish Page End -->
</template>
<script>
    import axios from 'axios';

    export default {
        data(){
            return{
                wish : [], 
            };
        },
        created(){
            axios.get('/api/wish/')
            .then(result => {
                console.log(result)
            })
        },
        methods : {
            gotoCart(){
                
            }
        }
    }
</script>
<style>
.aside-tit {
    padding: 65px 0 30px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 24px
}
</style>