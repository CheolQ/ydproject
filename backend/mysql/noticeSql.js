
module.exports = {
    noticeList: `SELECT notice_no, user_id, title, content,	create_date, user_no 
                 FROM notice`,
    // noticeInfo: `SELECT notice_no, user_id, title, content,	create_date, user_no 
    //              FROM notice 
    //              WHERE notice_no = ?`,
    noticeInfo: `select notice_no, user_id, title, content, create_date,
                    (select file_name
                    from file
                    where table_no = notice_no
                    and division = 'E1') as file_name 
                from notice
                where notice_no = ?`
  
}