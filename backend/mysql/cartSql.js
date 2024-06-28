module.exports = {
    cartList : `select  prod.prod_no, cart.cart_no, prod.prod_name, prod.main_img, prod.prod_price, cart.cnt
                from    prod join cart 
                on      prod.prod_no = cart.prod_no
                where   cart.user_no = 1
                order by cart_no desc`,
    cartDelete : `delete 
                    from cart 
                    where cart_no = ?`,
    cartAllDelete : `delete 
                        from cart 
                        where user_no = ?`,
    cartCntUpdate : `update cart 
                        set cnt = ?, price = ?
                        where cart_no = ?`,
    cartInsert : `insert into cart 
                        set prod_no = ?,
                            cnt = 1,
                            user_no = 1`,
    cartSearch : `select *
                    from cart
                    where prod_no = ? 
                    and user_no = 1`,
    cartUpdate : `update cart set 
	                            cnt = cnt + 1
                    where user_no = 1 and prod_no = ?`
    
}; 