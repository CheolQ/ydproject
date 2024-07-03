module.exports = {
        prodList: `SELECT prod_no, prod_name, category_code, prod_price, prod_explain, main_img, detail_img, maker, origin, exp_date
                    FROM prod
                    where prod_name like ? 
                    limit ?,?`,
                //     order by ??`,
        prodCount : `select count(*) cnt 
                     from prod
                     where prod_name like ?`,

        prodInfo: `SELECT prod_no, prod_name, category_code, prod_price, prod_explain, main_img, detail_img, maker, origin, exp_date
                   FROM prod
                   WHERE prod_no = ?`,

        reviewList: `SELECT review_no, user_id, review_content, create_date, rating, review_title, prod_no, order_detail_no, order_no
                     FROM review 
                     where prod_no = ?`,

        qnaList: `SELECT board_no, user_id, title, content, create_date, board_pw, update_date, user_no, prod_no   
                  FROM qna 
                  where prod_no = ?`,

        qnaInfo: `SELECT board_no, user_id, title, content, create_date, board_pw, update_date, user_no, prod_no   
                 FROM qna 
                 where prod_no = ? and board_no = ?`,

        qnaInsert: `insert into qna set ?`,

        qnaUpdate: 'UPDATE qna SET ? WHERE board_no = ?',

        selectuserno: `select user_no from user where user_id = ?`,

        smallCategory: `SELECT prod_no, prod_name, p.category_code, prod_price, main_img, c.category_name as codename
                        FROM prod p
                                left join category c
                                on p.category_code = c.category_code
                        WHERE p.category_code = ? and prod_name like ?
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
                        limit ?,?`,
                
        bigCateCnt : ` SELECT count(*) cnt
                        FROM prod p
                        left join category c
                        on p.category_code = c.category_code
                        where pre_category = ? and prod_name like ?`,
        


};
