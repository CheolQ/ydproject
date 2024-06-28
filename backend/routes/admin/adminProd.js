const express = require('express');
const router = express.Router()
const multer  = require('multer')
let upload = multer({ dest: 'uploads/' });

const query = require("../../mysql/index")

router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminProdList", [offset, pageUnit]);
    let count = await query('AdminProdCount');
    res.send({list, count})
})    

router.get("/category", async (req, res) => {
    let list = await query("AdminProdCategory1");
    res.send(list);
})

router.post("/category", async (req, res) => {
    console.log(req.body.parentView);
    let list = await query("AdminProdCategory2", req.body.parentView);
    res.send(list);
})

router.post("/prod", upload.array('img'), (req,res,next) =>{
    console.log(req.file, req.body)
})


module.exports = router;