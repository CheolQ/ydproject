const express = require('express');
const router = express.Router()
const query = require("../../mysql/index")
const multer  = require('multer')
const fs = require("fs");


router.get("/", async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    console.log(req.query);

    let name = '%'+req.query.name+'%';
    let date1 = req.query.date1;
    let date2 = req.query.date2;
    let category = '%'+req.query.category+'%';
  
    console.log(name);
    
    if(!date2) {
      date2 = await query("AdminExpdate");
      date2 = date2[0].date;
    }
    if(!page){ page = 1; }
    if(!pageUnit){ pageUnit = 10;}
    let offset = (page-1) * pageUnit;

    let list = await query("AdminProdList", [name, date1, date2, category, offset, pageUnit]);
    let count = await query('AdminProdCount',[name, date1, date2, category]);
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
    cb(null, '../frontend/public/img/prodImg'); 
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

router.delete("/:no", async (req,res) => {
  console.log(req.body.main);
  console.log(req.body.detail);
  console.log(req.params.no);
  await query('AdminProdDelete', req.params.no);
  if (fs.existsSync(`../frontend/public/img/prodImg/${req.body.main}`)) {
    console.log('확인');
    try{
      fs.unlinkSync(`../frontend/public/img/prodImg/${req.body.main}`)
      fs.unlinkSync(`../frontend/public/img/prodImg/${req.body.detail}`)
    } catch (err){
      console.log(err)
    }
  }
  res.send("ok")
})

router.post("/ps/:no", async (req,res) => {
  let result = await query('AdminProdInfo', req.params.no);
  res.send(result);
})

const pUpload= upload.fields([
              { name: 'main_img', maxCount: 1}, { name: 'detail_img', maxCount: 1}, 
              {name: 'category_code'}, {name: 'prod_name'}, {name: 'prod_price'},
              {name: 'maker'}, {name: 'origin'}])

router.post("/prod/:no", pUpload, async (req,res) => {
  let data = { ...req.body}
  let result = await query('AdminProdGet', req.params.no)
  if(req.files.main_img){
    let file1 = { ...req.files.main_img};
    if (fs.existsSync(`../frontend/public/img/prodImg/${result[0].main_img}`)) {
      fs.unlinkSync(`../frontend/public/img/prodImg/${result[0].main_img}`)
    }
    data.main_img  = file1[0].filename;
  }
  else{
    data.main_img = result[0].main_img;
  }
  if(req.files.detail_img){
    let file2 = { ...req.files.detail_img};
    if (fs.existsSync(`../frontend/public/img/prodImg/${result[0].detail_img}`)) {
      fs.unlinkSync(`../frontend/public/img/prodImg/${result[0].detail_img}`)
    }
    data.detail_img = file2[0].filename;
  }
  else{
    data.detail_img = result[0].detail_img;
  }
  console.log(data);
  await query('AdminProdUpdate', [data, req.params.no])
  res.send("ok")
})

module.exports = router;