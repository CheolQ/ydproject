module.exports = {
    AdminQnaCount: `select count(*) as cnt
                    from qna
                    where title like ?
                    and (DATE_FORMAT(create_date, '%Y-%m-%d') >= ? and DATE_FORMAT(create_date, '%Y-%m-%d') <= ?)
                    and (select count(*) from reply where board_no = qna.board_no) like ?`,
    AdminQnaList: `select board_no, prod_no, title, user_id, create_date,
                        (select count(*) 
                        from reply 
                        where board_no = qna.board_no) as cnt
                    from qna
                    where title like ?
                    and (DATE_FORMAT(create_date, '%Y-%m-%d') >= ? and DATE_FORMAT(create_date, '%Y-%m-%d') <= ?)
                    and (select count(*) from reply where board_no = qna.board_no) like ?
                    limit ?, ?`,
    AdminQnaInfo: `select board_no, prod_no, title, content, user_id, create_date,
                        (select count(*) 
                        from reply 
                        where board_no = qna.board_no) as cnt,
                        (select reply_content
                        from reply
                        where board_no = qna.board_no) as reply_content
                   from qna
                   where board_no = ?`,
    AdminReplyInsert: `insert into reply (board_no, reply_content, user_id)
                       values(?, ? , (select user_id
                                      from user
                                      where user_no = ?))`,
    AdminReplyUpdate:   `update reply set
                         reply_content = ?
                         where board_no = ?`,                                              
}