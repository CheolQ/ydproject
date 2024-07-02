const express = require('express');
const router = express.Router();
const query = require("../mysql/index"); 

router.post('/', async (req, res) => {
    let orderData = [ //쿼리 물음표 순서대로 물음표 여러개니까 배열안에 순서대로 넣음
        req.body.buyerName,
        req.body.paidAmount,
        'P', //주문 상태인데 default로 박아뒀음
        req.body.buyerTel,
        req.body.buyerAdd,
        req.body.buyerPost,
        req.body.detail_addr,
        req.session.user_no,
        req.body.paidAmount /10,
        req.body.merchantUid //결제번호(코드)int였는데 varchar로 타입바꿈 
    ];

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
        console.log(dtCount); //dtCount배열 출력(오더디테일에 있는 오더넘버 하나하나가 오더디테일넘버..)
        res.send({
            dtCount: dtCount
        });
    }catch(err){console.error(err);
    }
});

module.exports = router;