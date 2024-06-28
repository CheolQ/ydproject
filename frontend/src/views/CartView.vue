<template>
    <h2 class="aside-tit">CART</h2> 
    <!-- Cart Page Start -->
    <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">번호</th>
                            <th scope="col"><input type="checkbox" v-model="allChecked" @click="checkedAll($event.target.checked)"></th>
                            <!-- <th scope="col">상품번호</th> -->
                            <th scope="col">이미지</th>
                            <th scope="col">상품명</th>
                            <th scope="col">개수</th>
                            <th scope="col">금액</th>
                            <th scope="col">삭제</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in cart">
                                <td>
                                    <p class="mb-0 mt-4">{{ c.cart_no }}</p>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4"><input type="checkbox" v-model="c.selected" @change="AllChecked"></p>
                                </td>
                                <!-- <td>
                                    <p class="mb-0 mt-4">{{ c.prod_no }}</p>
                                </td> -->
                                <td scope="row">
                                    <div class="align-items-center">
                                        <img :src="`/api/upload/${c.main_img}`" class="img-fluid rounded-circle" style="width: 90px; height: 90px;">
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4">{{ c.prod_name }}</p>
                                </td>
                                <td>
                                    <div class="input-group quantity mt-4" style="width: 100px;">
                                        <div class="input-group-btn">
                                            <button v-on:click="c.cnt--" @click="cntBtn(c.cart_no, c.cnt, c.prod_price)" class="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i class="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="number" readonly v-model="c.cnt" class="form-control form-control-sm text-center border-0">
                                        <div class="input-group-btn">
                                            <button v-on:click="c.cnt++" @click="cntBtn(c.cart_no, c.cnt, c.prod_price)" class="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 mt-4">{{ formatPrice(c.prod_price * c.cnt) }}원</p>
                                </td>
                                <td>
                                    <button class="btn btn-md rounded-circle bg-light border mt-4"  @click="delSel(c.cart_no)" >
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
                        <button @click="orderSel" class="btn btn-primary">선택주문</button>
                        <button @click="orderAll" class="btn btn-primary">전체주문</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Cart Page End -->
</template>
<script>
    import axios from 'axios';
    
    export default {
            data(){ 
                return{
                    cart : [], allChecked : false, cnt : 0
                };   
            },
            created(){
                this.getCart();
            },
            methods: {
                getCart() {
                    axios.get('/api/cart/', {
                        headers: { 'Cache-Control': 'no-cache' }
                    })
                    .then(result => {
                        console.log(result);
                        this.cart = result.data;
                    })
                    .catch(err => console.log(err));
                },
                async delSel(no) {
                    await axios.delete(`/api/cart/${no}`);
                    this.getCart();
                },
                async delAll() {
                    await axios.delete('/api/cart/');
                    this.getCart();
                },
                orderSel() {
                    let selectedCart = {};
                    this.cart.forEach(a => {
                        if (a.selected) {
                            selectedCart.push(a);
                        }
                    });
                    this.$router.push({
                        path: 'orderForm',
                        query: { Cart: JSON.stringify(selectedCart) }
                    });
                },
                orderAll() {
                    // 전체 주문 처리 로직
                },
                checkedAll(checked) {
                    this.cart.forEach(a => a.selected = checked);
                },
                formatPrice(price){
                    return price.numberFormat();
                },
                // cntBtn(no, cnt, prodPrice){
                //     console.log(no, cnt, prodPrice, '값')
                //     axios.put(`/api/cart/updateCnt/?no=${no}&cnt=${cnt}&price=${prodPrice}`)
                //     //this.getCart();
                // },
                cntBtn(no, cnt, prodPrice){
                    if(cnt > 1){
                        cnt--;
                        axios.put(`/api/cart/updateCnt/?no=${no}&cnt=${cnt}&price=${prodPrice}`)
                    }else if(cnt === 1){
                        cnt--;
                        axios.put(`/api/cart/updateCnt/?no=${no}&cnt=${cnt}&price=${prodPrice}`)
                    }else{
                        alert('1개 이상 담을 수 있습니다.') 
                        cnt++;
                        return;
                    }
                },
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