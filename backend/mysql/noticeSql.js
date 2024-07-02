
module.exports = {
    noticeList: `SELECT notice_no, user_id, title, content,	create_date, user_no 
                 FROM notice
                 where title like ? 
                 order by notice_no desc
                 limit ? , ?`,
    noticeCount : `select count(*) cnt 
                   from notice
                   where title like ?`,
    noticeInfo: `select notice_no, user_id, title, content, create_date
                from notice
                where notice_no = ?`
  
}