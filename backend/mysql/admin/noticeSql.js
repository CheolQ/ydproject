module.exports = {
    AdminNoticCount: `select count(*) as cnt 
                      from notice`,
    AdminNoticeList: `select notice_no, user_id, title, create_date
                      from notice
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

    AdminNoticeInsert: `insert into notice (user_id, title, content, user_no)
                        values (?, ?, ? ,?)`,
    AdminNoticeLastNo: `select last_insert_id() as no from dual`,                    
    AdminNoticeFile: `insert into file (file_name, file_path, file_ext, table_no, division, seqs)
                      values(?, ?, ?, ?, 'E1', ?)`              
}