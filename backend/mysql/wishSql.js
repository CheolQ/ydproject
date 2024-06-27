module.exports = {
    wishList : `select likes.like_no, prod.prod_no, prod.prod_name, prod.prod_price, prod.main_img
                from likes join prod 
                on likes.prod_no = prod.prod_no where likes.user_no = ?`,
}; 