const express = require('express');
const router = express.Router()
const query = require('../mysql/index.js');
//상품목록
router.get("/",	async(req ,	res )	=> {
 	let result =	await query("prodList");
 	res.send(result);
});

//상품단건조회
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
//qna 단건조회
router.post("/qna/:no",	async(req ,	res )	=> {
	console.log(req.body)
	let prodno = req.body.prodno;
	let boardno = req.body.qnano;
	let result = await query("qnaInfo", [prodno, boardno]);
	console.log(result);
	res.send(result);

});


//qna작성
router.post("/qna", async(req ,	res )	=> {
	let result =	await query("qnaInsert", req.body);
	console.log('등록되니',result);
	res.send(result);
});

//qna수정
router.put("/qna/:no",	async (req ,res )	=> {
	let result = await query("qnauUpdate",	[req.body,	req.params.no]);
	res.send(result);
});

module.exports = router ;