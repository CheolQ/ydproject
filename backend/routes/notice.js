const express = require('express');
const router = express.Router()
const query = require('../mysql/index');
//목록
router.get("/",	async(req ,	res )	=> {
 	// let result =	await query("noticeList");
	// console.log(result)
 	// res.send(result);
	//복사
	let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let search = '%'+req.query.search+'%'

    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;

    let list = await query("noticeList",[search, offset,pageUnit]);
    let count = await query('noticeCount', search)
    count = count[0].cnt;
    res.send({list,count})
});

//단건조회
router.get("/:no",	async (req , res )	=> {
 	let result =	await query("noticeInfo",	req.params.no );
 	res.send(result);
});



module.exports = router ;