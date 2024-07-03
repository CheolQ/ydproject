module.exports = {
    cartList : `select  prod.prod_no, cart.cart_no, prod.prod_name, prod.main_img, prod.prod_price, cart.cnt
                from    prod join cart 
                on      prod.prod_no = cart.prod_no
                where   cart.user_no = ?
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
                        set cnt = ?,
                            prod_no = ?,
                            user_no = ?`,

    cartSearch : `select *
                    from cart
                    where prod_no = ? 
                    and user_no = ?`,

    cartUpdate : `update cart 
                    set cnt = ?
                    where user_no = ? 
                    and prod_no = ?`,

    wishToCartInsert : `insert into cart 
                            set prod_no = ?,
                                price = ?,
                                user_no = ?,
                                cnt = 1`,
        
    // prodInfoToCartInsert : `insert into cart
    //                         set cnt = ?,
    //                             prod_no = ?,
    //                             user_no = ?`,
}; 