const express = require('express');
const router = express.Router();
const query = require("../mysql/index"); 

//관심상품 리스트
// router.get("/", (req, res) => {
//     //console.log("넘어오는지 확인!!")
//     query("wishList")
//     .then(result => res.send(result));
// })

//관심상품 페이징 리스트
router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 2; }

    let offset = (page - 1) * pageUnit;

    let list = await query("wishList", [offset, pageUnit]);
    let count = await query("wishListCount");
    count = count[0].cnt; //0번째의 컬럼명
    //.then(result => res.send(result))
    res.send({list, count})
});

//관심상품 단품 삭제
router.delete("/:no", (req, res) => {
    query("wishDelete", req.params.no)
    .then(result => res.send(result));
})

//관심상품 전체 삭제
router.delete("/", (req, res) => {
    query("wishAllDelete", 1)
    .then(result => res.send(result))
})

//관심상품 등록
router.post("/:no", (req, res) => {
    console.log(req.params.no, '이동 확인ㅇㅇㅇㅇ')
    query("wishInsert", req.params.no)
    .then(result => res.send(result))
})

//관심상품에서 장바구니로 insert
// router.post("/updateCart", (req, res) => {
//     query("wishToCartInsert", req.params)
//     .then(result => console.log(err))
// })

module.exports = router;