const express = require('express');
const router = express.Router()
const query = require('../mysql/index');

//유저 정보 조회
router.get("/userinfo/:id",	async(req ,	res )	=> {
 	let result =	await query("userInfo", [req.params.id, req.params.id]);
 	res.send(result);
});

// //단건조회
// router.get("/:no",	async (req , res )	=> {
//  	let result =	await query("noticeInfo",	req.params.no );
//  	res.send(result);
// });

module.exports = router ;