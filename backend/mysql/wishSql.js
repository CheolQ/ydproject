module.exports = {
    wishList : `select 
                            likes.like_no, 
                            prod.prod_no, 
                            prod.prod_name, 
                            prod.prod_price, 
                            prod.main_img
                from        likes join prod 
                on          likes.prod_no = prod.prod_no 
                where       likes.user_no = ?
                order by    like_no desc limit ?, ?`,

    wishListCount : `select count(*) cnt 
                    from likes 
                    where user_no = ?`,

    wishDelete : `delete 
                    from    likes 
                    where   like_no = ?`,

    wishAllDelete : `delete 
                        from  likes 
                        where user_no = ?`,
                        
    wishInsert : `insert into likes (prod_no, user_no)
                    values (?, ?)`,

    wishSearch : `select *
                    from likes
                    where prod_no = ?
                    and user_no = ?`,
           
}; 