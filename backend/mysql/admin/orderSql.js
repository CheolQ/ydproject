module.exports = {
    AdminOrderList: `select DISTINCT od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status,
		             substring_index(group_concat(
		                                    (select prod_name
									         from prod
                                             where prod_no = ods.prod_no)
					                        ),',',1) as prod_name,
								            (select DISTINCT count(order_no)
									        from order_detail
									        where order_no = od.order_no) as cnt
                    from orders od left join order_detail ods
					                    on od.order_no = ods.order_no
                    where order_status = ?                    
                    group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status `,
    AdminOrderInfo: `select order_no, order_date, use_point, order_total_price, point, order_status, deli_code
                     from orders
                     where order_no = ?`,
    AdminOrderListInfo: `select od.order_detail_no, pd.main_img, pd.prod_name, pd.prod_price, od.cnt
                         from order_detail od left join prod pd
                                                     on od.prod_no = pd.prod_no
                         where od.order_no = ?`,                             
}