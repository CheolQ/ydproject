<template>
            <!-- Checkout Page Start -->
            <div class="container-fluid py-5">
            <div class="container py-5">
                <h1 class="mb-4">Billing details</h1>
                <form action="#">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-6 col-xl-7">
                            <div class="row">
                                <div class="col-md-12 col-lg-6">
                                    <div class="form-item w-100">
                                        <label class="form-label my-3">First Name<sup>*</sup></label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <div class="form-item w-100">
                                        <label class="form-label my-3">Last Name<sup>*</sup></label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Company Name<sup>*</sup></label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Address <sup>*</sup></label>
                                <input type="text" class="form-control" placeholder="House Number Street Name">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Town/City<sup>*</sup></label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Country<sup>*</sup></label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Mobile<sup>*</sup></label>
                                <input type="tel" class="form-control">
                            </div>
                            <div class="form-item">
                                <label class="form-label my-3">Email Address<sup>*</sup></label>
                                <input type="email" class="form-control">
                            </div>
                            <div class="form-check my-3">
                                <input type="checkbox" class="form-check-input" id="Account-1" name="Accounts" value="Accounts">
                                <label class="form-check-label" for="Account-1">Create an account?</label>
                            </div>
                            <hr>
                            <div class="form-check my-3">
                                <input class="form-check-input" type="checkbox" id="Address-1" name="Address" value="Address">
                                <label class="form-check-label" for="Address-1">Ship to a different address?</label>
                            </div>
                            <div class="form-item">
                                <textarea name="text" class="form-control" spellcheck="false" cols="30" rows="11" placeholder="Oreder Notes (Optional)"></textarea>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Checkout Page End -->
    <!-- <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">QnA</h1>
 			<table class ="table width:100%">
                <thead>
                    <tr class="tr1">
                        <th class="thwidth">제목</th>
                        <td scope ="col"  colspan="4">{{noticeInfo.title }}</td>
                        <th class ="thwidth">작성일</th>
                        <td scope ="col"class ="thwidth">{{getDateFormat(noticeInfo.create_date) }}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td scope ="col" class ="dd" colspan="6">{{noticeInfo.user_id }}</td>
                      
                    </tr>        
                </thead>
                <tbody>
                    <tr>
                        <td scope ="col"class ="text-center"  colspan="7">{{noticeInfo.content }}</td>
                    </tr>
                </tbody>               
            </table>
        </div>
        <button @click="goToList" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
            List</button>
       
    </div> -->
</template>

<script	>
// import axios from "axios";
export	default {
 	data ()	{
 	 return {
    //    searchNo:"",
    //    bookInfo: {
    //     user_id:"",
    //     title:"",
    //     content:"",
    //     prod_no:"",
    //     create_date:"",
    //   },
 	 };
 	},
 	created()	{
        // this.searchNo =	this.$route.query.no ||	"";
        // if (this.searchNo > 0 ) {
        //     this.getQnaInfo ();
        // } 
        // else {
        // this.qnaInfo.create_date =this.getToday ('');
        // }
 	},
    watch:{},
 	methods: {
        // async getQnaInfo()	{
 	    //     let result = await axios.get(`/api/shop/${this.searchNo }`);
 	    //     this.qnaInfo = result.data [0];
 	    // },
 	    // async saveQna(no)	{
 	    //     const url =	"/api/shop";
 	    //     let param =	{
 	    //         name:this.bookInfo.user_id,
 	    //         title:this.bookInfo.title,
 	    //         content:this.bookInfo.content,
 	    //     };
 	    //     //수정
 	    //     if(no >0 )	{
 	    //         const result = (await axios .put(`${url}/${no}`, param )).data ;
 	    //         if(result.affectedRows >0 )	{
 	    //             alert("정상적으로 수정되었습니다.");
 	    //         } else {
 	    //             alert("정상적으로 저장되지 않았습니다.");
 	    //         }
 	    //     //등록
 	    //     } else {
 	    //         const result = (await axios.post(url, param)).data ;
 	    //         if(result.insertId >0 ) {
 	    //             alert("정상적으로 등록되었습니다.");
 	    //             //this.boardInfo.no	=	result.insertId;
 	    //             this.$router.push({	path:"/shop" });
 	    //         } else {
 	    //             alert("정상적으로 저장되지 않았습니다.");
 	    //         }
 	    //     }
 	    // },
        // getToday(val )	{
        //     console.log(val);
        //     let date = val == '' ? new Date() : new Date(val);
        //     let year = date.getFullYear();
        //     let month = ('0' + (date.getMonth() + 1)).slice(-2);
        //     let day = ('0' + date.getDate()).slice(-2);
        //     return `${year}-${month}-${day}`;
 	    // },
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