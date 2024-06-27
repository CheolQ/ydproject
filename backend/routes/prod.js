const express = require('express');
const router = express.Router()
const query = require('../mysql/index');
//목록
router.get("/",	async(req ,	res )	=> {
 	let result =	await query("prodList");
 	res.send(result);
});

//단건조회
router.get("/:no",	async (req , res )	=> {
 	let result =	await query("prodInfo",	req.params.no );
	console.log(result);
 	res.send(result);
});
//리뷰조회
router.get("/review/:no",	async(req ,	res )	=> {
	let result =	await query("reviewList", req.params.no);
	// console.log('aaaa'+ result[0].review_no);
	res.send(result);
});
//qna조회
router.get("/qna/:no",	async(req ,	res )	=> {
	let result =	await query("qnaList", req.params.no);
	// console.log('aaaa'+ result[0].review_no);
	res.send(result);
});
module.exports = router ;