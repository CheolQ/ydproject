const express = require('express');
const router = express.Router();
const query = require('../mysql/index');
const Codes = require('../../config/codes');

// 공통코드
router.get('/codes', (req,res) => {
  res.json(Codes);
})

// 카테고리 리스트 출력
router.get('/categories', async (req, res) => {
    try {
        let result = await query('categoryList');
        const categoryList = [];
    let catMap = null;
    let catList = null;
    let codeList = null;
    let curCateName = null, preCateName = null;

    result.forEach((row) => {
      const p_code = row.parent;
      const p_name = row.parent;
      const c_code = row.child;
      const c_name = row.child;
      const categoryCode = row.parentCode || row.childCode;

      if (p_name !== '') {
        curCateName = p_name;
        if (catMap) {
          catMap.child = catList;
          catMap.childCode = codeList;
          categoryList.push(catMap);
        }
        catMap = {};
        catList = [];
        codeList = [];
        catMap.parent = p_name;
        catMap.parentCode = categoryCode;
      }
      if (c_name !== '') {
        if (!catList) catList = [];
        if (!codeList) codeList = [];
        catList.push(c_name);
        codeList.push(categoryCode);
      }
    });

    // 마지막 데이터 추가
    if (catMap) {
      catMap.child = catList;
      catMap.childCode = codeList;
      categoryList.push(catMap);
    }

    // JSON으로 변환하여 클라이언트에 응답
    console.log(categoryList);
    res.json(categoryList);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
