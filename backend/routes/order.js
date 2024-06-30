const express = require('express');
const router = express.Router();
const query = require("../mysql/index"); 

router.post('/', async (req, res) => {
    let orderData = [
        req.body.buyerName,
        req.body.paidAmount,
        'P',
        req.body.buyerTel,
        req.body.buyerAdd,
        req.body.buyerPost,
        req.body.detail_addr,
        req.session.user_no,
        req.body.paidAmount / 10,
        req.body.merchantUid // 결제번호
    ];

    try {
        let orderDetail = req.body.products;
        let result = await query("orderInsert", orderData);

        // Promise 배열 생성
        let promises = orderDetail.map(async dtorder => {
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

        // Promise 배열을 모두 기다림
        let dtCount = await Promise.all(promises);

        console.log(dtCount); // 여기서 dtCount 배열이 채워진 값이 출력됨

        res.send({
            dtCount: dtCount
        });
    } catch (error) {
        console.error(error);
    }
});
//오더 결과가 페이지이동하면서 잘받아지는지 확인



module.exports = router;