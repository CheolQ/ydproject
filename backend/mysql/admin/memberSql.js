module.exports = {
    userCount: `select count(*) as cnt
                from user`,
    userList: `select user_no, user_id, name, if(user.resp != 'b2','관리자','회원') as resp, point, hiredate 
               from user
               limit ?, ?`,

}