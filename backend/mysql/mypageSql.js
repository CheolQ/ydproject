module.exports = {
    userInfo: `select 
                    name, 
                    user_id, 
                    email, 
                    addr, 
                    detail_addr,
                    tel, 
                    point, 
                    (
                        select sum(pay_price) 
                        from orders
                        where user_no = (
							select user_no
                            from user
                            where user_id = ?
                        )
                    ) as total_order_price
                from user
                where user_id = ?`,

    userOrderList: `select DISTINCT od.order_no, 
				od.order_date, 
                od.user_no, 
                od.pay_price, 
                od.order_status,
				substring_index(
								group_concat(
												(
													select prod_name
													from prod
													where prod_no = ods.prod_no
												)
					                        ),
                                            ',',1) as prod_name,
								            (
												select DISTINCT count(order_no)
												from order_detail
												where order_no = od.order_no
											) as cnt
                from orders od 
                left join order_detail ods
                on od.order_no = ods.order_no
                where user_no = (
                    select user_no
                    from user
                    where user_id = ?
                )
                group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status 
                limit ? , ?`,

    countUserOrderList: `select count(*) as cnt
                        from orders 
                        where user_no = 
                            (
                                select user_no
                                from user
                                where user_id = ?
                            )`,

    userOrderDetailList: `select order_detail_no, 
                                p.prod_name, 
                                cnt, 
                                p.prod_price, 
                                o.order_date, 
                                p.main_img
                            from order_detail od
                            join prod p
                            on od.prod_no = p.prod_no
                            join orders o
                            on od.order_no = o.order_no
                            where od.order_no = ?`,

    OrderDetailDeliInfo: `select name, 
                                tel, 
                                addr, 
                                postcode, 
                                detail_addr, 
                                order_total_price, 
                                pay_price, 
                                use_point, 
                                point
                            from orders
                            where order_no = ?`,

    applyOrderCancel1: `update orders
                        set order_status = 'D2' 
                        where order_no = ?`,

    applyOrderCancel2: `insert into order_cancel(order_no)
                        values(?)`,

    mypageQnaList: `select q.board_no,
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

    countUserQna: `select count(*) as cnt 
                    from qna
                    where user_no = (
                        select user_no
                        from user
                        where user_id = ?
                    )`,
    userQnAInfo: `select p.prod_name,
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
                    
    mypageUpdateQnA: `update qna 
                        set ? 
                        where board_no = ?`,
    mypageDeleteQnA: `delete 
                        from qna 
                        where board_no = ?`,

    mypageReviewList: `select 
                            p.main_img,
                            p.prod_name,
                            p.prod_price,
                            o.order_date,
                            count(r.review_no) as cnt,
                            group_concat(r.review_no) as review_no
                        from 
                            prod p
                        join 
                            order_detail od on p.prod_no = od.prod_no
                        join 
                            orders o on od.order_no = o.order_no
                        left join 
                            review r on p.prod_no = r.prod_no and od.order_detail_no = r.order_detail_no
                        where 
                            o.user_no = ?
                        group by 
                            p.main_img, p.prod_name, p.prod_price, o.order_date
                        order by 
                            o.order_date desc
                        limit ? , ?`,

    mypageReviewCount: `select count(*) as cnt from review where user_id = ?`,

    mypageReviewInfo: `select p.prod_name,
                                r.prod_no,
                                p.prod_price, 
                                p.main_img,
                                r.review_no,
                                r.review_title,  
                                r.review_content, 
                                r.create_date
                        from review r
                        join prod p
                        on r.prod_no = p.prod_no
                        where r.review_no = ?`,
};
