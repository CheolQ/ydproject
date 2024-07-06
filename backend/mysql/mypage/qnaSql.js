module.exports = {
    mypageQnaList: `
                    select q.board_no,
                            title, 
                            create_date, 
                            u.name,
                            r.reply_no
                    from qna q
                    join user u
                    on q.user_no = u.user_no
                    left join reply r
                    on q.board_no = r.board_no
                    where q.user_no = (
                        select user_no
                        from user
                        where user_id = ? limit ? , ?
                    );`,

    countUserQna: `
                    select count(*) as cnt 
                    from qna
                    where user_no = (
                        select user_no
                        from user
                        where user_id = ?
                    )`,

    userQnAInfo: `
                    select p.prod_name,
                        q.prod_no,
                        p.prod_price, 
                        p.main_img,
                        q.board_no,
                        q.title,  
                        q.content, 
                        q.create_date,
                        r.reply_content,
                        r.reply_create_date
                    from qna q
                    join prod p
                    on q.prod_no = p.prod_no
                    left join reply r
                    on q.board_no = r.board_no
                    where q.board_no = ?`,

    mypageUpdateQnA: `
                        update qna 
                        set ? 
                        where board_no = ?`,

    mypageDeleteQnA: `
                        delete 
                        from qna 
                        where board_no = ?`,
};
