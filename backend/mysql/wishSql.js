module.exports = {
    wishList : `select likes.like_no, prod.prod_no, prod.prod_name, prod.prod_price 
                from likes inner join prod 
                on likes.prod_no = prod.prod_no`,
}; 