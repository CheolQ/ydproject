var express = require('express');
var router = express.Router();
const query = require('../mysql/index');


//로그인 
router.post("/login", async(req,res)=>{
	const userid = req.body.user_id;
	const userpw = req.body.user_pw;
	console.log(userid);
	console.log(userpw);
	let result = await query("userlogin",[userid,userpw]);
	//  res.send(result);
	user = result.find(m=>m.user_id === userid && m.user_pw === userpw)
 	console.log('user:',user);
	if(user) {
	  req.session.user_id = userid; // 세션에 사용자 이메일 정보 저장
	  req.session.is_logined = true; // 세션에 로그인 여부 저장
	  req.session.save(err => { // 세션 저장
		if(err) {
		console.log('에러')	
			throw err;
		}
		console.log('세션 저장 완료:', req.session);
		res.send(user)
	  });
	}
	else{
		res.send(401);
	}
});

//로그아웃 
router.post("/logout",(req, res) => {
    req.session.destroy();
    res.send(200);
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
