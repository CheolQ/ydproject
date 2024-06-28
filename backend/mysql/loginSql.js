module .exports = {

    //로그인
    userlogin: `select * from user 
                     where user_id = ?
                     and user_pw = ?`,

    //회원가입
    userjoin: `insert into user ser`,
    

    //아이디찾기
    userfindid: `select user_name from user
                    where user_name = ?
                    and tel = ?`,

    //비밀번호찾기
    userfindpw: `select user_id from user
                    where user_id = user_id
                    and tel = tel`,

    //회원정보수정
    usermodify: `update user
                        set  user_pw = ?
                        name = ?
                        email = ?
                        tel = ?
                        postcode = ?
                        addr = ?
                        detail_addr = ?
                        where user_id = user_id`
    //간편로그인회원 정보수정

    //회원탈퇴
};