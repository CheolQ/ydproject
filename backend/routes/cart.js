const express = require('express');
const router = express.Router();
const query = require("../mysql/index"); 

//장바구니 리스트
router.get("/", (req, res) => { 
    //console.log('확인')
    query("cartList")
    .then(result => res.send(result))
})
//장바구니 삭제
router.delete("/:no", (req, res) => {
    query("cartDelete", req.params.no)
    //console.log(req.params, '확인')
    .then(result => res.send(result))
})
//전체 장바구니 삭제
router.delete("/", (req, res) => { 
    query("cartAllDelete", 1) //유저 no로 받아오는 값을 넣어줘야해
    .then(result => res.send(result))
})

module.exports = router;