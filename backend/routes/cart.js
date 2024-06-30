const express = require('express');
const router = express.Router();
const query = require("../mysql/index"); 

//장바구니 리스트
router.get("/", (req, res) => { 
    //console.log('확인')
    query("cartList", req.session.user_no)
    .then(result => res.send(result))
});
//장바구니 삭제
router.delete("/:no", (req, res) => {
    query("cartDelete", req.params.no)
    //console.log(req.params, '확인')
    .then(result => res.send(result))
});
//전체 장바구니 삭제
router.delete("/", (req, res) => { 
    query("cartAllDelete", 1) //유저 no로 받아오는 값을 넣어줘야해
    .then(result => res.send(result))
});
//장바구니 수량 변경
router.put("/updateCnt/", (req, res) => {
    let newPrice = req.query.price * req.query.cnt;
    query("cartCntUpdate", [req.query.cnt, newPrice, req.query.no ])
    .then(result => res.send(result))
    .catch(err => console.log(err))
});
//장바구니 등록
router.post("/cartInsert/:no", (req, res) => {
    //console.log(req.params, '등록되었나')
    // query("cartInsert", req.params.no)
    // .then(result => res.send(result))
    // .catch(err => console.log(err))
    // console.log(req.params.no);
    query("cartSearch", req.params.no)
    .then(result => {
        if(result.length != 0){
            query("cartUpdate", req.params.no)
        }else{
            query("cartInsert", req.params.no)
        }
    });

})

//관심상품에서 장바구니로 insert
router.post("/updateCart", async (req, res) => {
    let result = req.body;
    let userNo = req.session.user_no;
    let cartList = await query("cartList", userNo)
    console.log(cartList, '장바구니')
    let count = 0;
    result.forEach(function(a){ //장바구니에 넣어어야할 개수만큼 반복
        let check = true; //중복체크위한 변수선언
        a.user_no = userNo;
        cartList.forEach(function(b){ // 내 장바구니에 있는 상품만큼 반복
            if(a.prod_no == b.prod_no){ //관심상품에 있는 상품(a)이랑 장바구니에 있는 상품(b)이 같을때
                check = false; //겹치는게 있는 경우에 false로 한다.
            }
        })//겹치는게 있는지 체크를 장바구니에 있는 상품 개수만큼 for문을 돌고
        if(check){ //겹치는게 없는 경우 (check가 true일때) wish에서 cart로 insert되는것
            query("wishToCartInsert", [a.prod_no, a.price, a.user_no])
            count++;
        }
    })
    res.send({
        count : count
    }); //몇개가 insert되었는지
})

module.exports = router;