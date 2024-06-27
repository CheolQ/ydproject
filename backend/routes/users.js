var express = require('express');
var router = express.Router();
const query = require('../mysql/index');


// 로그인
router.post("/",async(req,res )=> {
  console.log(req.body)
  const user = req.body.user_id;
  const pw = req.body.user_pw;
  let result =await query("userlogin",[user, pw]);
  console.log(result);
  res.send(result);
});
 
// 회원가입
router.post("/",async (req ,res )=> {
  console.log(req.body , res)
//   let result =await query("userjoin",	req.body );
//   console.log('ㅁㄴㅇㄻㄴㄻㄴㅇㄹㄴㅇㅁ',result)
//   res.send(result);
});


// 회원수정
// router.put("/:id)",	async (req ,res )=> {
//  	let result =await query("userUpdate",[req.body,	req.params.id]);
//  	res.send(result);
// });

// 회원탈퇴
// router.delete("/:id)",	async (req ,	res )	=> {
//  	let result =	await query("userDelete",	req.params.id );
//  	res.send(result);
// });

module.exports = router;
