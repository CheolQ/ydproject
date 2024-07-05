module.exports = {
    // home 베스트 셀러 리스트
    bestProductList: `select sc.cnt, p.*, coalesce(round(rating), 0) rating
                      from prod p
                      join (
                          select sum(cnt) cnt, prod_no 
                          from order_detail
                          group by prod_no, cnt
                      ) sc

                      on p.prod_no = sc.prod_no
                      left join (
                          select prod_no, avg(rating) rating 
                          from review
                          group by prod_no
                              ) r
                      on p.prod_no = r.prod_no
                      order by cnt desc
                      limit 0,6`,

    mainCategoryProductList: `WITH RECURSIVE CategoryHierarchy AS (
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

    //카테고리 리스트
    categoryList: `WITH RECURSIVE CategoryHierarchy AS (
        SELECT
          category_code,
          category_name,
          pre_category,
          category_code AS root_code,
          category_name AS root_name,
          1 AS level
        FROM
          category
        WHERE
          pre_category IS NULL
        UNION ALL
        SELECT
          c.category_code,
          c.category_name,
          c.pre_category,
          ch.root_code,
          ch.root_name,
          ch.level + 1
        FROM
          category c
        INNER JOIN
          CategoryHierarchy ch ON c.pre_category = ch.category_code
      )
      SELECT
        CASE WHEN ch.level = 1 THEN ch.category_name ELSE '' END AS parent,
        CASE WHEN ch.level = 1 THEN ch.category_code ELSE '' END AS parentCode,
        CASE WHEN ch.level > 1 THEN ch.category_name ELSE '' END AS child,
        CASE WHEN ch.level > 1 THEN ch.category_code ELSE '' END AS childCode
      FROM
        CategoryHierarchy ch
      ORDER BY
        (case when parent = '과자,스낵,쿠키' then 0 else 1 end),ch.root_code, ch.category_code DESC`,
};
