const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query('userList', [offset, pageUnit]);
    let count = await query('userCount');
    console.log(list);
    console.log(count);
    res.send({list,count})
})

module.exports = router;