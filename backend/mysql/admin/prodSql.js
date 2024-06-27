module.exports = {
    AdminProdList: `select prod_no, 
	                       (select category_name from category where category_code = prod.category_code) as category_code,
                           prod_name,
                           prod_price
                    from prod
                    order by prod_no`,
    AdminProdInfo: `select prod_no, 
	                       (select category_name from category where category_code = prod.category_code) as category_code,
                           prod_name, 
                           prod_price, 
                           main_img,
                           detail_img,
                           maker,
                           origin,
                           exp_date
                    from prod
                    order by prod_no`
}