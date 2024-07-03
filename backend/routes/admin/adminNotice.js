const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")
const multer  = require('multer')
const fs = require("fs");

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //파일이 저장 될 위치 지정
        cb(null, './uploads/notice'); 
    },
    filename: function (req, file, cb) {
        const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
        cb(null, Date.now() + '-' + originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/",upload.array("files"), async (req, res) => {
    let data = { ...req.body };
    console.log(data)
    console.log(req.files)
    console.log(req.files.length);
    await query("AdminNoticeInsert", [req.session.user_id ,data.title, data.content, req.session.user_no])
    .then(result=>console.log(result))
    .catch(err => console.log(err))
    let table = await query("AdminNoticeLastNo");
    for(let i=1; i<req.files.length+1; i++){
        query("AdminNoticeFile",[req.files[i-1].filename, req.files[i-1].path, req.files[i-1].mimetype, table[0].no, i])
        .then(result=>{console.log(result)})
        .catch(err=>{console.log(err)})
    }
})

router.put("/:id", async (req,res) => {
    let result = await query("AdminNoticeUpdate", [req.body, req.params.id])
    res.send(result);
})

router.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    let result = await query("AdminNoticeFileCount", req.params.id)
    console.log(result.length);
    for(let i=0; i<result.length; i++){
        if (fs.statSync(`d:/uploads/${result[i].file_name}`)){
            try{
                fs.unlinkSync(`d:/uploads/${result[i].file_name}`)
            } catch(err){
                console.log(err)
            }
        }
    }
    query('AdminNoticeFileDelete', req.params.id)
    .then(result => console.log(result))
    .catch(err=> console.log(err))

    query('AdminNoticeDelete', req.params.id)
    .then(result => res.send(result))
    .catch(err => console.log(err))
})


module.exports = router;