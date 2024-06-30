module.exports = {
    AdminQnaCount: `select count(*) as cnt
                    from qna`,
    AdminQnaList: `select board_no, prod_no, title, user_id, create_date
                   from qna
                   limit ?, ?;`

}