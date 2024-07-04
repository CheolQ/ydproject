module.exports = {
    AdminNoticCount: `select count(*) as cnt 
                      from notice
                      where title like ?
                      and (DATE_FORMAT(create_date, '%Y-%m-%d') > ? and DATE_FORMAT(create_date, '%Y-%m-%d') < ?)
                      and category_code like ?`,
    AdminNoticeList: `select notice_no, category_code, user_id, title, create_date
                      from notice
                      where title like ?
                      and (DATE_FORMAT(create_date, '%Y-%m-%d') > ? and DATE_FORMAT(create_date, '%Y-%m-%d') < ?)
                      and category_code like ?
                      order by category_code, notice_no desc
                      limit ?, ?`,
                      
    AdminNoticeInfo: `select user_id, title, content, create_date
                      from notice
                      where notice_no = ?`,                  
    AdminNoticeFileInfo: `select file_name, file_path, file_ext, seqs
                          from file
                          where division = 'E1'
                          and table_no = ?`,                  
    AdminNoticeUpdate: `update notice set 
                        title = ?,
                        content = ?
                        where notice_no = ?`,
    
    AdminNoticeFileCount: `select file_name
                           from file
                           where table_no = ?
                           and division = 'E1'`,
    AdminNoticeFileDelete: `delete from file
                            where table_no = ?
                            and division = 'E1'`,
    AdminNoticeDelete: `delete from notice 
                        where notice_no = ?`,

    AdminNoticeInsert: `insert into notice (category_code, user_id, title, content, user_no)
                        values (?, ?, ?, ? ,?)`,
    AdminNoticeLastNo: `select last_insert_id() as no from dual`,                    
    AdminNoticeFile: `insert into file (file_name, file_path, file_ext, table_no, division, seqs)
                      values(?, ?, ?, ?, 'E1', ?)`              
}