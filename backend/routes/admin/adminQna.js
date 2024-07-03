const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    let name = '%'+req.query.name+'%';
    let date1 = req.query.date1;
    let date2 = req.query.date2;
    let category = '%'+req.query.category+'%';

    if(!date2) {
        date2 = await query("AdminExpdate");
        date2 = date2[0].date;
    }

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminQnaList", [name, date1, date2, category, offset, pageUnit]);
    let count = await query("AdminQnaCount", [name, date1, date2, category])
    res.send({list, count})
})

router.get("/:no", async (req, res) => {
    let result = await query("AdminQnaInfo", req.params.no)
    res.send(result);
})

router.post("/:no", async (req, res) => {
    let result = await query("AdminReplyInsert",[req.params.no, req.body.replys, req.session.user_no])
    res.send(result);
})

router.put("/:no", async (req,res) => {
    let result = await query("AdminReplyUpdate",[req.body.replys, req.params.no])
    res.send(result);
})

module.exports = router;