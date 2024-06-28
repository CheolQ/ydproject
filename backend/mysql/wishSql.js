module.exports = {
    wishList : `select 
                            likes.like_no, 
                            prod.prod_no, 
                            prod.prod_name, 
                            prod.prod_price, 
                            prod.main_img
                from        likes join prod 
                on          likes.prod_no = prod.prod_no 
                where       likes.user_no = 1
                order by    like_no desc limit ?, ?`,

    wishListCount : `select count(*) cnt 
                        from likes`,

    wishDelete : `delete 
                    from    likes 
                    where   like_no = ?`,

    wishAllDelete : `delete 
                        from  likes 
                        where user_no = ?`,
    wishInsert : `insert into likes (prod_no, user_no)
                    values (?, 1)`,
    wishToCartInsert : `insert into cart 
                            set prod_no = ?,
                                user_no = 1,
                                cnt = ?,
                                price = ?`            
                
}; 