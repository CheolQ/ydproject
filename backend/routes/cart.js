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
router.post("/:no", (req, res) => {
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


module.exports = router;