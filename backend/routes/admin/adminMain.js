const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req,res) => {
    let result = await query("adminSales")
    res.send(result);
})
router.get("/category", async (req,res) => {
    let result = await query("adminCategorySales")
    console.log(result)
    res.send(result);
})
router.get("/mainInfo", async (req,res) => {
    let weekSales = await query("adminWeekSales")
    let daySales = await query("adminDaySales")
    let qnaReply = await query("adminQnaReply")
    let orderComplete = await query("adminOrderComplete")

    res.send({weekSales,daySales, qnaReply, orderComplete})
})


module.exports = router;