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
    console.log('result:', JSON.stringify(result)); // 전체 결과를 문자열로 변환하여 출력

    // orderDetail.forEach(dtorder => {
    //     dtorder.order_no = result.insertId;
    //     console.log(dtorder);
    //     query("orderDtInsert", dtorder)
    //     .then(val => console.log(val))
    // })
    

})

module.exports = router;