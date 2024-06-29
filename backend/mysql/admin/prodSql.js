module.exports = {
    AdminProdCount: `select count(*) as cnt
                    from prod`,
    AdminProdList: `select prod_no, 
	                       (select category_name from category where category_code = prod.category_code) as category_code,
                            prod_name,
                            prod_price
                    from prod
                    order by prod_no
                    limit ? , ?`,
    AdminProdInfo: `select prod_no, 
	                       (select category_name from category where category_code = prod.category_code) as category_code,
                           prod_name, 
                           prod_price, 
                           main_img,
                           detail_img,
                           maker,
                           origin,
                           exp_date
                    from prod`,
    AdminProdCategory1:`select category_code, category_name, seqs
                        from category
                        where pre_category is null
                        order by seqs`,
    AdminProdCategory2:`select category_code, category_name, seqs
                        from category
                        where pre_category = ?
                        order by seqs`,
    AdminProdInsert: `insert into prod set ?`                                                         

}