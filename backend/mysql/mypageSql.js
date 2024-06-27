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
                    where user_id = 'user15'
                )
                group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status`,
    userOrderDetailList: `select order_detail_no, p.prod_name, cnt, p.prod_price, o.order_date, p.main_img
                            from order_detail od
                            join prod p
                            on od.prod_no = p.prod_no
                            join orders o
                            on od.order_no = o.order_no
                            where od.order_no = ?`,

    OrderDetailDeliInfo: `select name, tel, addr, postcode, detail_addr, order_total_price, pay_price, use_point, point
                            from orders
                            where order_no = ?`
                            
};
