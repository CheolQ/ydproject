const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")
const multer  = require('multer')

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) { //파일이 저장 될 위치 지정
    cb(null, 'd:/upload'); 
  },
  filename: function (req, file, cb) {
    const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
    cb(null, Date.now() + '-' + originalname);
  }
});
const upload = multer({ storage: storage });

const cpUpload = upload.fields([{ name: 'image1', maxCount: 1}, { name: 'image2', maxCount: 1}])

router.post("/prod", cpUpload, async (req,res) =>{
  console.log(req.files);
  let file1 = { ...req.files.image1};
  let file2 = { ...req.files.image2};
  let data = { ...req.body,  main_img: file1[0].filename, detail_img: file2[0].filename};
  console.log(data);
  console.log(file1[0].filename);
  console.log(file2[0].filename);
  await query("AdminProdInsert", data)
  res.send("ok")
})


module.exports = router;