module.exports = {
    cartList : `select * 
                from prod inner join cart 
                on prod.prod_no = cart.prod_no`,
    cartDelete : `delete 
                    from cart 
                    where cart_no = ?`,
    cartAllDelete : `delete 
                        from cart 
                        where user_no = ?`,
}; 