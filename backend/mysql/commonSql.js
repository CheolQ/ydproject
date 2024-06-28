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
        CASE WHEN ch.level = 1 THEN ch.category_name ELSE '' END AS parent,
        CASE WHEN ch.level = 1 THEN ch.category_code ELSE '' END AS parentCode,
        CASE WHEN ch.level > 1 THEN ch.category_name ELSE '' END AS child,
        CASE WHEN ch.level > 1 THEN ch.category_code ELSE '' END AS childCode
      FROM
        CategoryHierarchy ch
      ORDER BY
        (case when parent = '과자,스낵,쿠키' then 0 else 1 end),ch.root_code, ch.category_code DESC`,
};
