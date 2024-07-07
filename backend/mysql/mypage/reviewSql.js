module.exports = {
    mypageReviewList: `
                        SELECT 
                            p.main_img,
                            p.prod_name,
                            p.prod_price,
                            o.order_date,
                            o.order_no,
                            od.order_detail_no,
                            p.prod_no,
                            u.user_id,
                            o.order_status,
                            COUNT(r.review_no) AS cnt,
                            GROUP_CONCAT(r.review_no) AS review_no
                        FROM 
                            prod p
                        JOIN 
                            order_detail od ON p.prod_no = od.prod_no
                        JOIN 
                            orders o ON od.order_no = o.order_no
                        LEFT JOIN 
                            review r ON p.prod_no = r.prod_no AND od.order_detail_no = r.order_detail_no
                        join
                            user u on u.user_no = o.user_no
                        WHERE 
                            o.user_no = ? and order_status = 'D6'
                        GROUP BY 
                            p.main_img, p.prod_name, p.prod_price, o.order_date, u.user_id, o.order_no, od.order_detail_no, p.prod_no
                        ORDER BY 
                            cnt, o.order_date DESC
                        limit ? , ?`,

    mypageReviewCount: `
                        select count(*) as cnt 
                        from review 
                        where user_id = ?`,

    mypageReviewInfo: `
                        select p.prod_name,
                                r.prod_no,
                                p.prod_price, 
                                p.main_img,
                                r.review_no,
                                r.review_title,  
                                r.review_content, 
                                r.create_date,
                                r.rating
                        from review r
                        join prod p
                        on r.prod_no = p.prod_no
                        where r.review_no = ?`,

    mypageGetImg: `
                    select file_name 
                    from file 
                    where division = 'E2' and table_no = ?`,

    mypageReviewInsert: `
                            insert into review 
                            set ?`,

    mypageselectReviewNo: `
                            select review_no 
                            from review 
                            where order_detail_no = ?`,

    mypageReviewFileUpload: `
                            INSERT INTO file (
                                                file_name, 
                                                file_path, 
                                                file_ext, 
                                                table_no, 
                                                division, 
                                                seqs
                                                ) 
                            VALUES ?`,

    mypageReviewDelete: `
                            delete 
                            from review 
                            where review_no = ?`,

    mypageReviewFileDelete: `
                            delete 
                            from file 
                            where table_no = ? and division = 'E2'`,

    mypageGetReviewInfo: `
                            select review_title, 
                                    review_content, 
                                    rating from review 
                            where review_no = ?`,

    mypageUpdateReview: `
                            update review 
                            set review_title = ?, 
                                review_content = ?, 
                                rating = ? 
                            where review_no = ?`,

    mypageReviewDeleteFile: `
                            delete 
                            from file 
                            where table_no = ? and division = 'E2'`,
};
