var express = require('express');
var router = express.Router();
const query = require('../mysql/index');

//로그인
router.post('/login', async (req, res) => {
    const userid = req.body.user_id;
    const userpw = req.body.user_pw;
    let result = await query('userlogin', [userid, userpw]);
    console.log(result);
    user = result.find((m) => {
        return m.user_id == userid && m.user_pw == userpw
      });
    if (user) {
        req.session.user_id = userid; // 세션에 사용자 이메일 정보 저장
        req.session.is_logined = true; // 세션에 로그인 여부 저장
        req.session.user_no = user.user_no;
        req.session.save((err) => {
            // 세션 저장
            if (err) {
                throw err;
            }
            res.send(user);
            console.log('---------------------------------------------------');
            console.log(req.session);
            console.log('---------------------------------------------------');
        });
    } else {
        res.send(401);
    }

});

// 로그아웃
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send(200);
});

// 회원가입
router.post('/join', async (req, res) => {
    const { user_id, user_pw, name, email, tel, postcode, addr, detail_addr } = req.body;
    let result;
    try {
        result = await query('userjoin', [user_id, user_pw, name, email, tel, postcode, addr, detail_addr]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('회원가입에 실패했습니다.');
    }
});

// 아이디찾기
router.post('/userfindid', (req, res) => {
    const { name, tel } = req.body;
    query('userfindid', [name, tel])
        .then(result => {
            if (result.length > 0) {
                const userId = result[0].user_id;
                res.send({ user_id: userId });
            } else {
                res.status(404).send('해당하는 유저를 찾을 수 없습니다.');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('아이디 찾기에 실패했습니다.');
        });
    });


//회원수정
// router.put("/)",	async (req ,res )=> {
//  	let result =await query("userUpdate",[req.body,	req.params.id]);
//  	res.send(result);
// });

// 회원탈퇴
// router.delete("/:id)",	async (req ,	res )	=> {
//  	let result =	await query("userDelete",	req.params.id );
//  	res.send(result);
// });

module.exports = router;
