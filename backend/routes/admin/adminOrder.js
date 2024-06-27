const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let orderStauts = req.query.orderStatus;

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminOrderList", [orderStauts, offset, pageUnit]);
    let count = await query('AdminOrderCount', orderStauts);
    console.log(count);
    res.send({list,count}); 
})

router.post("/", async (req, res) => {
    console.log(req.body);
    let list1 = await query('AdminOrderInfo1', req.body.no);
    let list2 = await query('AdminOrderInfo2', req.body.no);
    res.send({list1,list2})
})

router.put("/", async (req, res) => {
    console.log(req.body);
    let no = req.body.no;
    let orderStatus = req.body.orderStatus;
    let deilCode = req.body.deilCode;
    await query('AdminOrderInfoUpdate', [orderStatus, deilCode, no])
    res.send('check');
})

module.exports = router;