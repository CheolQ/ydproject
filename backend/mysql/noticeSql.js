
module.exports = {
    noticeList: `SELECT notice_no, user_id, title, content,	create_date, user_no 
                 FROM notice`,
    noticeInfo: `SELECT notice_no, user_id, title, content,	create_date, user_no 
                 FROM notice 
                 WHERE notice_no = ?`,
  
}