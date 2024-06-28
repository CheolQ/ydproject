module.exports = {
    cartList : `select * 
                from prod inner join cart 
                on prod.prod_no = cart.prod_no
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
    
}; 