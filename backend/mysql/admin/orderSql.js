module.exports = {

    orderInfo: `select order_no, order_date, use_point, order_total_price, point, order_status, deli_code
                from orders
                where order_no = 1`,
    orderListInfo: `select od.order_detail_no, pd.main_img, pd.prod_name, pd.prod_price, od.cnt
                    from order_detail od left join prod pd
                                                on od.prod_no = pd.prod_no
                    where od.order_no = 1`,
                                
}