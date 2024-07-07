module.exports = {
    // main 베스트 셀러 리스트
    bestProductList: `
                        select sc.cnt, 
                                p.*, 
                                coalesce(round(rating), 0) rating
                        from prod p
                        join (
                            select sum(cnt) cnt, 
                                    prod_no 
                            from order_detail
                            group by prod_no, cnt
                        ) sc

                        on p.prod_no = sc.prod_no
                        left join (
                                    select prod_no, 
                                            avg(rating) rating 
                                    from review
                                    group by prod_no
                                ) r
                        on p.prod_no = r.prod_no
                        order by cnt desc
                        limit 0,6`,
    // 메인 카테고리별 상품 리스트
    mainCategoryProductList: `
                                WITH RECURSIVE CategoryHierarchy AS (
                                    SELECT
                                    category_code
                                    FROM
                                    category
                                    WHERE
                                    category_code like ?
                                    UNION ALL
                                    SELECT
                                    c.category_code
                                    FROM
                                    category c
                                    INNER JOIN
                                    CategoryHierarchy ch ON c.pre_category = ch.category_code
                                )
                                SELECT p.*
                                FROM prod p
                                INNER JOIN CategoryHierarchy ch ON p.category_code = ch.category_code
                                limit 0, 8`,
};
