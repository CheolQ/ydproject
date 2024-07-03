module .exports = {

    //로그인
    userlogin: `select * from user 
                     where user_id = ?
                     and user_pw = ?`,

    //회원가입
    userjoin: `insert into user (user_id, user_pw, name, email, tel, postcode, addr, detail_addr) values (?, ?, ?, ?, ?, ?, ?, ?)`,
    
    //아이디 중복체크
    checkId: `select count(*) as count from user where user_id = ?`,

    //아이디찾기
    userfindid:   `select user_id from user
                        where name = ?
                        and tel = ?`,

    //비밀번호찾기
    userfindpw: `select user_id from user
                        where user_id = ?
                        and tel = ?`,
                        
    // 비밀번호 업데이트
    updatePassword: `update user set user_pw = ? where user_id = ?`,

     // 비밀번호 업데이트
    //  updatePassword: `UPDATE user SET user_pw = ? WHERE user_id = ? AND tel = ?`,

    // 회원정보변경
    usermodify: `update user
                        set  user_pw = ?,
                        name = ?,
                        email = ?,
                        tel = ?,
                        postcode = ?,
                        addr = ?,
                        detail_addr = ?
                        where user_no = ?`,
             
    // 회원정보변경 기존데이터 가져오기
    usermodifyinfo: `select user_id, user_pw, name, email, tel, postcode, addr, detail_addr from user where user_no = ?`,
           
    //간편로그인회원 정보수정

    // 회원탈퇴
    userdelete:    `delete from user 
                        where user_no = ? 
                        and user_pw = ?`,
    
};