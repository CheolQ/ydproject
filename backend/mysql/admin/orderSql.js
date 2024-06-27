module.exports = {
    AdminOrderCount: `select count(*) as cnt
                      from orders`,
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
                    group by od.order_no, od.order_date, od.user_no, od.pay_price, od.order_status
                    limit ?, ? `,
    AdminOrderInfo1: `select u.name, u.tel, u.email,
                             od.name as name1, od.tel as tel1, concat('(',od.postcode,')',' ',od.addr,' ',od.detail_addr) as address,
                             od.order_status, deli_code
                      from user u left join orders od
                                         on u.user_no = od.user_no 
                      where od.order_no = ?`,
    AdminOrderInfo2: `select pd.main_img, pd.prod_name, pd.prod_price, ord.cnt
                      from order_detail ord join prod pd
                                              on ord.prod_no = pd.prod_no
                      where ord.order_no = ?;`,                             
}