
module.exports = {
    noticeList: `SELECT notice_no, user_id, title, content,	create_date, user_no 
                 FROM notice
                 order by notice_no desc limit ? , ?`,
    noticeCount : 'select count(*) cnt from notice',
    noticeInfo: `select notice_no, user_id, title, content, create_date,
                    (select file_name
                    from file
                    where table_no = notice_no
                    and division = 'E1') as file_name 
                from notice
                where notice_no = ?`
  
}