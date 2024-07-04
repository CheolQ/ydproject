var express = require("express");
var router = express.Router();
const query = require("../mysql/index");
const crypto = require("crypto");

//로그인
router.post("/login", async (req, res) => {
  const userid = req.body.user_id;
  const userpw = req.body.user_pw;
  let result = await query("userlogin", [userid, userpw]);
  console.log(result);
  user = result.find((m) => {
    return m.user_id == userid && m.user_pw == userpw;
  });
  if (user) {
    req.session.user_id = userid; // 세션에 사용자  정보 저장
    req.session.is_logined = true; // 세션에 로그인 여부 저장
    req.session.user_no = user.user_no;
    req.session.save((err) => {
      // 세션 저장
      if (err) {
        throw err;
      }
      res.send(user);
      console.log("---------------------------------------------------");
      console.log(req.session);
    });
  } else {
    res.send(401);
  }
});

//카카오 로그인
router.post("/kakao-login", (req, res) => {
  const { accessToken, kakaoAccount } = req.body;
  console.log("Received accessToken:", accessToken);
  console.log("Received kakaoAccount:", kakaoAccount);
  // 사용자 정보를 처리하고 로그인 로직을 구현합니다.
  // 예: 데이터베이스에 사용자 정보를 저장하거나 확인합니다.
  res.status(200).json({
    message: "카카오 로그인 성공",
    user: kakaoAccount,
  });
});

//네이버 로그인
// router.post('/naverlogin', (req, res) => {
//     const { accessToken, email } = req.body;
//     console.log('Received accessToken:', accessToken);
//     console.log('Received email:', email);
//     // 사용자 정보를 처리하고 로그인 로직을 구현합니다.
//     // 예: 데이터베이스에 사용자 정보를 저장하거나 확인합니다.
//     res.status(200).json({
//         message: '네이버 로그인 성공',
//         user: { email }
//     });
// });

// 로그아웃
router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.send(200);
});

// 회원가입
router.post("/join", async (req, res) => {
  const { user_id, user_pw, name, email, tel, postcode, addr, detail_addr } =
    req.body;
  let result;
  try {
    result = await query("userjoin", [
      user_id,
      user_pw,
      name,
      email,
      tel,
      postcode,
      addr,
      detail_addr,
    ]);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("회원가입에 실패했습니다.");
  }
});

// 아이디 중복 체크
router.post("/checkId", async (req, res) => {
  const { user_id } = req.body;
  try {
    let result = await query("checkId", [user_id]);
    const exists = result[0].count > 0;
    res.send({ exists });
  } catch (error) {
    console.error("아이디 중복 체크 실패:", error);
    res.status(500).send("아이디 중복 체크 중 오류가 발생했습니다.");
  }
});

// 아이디찾기
router.post("/userfindid", (req, res) => {
  const { name, tel } = req.body;
  query("userfindid", [name, tel])
    .then((result) => {
      if (result.length > 0) {
        const userId = result[0].user_id;
        res.send({ user_id: userId });
      } else {
        res.status(404).send("해당하는 유저를 찾을 수 없습니다.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("아이디 찾기에 실패했습니다.");
    });
});

// 비밀번호 찾기
router.post("/userfindpw", async (req, res) => {
  const { user_id, tel } = req.body;
  try {
    let result = await query("userfindpw", [user_id, tel]);
    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.status(404).send("사용자를 찾을 수 없습니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("비밀번호 찾기에 실패했습니다.");
  }
});

// 비밀번호 업데이트
router.post("/updatePassword", async (req, res) => {
  const { user_id, tel, new_password } = req.body;
  try {
    let result = await query("updatePassword", [new_password, user_id, tel]);
    if (result.affectedRows > 0) {
      res.send({ success: true });
    } else {
      res.status(404).send("비밀번호를 업데이트할 수 없습니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("비밀번호 업데이트에 실패했습니다.");
  }
});

// 회원정보변경
router.put("/usermodify", async (req, res) => {
  const user_no = req.session.user_no;
  const { user_pw, name, email, tel, postcode, addr, detail_addr } = req.body;
  try {
    let result = await query("usermodify", [
      user_pw,
      name,
      email,
      tel,
      postcode,
      addr,
      detail_addr,
      user_no,
    ]);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("회원정보 변경에 실패했습니다.");
    console.log(err);
  }
});

// 회원정보변경 기존 값 가져오기
router.get("/usermodifyinfo", async (req, res) => {
  const user_no = req.session.user_no;
  try {
    let result = await query("usermodifyinfo", [user_no]);
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send("사용자를 찾을 수 없습니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("회원정보를 가져오는데 실패했습니다.");
  }
});

//회원탈퇴
router.post("/userdelete", async (req, res) => {
  const user_no = req.session.user_no;
  const { user_pw } = req.body;
  try {
    const result = await query("userdelete", [user_no, user_pw]);
    if (result.affectedRows > 0) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("회원 탈퇴 중 오류가 발생했습니다.");
        }
        res.clearCookie("connect.sid"); // Optional: clear cookie
        res.status(200).send("회원 탈퇴 완료");
      });
    } else {
      res.status(401).send("비밀번호가 일치하지 않습니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("회원 탈퇴를 실패하였습니다.");
  }
});

module.exports = router;
