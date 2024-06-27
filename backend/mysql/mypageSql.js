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

    userOrderList1: `
        select order_no 
        from orders 
        where user_no = (
            select user_no
            from user
            where user_id = ?
        )
    `,
    userOrderList2: `select order_no, 
                    order_date, 
                    pay_price, 
                    order_status, 
                    (
                        select prod_name 
                        from prod
                        where prod_no = (
                                        select prod_no 
                                        from order_detail
                                        where order_no = ? limit 1
                                        )
                    ) as first_prod_name,
                    (
                        select count(*) - 1 
                        from order_detail
                        where order_no = ?
                    ) as order_cnt
            from orders
            where user_no = (
                                select user_no
                                from user
                                where user_id = ?
                            )`,
};
