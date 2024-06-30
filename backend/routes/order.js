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
    console.log(orderData, 'sss')
    let orderDetail = req.body.products;
    let id ;
    let result = await query("orderInsert", orderData);
    console.log('result:', JSON.stringify(result)); // 전체 결과를 문자열로 변환하여 출력(object로 나와서 변환시킴)

    orderDetail.forEach(async dtorder => {
        let price = await query("getPrice", dtorder.prod_no);
        let data = [
            dtorder.cnt,
            JSON.stringify(result.insertId),
            JSON.stringify(price[0].prod_price),
            dtorder.prod_no
        ];
        query("orderDtInsert", data)
        .then(val => console.log(val))
    })
    

})

module.exports = router;