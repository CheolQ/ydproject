const express = require('express');
const router = express.Router()
const query = require('../mysql/index');

//댓글목록
router.get("/:no",	async(req ,	res )	=> {
	let result =	await query("reviewList", req.params.no);
	console.log('aaaa'+ result[0].review_no);
	res.send(result);
});
//리뷰단건조회
// router.get("/:no",	async (req , res )	=> {
// 	let result =	await query("reviewInfo",	req.params.no );
// 	res.send(result);
// });
module.exports = router ;