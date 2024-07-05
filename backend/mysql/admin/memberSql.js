module.exports = {
    userCount: `select count(*) as cnt
                from user
                where user_id like ?
                and (DATE_FORMAT(hiredate, '%Y-%m-%d') > ? and DATE_FORMAT(hiredate, '%Y-%m-%d') < ?)
                and resp like ?`,
    userList: `select user_no, user_id, name, 
                      if(user.resp != 'b2','관리자','회원') as resp, 
                      ifnull((select sum(order_total_price)
		                      from orders
		                      where order_status = 'D6'
                              and user_no = user.user_no),0)as price,
                              point, hiredate 
                from user
                where user_id like ?
                and (DATE_FORMAT(hiredate, '%Y-%m-%d') > ? and DATE_FORMAT(hiredate, '%Y-%m-%d') < ?)
                and resp like ?
                limit ?, ?`,
    userModalQna: `select board_no, (select prod_name
                           from prod
                           where prod_no = qna.prod_no) as prod_name,
                           title, create_date
                   from qna
                   where user_id = ?
                   limit 10`,
    userModalReview: `select review_no, review_title, rating,
                            (select prod_name
                            from prod
                            where prod_no = review.prod_no) as prod_name, 
                            create_date
                      from review
                      where user_id
                      limit 10`                           
}