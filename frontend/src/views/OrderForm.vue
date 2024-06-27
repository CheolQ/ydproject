<template>
            <!-- Checkout Page Start -->
            <div class="container-fluid py-5">
            <div class="container py-5">
                <h2 class="aside-tit">ORDER FORM</h2>
                <form action="#">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-6 col-xl-7">
                            <div class="form-item">
                                <label class="form-label my-3">Name<sup>*</sup></label>
                                <input type="text" class="form-control" id="name" >
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Phone<sup>*</sup></label>
                                <input type="tel" class="form-control" id="phone" >
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Email<sup>*</sup></label>
                                <input type="email" class="form-control" id="email" >
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Address <sup>*</sup></label>
                                <input type="text" class="form-control" placeholder="House Number Street Name">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="table-responsive">
                                <div>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <!-- <th scope="col">이미지</th> -->
                                                <th scope="col">상품명</th>
                                                <th scope="col">개수</th>
                                                <th scope="col">금액</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="c in selectedCart">
                                                <!-- <td scope="row">
                                                    <div class="d-flex align-items-center">
                                                        <img src="#" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="">
                                                    </div>
                                                </td> -->
                                                <td>
                                                    <p class="mb-0 mt-4">{{ c.prod_name }}</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0 mt-4">{{ c.cnt }}</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0 mt-4">{{ c.price }}원</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="discount">주문금액
                                    <input readonly v-model="totalPrice">
                                </div>
                                <div class="mt-5">
                                    <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="사용할 적립금">
                                    <button @click="points" class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">POINT</button>
                                </div>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div class="col-12">
                                    <div class="form-check text-start my-3">
                                        <input type="checkbox" class="form-check-input bg-primary border-0" id="Payments-1" name="Payments" value="Payments">
                                        <label class="form-check-label" for="Payments-1">Check Payments</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="button"  @click="payments" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Checkout Page End -->
</template>
<script>
    export default {
        data(){
            return{
                selectedCart : [],
                totalPrice : 0
            };
        },
        created() {
            const queryCart = this.$route.query.Cart;
            if (queryCart) {
                this.selectedCart = JSON.parse(queryCart);
                console.log(this.selectedCart, '확인!')
            }
        },
        mounted(){
            this.discount();
        },
        methods : {
            payments(){

            },
            discount(){
                this.selectedCart.forEach(a => {
                    this.totalPrice += Number(a.price);
                });
            },
            points(){
                let point = 100
                this.totalPrice -= point;
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