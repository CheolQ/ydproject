module.exports = {
    orderInsert : `insert into orders 
                    set name = ?, order_total_price = ?, order_status = ?, tel = ?, addr = ?, postcode = ?, detail_addr = ?, user_no = ?, point = ?, pay_no = ?`,

    getPrice : `select prod_price 
                from prod 
                where prod_no = ?`,
                
    orderDtInsert : `insert into order_detail 
                        set cnt = ?, order_no = ?, price = ?, prod_no = ?`,
    //getProdNo : `select prod_no from order_detail where order_detail_no = ?`
}