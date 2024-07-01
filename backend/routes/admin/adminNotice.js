const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminNoticeList",[offset, pageUnit]);
    let count = await query("AdminNoticCount")
    res.send({list, count})
})

router.post("/", async (req, res) => {

})

router.put("/:id", async (req,res) => {
    let result = await query("AdminNoticeUpdate", [req.body, req.params.id])
    res.send(result);
})

router.delete("/:id", (req, res) => {
    query('AdminNoticeDelete', req.params.id)
    .then(result => res.send(result))
})


module.exports = router;