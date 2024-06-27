module.exports = {
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
                    CASE WHEN ch.level = 1 THEN 'parent' ELSE '' END AS CATE_1,
                    CASE WHEN ch.level = 1 THEN ch.root_name ELSE '' END AS CATE_2,
                    CASE WHEN ch.level > 1 THEN 'child' ELSE '' END AS CATE_3,
                    CASE WHEN ch.level > 1 THEN ch.category_name ELSE '' END AS CATE_4,
                    ch.category_code
                FROM
                    CategoryHierarchy ch
                ORDER BY
                    ch.root_code, ch.category_code DESC`,
};
