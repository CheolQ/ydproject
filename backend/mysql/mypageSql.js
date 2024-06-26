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
                where user_id = ?`
}