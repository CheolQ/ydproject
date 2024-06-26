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

module.exports = router ;