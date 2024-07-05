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

    let list = await query('userList', [name, date1, date2, category, offset, pageUnit]);
    let count = await query('userCount', [name, date1, date2, category]);
    
    console.log(list);
    console.log(count);
    res.send({list,count})
})

router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    let qna = await query('userModalQna', req.params.id).then().catch(err=>console.log(err))
    let review = await query('userModalReview', req.params.id).then().catch(err=>console.log(err))

    res.send({qna, review})
})

module.exports = router;