module.exports = {
        prodList: `SELECT prod_no, prod_name, category_code, prod_price, main_img, detail_img, maker, origin, exp_date
                    FROM prod
                    where prod_name like ?
                    order by sort
                    limit ?,?`,
                //     order by ??`,
        prodCount : `select count(*) cnt 
                     from prod
                     where prod_name like ?`,

        prodInfo: `SELECT prod_no, prod_name, category_code, prod_price, main_img, detail_img, maker, origin, exp_date
                   FROM prod
                   WHERE prod_no = ?`,

        reviewList: `SELECT review_no, user_id, review_content, create_date, rating, review_title, prod_no, order_detail_no, order_no
                     FROM review 
                     where prod_no = ? limit ? , ?`,

        reviewCnt: `SELECT count(*) cnt
                     FROM review 
                     where prod_no = ?`,

        reviewInfo: `SELECT review_no, user_id, review_content, create_date, rating, review_title, prod_no, order_detail_no, order_no
                     FROM review 
                     where review_no = ?`,
                     
        reviewImg: `SELECT file_name, table_no, division
                        FROm file
                        where table_no = ? and division = 'E2'
                        order by seqs`,

        qnaList: `select q.board_no,
                        title, 
                        create_date, 
                        update_date,
		        q.user_id,
                        r.reply_no, 
                        q.prod_no
                from qna q
	        left join reply r
                on q.board_no = r.board_no
                where prod_no = ? limit ? , ?`,

        qnaCnt: `SELECT count(*) cnt
                FROM qna 
                where prod_no = ?`,

        qnaInfo: `select p.prod_name,
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

        qnaInsert: `insert into qna set ?`,

        qnaUpdate: 'UPDATE qna SET ? WHERE board_no = ?',

        selectuserno: `select user_no from user where user_id = ?`,

        smallCategory: `SELECT prod_no, prod_name, p.category_code, prod_price, main_img, c.category_name as codename
                        FROM prod p
                                left join category c
                                on p.category_code = c.category_code
                        WHERE p.category_code = ? and prod_name like ?
                        order by sort
                        limit ?,?`,

        prodCnt : ` SELECT count(*) cnt
                    FROM prod p
                        left join category c
                                on p.category_code = c.category_code
                    WHERE p.category_code = ? and prod_name like ?`,
        
        prodRating : ` select prod_no, round(avg(rating)) as stars
                        from review
                        where prod_no =?
                        group by prod_no`,
                
        prodCategoryCnt : ` select category_code, category_name, prodcnt
                            from category c1 left join (select c.pre_category, count(p.prod_no) as prodcnt
							from prod as p
							left join category as c
							        on p.category_code = c.category_code
                                                        group by c.pre_category) c2
                                                  on c2.pre_category = c1.category_code
                            where c2.pre_category like 'A_'`,
        bigCategory : `SELECT prod_no, prod_name, p.category_code, prod_price, main_img, c.pre_category
                        FROM prod p
                        left join category c
                        on p.category_code = c.category_code
                        where pre_category = ? and prod_name like ?
                        order by sort
                        limit ?,?`,
                
        bigCateCnt : ` SELECT count(*) cnt
                        FROM prod p
                        left join category c
                        on p.category_code = c.category_code
                        where pre_category = ? and prod_name like ?`,
        


};
