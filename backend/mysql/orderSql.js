module.exports = {
    orderInsert : `insert into orders 
                    set name = ?, 
                        pay_price = ?, 
                        order_status = ?, 
                        tel = ?, 
                        addr = ?, 
                        postcode = ?, 
                        detail_addr = ?, 
                        user_no = ?, 
                        point = ?, 
                        pay_no = ?,
                        order_total_price = ?`,

    getPrice : `select prod_price 
                from prod 
                where prod_no = ?`,
                
    orderDtInsert : `insert into order_detail 
                        set cnt = ?, 
                            order_no = ?, 
                            price = ?, 
                            prod_no = ?`,

    getUsers : `select name, tel, email, addr, postcode, detail_addr, point
                from user
                where user_no = ?`,

    //getProdNo : `select prod_no from order_detail where order_detail_no = ?`
}