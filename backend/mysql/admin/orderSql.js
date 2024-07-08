module.exports = {
    AdminOrderDate: `select DATE_FORMAT(MAX(order_date), '%Y.%m.%d') as date
                     FROM orders`,
    AdminOrderCount: `select count(*) as cnt
                      from (select od.order_no, od.order_status, od.order_date, group_concat(
		                                                                                    (select prod_name
					                                                                        from prod
                                                                                            where prod_no = ods.prod_no)) as prod_name
                            from orders od left join order_detail ods
					                            on od.order_no = ods.order_no
                            Group by od.order_no
                            having prod_name like ?) as orders
                      where (DATE_FORMAT(orders.order_date, '%Y-%m-%d') >= ? and DATE_FORMAT(orders.order_date, '%Y-%m-%d') <= ?)                    
                      and orders.order_status = ? or orders.order_status = ?`, 
    AdminOrderList: `select DISTINCT od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status, od.pay_no,
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
                    where (DATE_FORMAT(order_date, '%Y-%m-%d') >= ? and DATE_FORMAT(order_date, '%Y-%m-%d') <= ?)                    
                    and od.order_status = ? or od.order_status = ?                                      
                    group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status
                    HAVING prod_name like ?
                    order by od.order_no desc
                    limit ?, ? `,
    AdminOrderPrepare: `update orders set
                        order_status = 'D4'
                        where order_no = ?`, 

    AdminOrderInfo1: `select u.name, u.tel, u.email,
                             od.name as name1, od.tel as tel1, concat('(',od.postcode,')',' ',od.addr,' ',od.detail_addr) as address,
                             od.order_status, deli_code, deli_date
                      from user u left join orders od
                                         on u.user_no = od.user_no 
                      where od.order_no = ?`,
    AdminOrderInfo2: `select pd.main_img, pd.prod_name, pd.prod_price, ord.cnt
                      from order_detail ord join prod pd
                                              on ord.prod_no = pd.prod_no
                      where ord.order_no = ?`,

    AdminOrderInfoUpdate: `update orders
                           set order_status = ?,
                           deli_code = ?,
                           deli_date = now()
                           where order_no = ?`,


    AdminOrderDelCount: `select count(*) as cnt
                        from orders
                        where order_status = 'D5' or order_status = 'D6'`,
    AdminOrderDelList: `select DISTINCT od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status,
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
                        where od.order_status = 'D5' or od.order_status = 'D6'                                      
                        group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status
                        limit ?, ? `,
    AdminOrderDel: `update orders set
                    order_status = 'D6',
                    deli_date = now()
                    where order_no = ?`,


    AdminOrderCancelCount: `select count(*) as cnt
                            from orders
                            where order_status = 'D2' or order_status = 'D3'`,
    AdminOrderCancelList: `select DISTINCT od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status,
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
                            where od.order_status = 'D2' or od.order_status = 'D3'                                      
                            group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status
                            limit ?, ? `,
    AdminOrderCancel1: `update orders set
                        order_status = 'D3'
                        where order_no = ?`,
    AdminOrderCancel2: `update order_cancel set
                        cal_up = now()
                        where order_no = ?`,
    AdminOrderCancel3: `select point, use_point, user_no
                        from orders
                        where order_no = ?`,                    
    AdminOrderCancel4: `update user set
                        point = point + ? - ?
                        where user_no = ?`,                    
    AdminOrderCancelDate: `select  cal_up, cal_at
                           from order_cancel
                           where order_no = ?;`                                                       
                           

}