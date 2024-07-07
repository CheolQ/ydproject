module.exports = {
    userOrderList: `
                    select DISTINCT od.order_no, 
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
                            where (DATE_FORMAT(order_date, '%Y-%m-%d') >= ? and DATE_FORMAT(order_date, '%Y-%m-%d') <= ?) 
                            and user_no = (
                                        select user_no
                                        from user
                                        where user_id = ?
                                        )
                            group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status 
                            order by order_no desc
                            limit ? , ?`,

    countUserOrderList: `
                        select count(*) as cnt
                        from orders 
                        where (
                                DATE_FORMAT(order_date, '%Y-%m-%d') >= ? 
                                and 
                                DATE_FORMAT(order_date, '%Y-%m-%d') <= ?
                                ) 
                        and user_no = 
                            (
                                select user_no
                                from user
                                where user_id = ?
                            )`,

    userOrderDetailList: `
                            select order_detail_no, 
                                p.prod_name, 
                                cnt, 
                                p.prod_price, 
                                o.order_date, 
                                p.main_img,
                                o.deli_code,
                                o.deli_date,
                                o.order_status,
                                p.prod_no
                            from order_detail od
                            join prod p
                            on od.prod_no = p.prod_no
                            join orders o
                            on od.order_no = o.order_no
                            where od.order_no = ?`,

    OrderDetailDeliInfo: `
                            select name, 
                                tel, 
                                addr, 
                                postcode, 
                                detail_addr, 
                                order_total_price, 
                                pay_price, 
                                use_point, 
                                point,
                                deli_code,
                                deli_date,
                                order_status
                            from orders
                            where order_no = ?`,

    applyOrderCancel1: `
                        update orders
                        set order_status = 'D2' 
                        where order_no = ?`,

    applyOrderCancel2: `
                        insert into order_cancel(order_no)
                        values(?)`,
};
