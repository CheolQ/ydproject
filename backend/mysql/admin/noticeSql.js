module.exports = {
    AdminNoticCount: `select count(*) as cnt 
                      from notice`,
    AdminNoticeList: `select notice_no, user_id, title, create_date
                      from notice`,
    AdminNoticeUpdate: `update notice set ? where notice_no = ?`,
    AdminNoticeDelete: `delete from notice where notice_no = ?`,              
}