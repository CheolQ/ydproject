<template>
    <div class="text-md my-5">
        <div class="form-item">
            <label class="form-label my-3">우편번호<sup>*</sup></label>
            <input type="button" @click="execDaumPostcode()" value="우편번호 찾기">
            <input type="text" id="pCode" v-model="pCode" class="form-control" placeholder="우편번호" readonly><br>
        </div>
        <div class="form-item">
            <label class="form-label my-3">주소<sup>*</sup></label>
            <input type="text" id="address" v-model="address" class="form-control" placeholder="주소" readonly><br>
        </div>
        <div class="form-item">
            <label class="form-label my-3">상세주소<sup>*</sup></label>
            <input type="text" id="detailAddress" v-model="detailAddr" class="form-control" placeholder="상세주소">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                address: '',
                pCode: '',
                detailAddr: '',
            };
        },
        created(){},
        methods : {
            execDaumPostcode(){
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.address = data.address;
                    this.pCode = data.zonecode;
                    this.detailAddr = data.detailAddr;
                },
            }).open();
        },
        }
    }
</script>
<style>
</style>