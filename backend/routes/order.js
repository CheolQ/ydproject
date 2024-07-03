const express = require('express');
const router = express.Router();
const query = require("../mysql/index");

router.get('/', async (req, res) => {
    query("getUsers", req.session.user_no)
    .then((result => res.send(result)))
})

router.post('/', async (req, res) => {
    console.log(req.body, '바디에 뭐가있는지')
    let orderData = [ //쿼리 물음표 순서대로 물음표 여러개니까 배열안에 순서대로 넣음
        req.body.buyerName,
        req.body.paidAmount,
        'P', //주문 상태인데 default로 박아뒀음
        req.body.buyerTel,
        req.body.buyerAdd,
        req.body.buyerPost,
        req.body.detail_addr,
        req.session.user_no,
        Math.round(req.body.paidAmount * 0.01), //생성되는 포인트 반올림
        req.body.merchantUid, //결제번호(코드)int였는데 varchar로 타입바꿈 ,
        req.body.beforeAmount
    ];
    console.log(orderData, '오더데이터뭐있는지')

    try {
        let orderDetail = req.body.products;
        let result = await query("orderInsert", orderData);

        //promise배열
        let promises = orderDetail.map(async dtorder => { //foreach 대신 map씀
            let price = await query("getPrice", dtorder.prod_no);
            let data = [
                dtorder.cnt,
                JSON.stringify(result.insertId),
                JSON.stringify(price[0].prod_price),
                dtorder.prod_no
            ];
            let val = await query("orderDtInsert", data);
            return val.insertId;
        });

        //promise배열 끝날때까지 기다려
        let dtCount = await Promise.all(promises);
        //console.log(dtCount); //dtCount배열 출력(오더디테일에 있는 오더넘버 하나하나가 오더디테일넘버..)
        res.send({
            dtCount: dtCount
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;