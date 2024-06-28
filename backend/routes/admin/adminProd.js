const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //파일이 저장 될 위치 지정
      cb(null, 'd:/upload'); 
    },
    filename: function (req, file, cb) {
      const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      cb(null, originalname);
    }
  });
const upload = multer({ storage: storage });


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

const cpUpload = upload.fields([{ name: 'image1', maxCount: 1}, { name: 'image2', maxCount: 1}])
router.post("/prod", cpUpload, (req,res) =>{
    let data = { ...req.body };
    console.log(data);
    console.log(req.files);
    console.log(req.files.length);
    
})


module.exports = router;