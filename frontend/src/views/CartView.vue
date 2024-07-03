<template>
    <h2 class="aside-tit">CART</h2>
    <!-- Cart Page Start -->
    <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="table-responsive">
                <table class="table">
                    <colgroup>
                        <col width="50">
                        <col width="50">
                        <col width="150">
                        <col width="150">
                        <col width="65">
                        <col width="80">
                        <col width="80">
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col"><input type="checkbox" v-model="allChecked"
                                    @click="checkedAll($event.target.checked)"></th>
                            <!-- <th scope="col">상품번호</th> -->
                            <th scope="col">이미지</th>
                            <th scope="col">상품명</th>
                            <th scope="col">개수</th>
                            <th scope="col">금액</th>
                            <th scope="col">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cart in cartList">
                            <td>
                                <p class="mb-0 mt-4">{{ cart.cart_no }}</p>
                            </td>
                            <td>
                                <p class="mb-0 mt-4"><input type="checkbox" v-model="cart.selected"
                                        @change="AllChecked"></p>
                            </td>
                            <!-- <td>
                                    <p class="mb-0 mt-4">{{ c.prod_no }}</p>
                                </td> -->
                            <td scope="row">
                                <div class="align-items-center">
                                    <img :src="`/api/upload/${cart.main_img}`" @click="gotoProdInfo(cart.prod_no)" class="img-fluid rounded-circle"
                                        style="width: 90px; height: 90px;">
                                </div>
                            </td>
                            <td>
                                <p class="mb-0 mt-4">{{ cart.prod_name }}</p>
                            </td>
                            <td>
                                <div class="input-group quantity mt-4">
                                    <div class="input-group-btn">
                                        <button @click="minusBtn(cart)"
                                            class="btn btn-sm btn-minus rounded-circle bg-light border">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="number" readonly v-model="cart.cnt"
                                        class="form-control form-control-sm text-center border-0">
                                    <div class="input-group-btn">
                                        <button @click="plusBtn(cart)"
                                            class="btn btn-sm btn-plus rounded-circle bg-light border">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="mb-0 mt-4">{{ formatPrice(cart.prod_price * cart.cnt) }}원</p>
                            </td>
                            <td>
                                <button class="btn btn-md rounded-circle bg-light border mt-4"
                                    @click="delSel(cart.cart_no)">
                                    <i class="fa fa-times text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-end">
                    <ul>
                        <li>주문 금액 <span>{{ formatPrice(totalPrice) }}원</span></li>
                    </ul>
                </div>
                <div class="button-container">
                    <div class="left-buttons">
                        <button @click="orderSel" class="btn btn-warning">선택주문</button>
                        <button @click="orderAll" class="btn btn-warning">전체주문</button>
                    </div>
                    <div class="right-button">
                        <button @click="delAll" class="btn btn-danger">전체삭제</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cart Page End -->
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            cartList: [], allChecked: false, cnt: 0
        };
    },
    created() {
        this.getCart();
    },
    computed: {
        totalPrice() {
            return this.cartList.reduce((sum, item) => {
                return sum + (item.prod_price * item.cnt);
            }, 0);
        }
    },
    methods: {
        getCart() {
            axios.get('/api/cart/', {
                headers: { 'Cache-Control': 'no-cache' }
            })
                .then(result => {
                    console.log(result);
                    this.cartList = result.data;
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
            let selectedCart = [];
            this.cartList.forEach(a => {
                if (a.selected) {
                    selectedCart.push(a);
                }
            });
            console.log(selectedCart,'장바구니')
            // this.$store.state.cart = selectedCart;
            // console.log(this.$store.state.cart)
            this.$store.commit('setCart', selectedCart);
            this.$router.push({
                name: 'orderForm',
            });
        },
        orderAll() {
            // 전체 주문 처리 로직
            this.$store.commit('setCart', this.cartList);
            this.$router.push('orderForm', this.cartList);
        },
        checkedAll(checked) {
            this.cartList.forEach(a => a.selected = checked);
        },
        formatPrice(prod_price) {
            return prod_price.numberFormat();
        },
        // cntBtn(no, cnt, prodPrice){ /db값은 변경되지만 음수의 값은 컨트롤 x
        //     console.log(no, cnt, prodPrice, '값')
        //     axios.put(`/api/cart/updateCnt/?no=${no}&cnt=${cnt}&price=${prodPrice}`)
        //     //this.getCart();
        // },
        // cntBtn(cartInfo, mode){ /하나의 로직에서 두가지 기능을 구현
        // //cntBtn(no, cnt, prodPrice){
        //     if(mode){
        //         cartInfo.cnt++;
        //     }else if(cartInfo.cnt > 1){
        //         cartInfo.cnt--;                
        //     }else{
        //         alert('1개 이상 담을 수 있습니다.') 
        //         cartInfo.cnt = 1;
        //     }
        //     axios.put(`/api/cart/updateCnt?no=${cartInfo.cart_no}&cnt=${cartInfo.cnt}&price=${cartInfo.prod_price}`);
        // },
        plusBtn(cart) {
            cart.cnt++;
            axios.put(`/api/cart/updateCnt?no=${cart.cart_no}&cnt=${cart.cnt}&price=${cart.prod_price}`);
        },
        minusBtn(cart) {
            if (cart.cnt < 2) {
                alert('1개 이상 담을 수 있습니다.')
                return;
            } else {
                cart.cnt--;
            }
            axios.put(`/api/cart/updateCnt?no=${cart.cart_no}&cnt=${cart.cnt}&price=${cart.prod_price}`);
        },
        gotoProdInfo(prodNo){
            this.$router.push({ name : 'shopinfo', query : { no : prodNo } })
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
ul {
  list-style: none;
}
.text-end ul li {
  font-weight: bold;
  margin: 10px 0;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; 
  align-items: center; 
}
.left-buttons {
  display: flex;
  gap: 10px; 
}
.right-button {
  display: flex;
  align-items: center;
}
</style>