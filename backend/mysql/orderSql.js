module.exports = {
    orderInsert : `insert into orders 
                    set name = ?, order_total_price = ?, order_status = ?, tel = ?, addr = ?, postcode = ?, detail_addr = ?, user_no = ?, point = ?, pay_no = ?`,
}