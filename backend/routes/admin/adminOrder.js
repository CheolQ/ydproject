const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminOrderList", [offset, pageUnit]);
    let count = await query('AdminOrderCount');
    console.log(count);
    res.send({list,count}); 
})

router.post("/", async (req, res) => {
    console.log(req.body);
    let list1 = await query('AdminOrderInfo1', req.body.no);
    let list2 = await query('AdminOrderInfo2', req.body.no);
    res.send({list1,list2})
})

module.exports = router;