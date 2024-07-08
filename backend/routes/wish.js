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
    let userNo = req.session.user_no;
    //console.log(userNo,'유저넘버가져오는지 확인')
    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 2; }

    let offset = (page - 1) * pageUnit;

    let list = await query("wishList", [userNo, offset, pageUnit]);
    let count = await query("wishListCount", userNo);
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
    query("wishAllDelete", req.session.user_no)
    .then(result => res.send(result))
})

//관심상품 등록(상세에서 like버튼 눌렀을때)
router.post("/insert/:no", (req, res) => {
    //console.log('넘어오는지만 확인')
    // query("wishInsert", [req.params.no, req.session.user_no]) 
    // //유저넘버는 백에서 세션으로 받아오기때문에 프론트에서 따로 보내줄 필요x
    // .then(result => res.send(result))
    // .catch(err => res.status(500).send(err));
    query('wishSearch', [req.params.no, req.session.user_no])
    .then((result) => {
        if(result.length == 0){
            query('wishInsert', [req.params.no, req.session.user_no]);
            res.send('success');
        }else{
            res.send('none');
        }
    });
})

module.exports = router;