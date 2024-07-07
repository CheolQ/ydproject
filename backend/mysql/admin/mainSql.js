module.exports = {
    adminSales : `  select Date(order_date) as date, 
                           sum(order_total_price) as price 
                    from orders
                    where order_status = 'D6'
                    and order_date between DATE_ADD(NOW(), INTERVAL-1 WEEK) and now()
                    group by Date(order_date)`,
    adminCategorySales : `  select pd.category_code, category_name, count(*) as cnt
                            from order_detail od left join prod pd
                                                        on od.prod_no = pd.prod_no
                                                    join category cg
                                                        on cg.category_code =  pd.category_code
                                                    join orders ods
                                                        on od.order_no = ods.order_no
                            where order_status = 'D6'                            
                            group by pd.category_code, category_name
                            order by count(*) desc
                            limit 5`,
    adminWeekSales : `select sum(order_total_price) as price
                      from orders                   
                      where order_status = 'D6'
                      and order_date between DATE_ADD(NOW(), INTERVAL-1 WEEK) and now()`,                        
    adminDaySales :`select sum(order_total_price) as price
                    from orders                   
                    where order_status = 'D6'
                    and Date(order_date) = Date(now())`,
    adminQnaReply :`select board_no, (select count(*) 
                                      from reply 
                                      where board_no = qna.board_no) as cnt
                    from qna
                    having cnt = 0`,
    adminOrderComplete : `select count(*) as orderCnt 
                          from orders
                          where order_status = 'D1'`,                                                        
}