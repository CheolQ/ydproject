const express = require('express');
const router = express.Router();
const query = require('../mysql/index');

// 카테고리 리스트 출력
router.get('/categories', async (req, res) => {
    try {
        let result = await query('categoryList');
        const formattedData = [];
        let currentParent = null;
        let currentParentCode = null;
        let childNames = [];
        let childCodes = [];

        result.forEach((row) => {
            // Check if parent value exists and is not empty
            if (row.parent !== undefined && row.parent !== '') {
                // If there's a current parent being tracked, push it to formattedData
                if (currentParent !== null) {
                    formattedData.push({
                        parent: currentParent,
                        parentCode: currentParentCode,
                        child: childNames,
                        childCode: childCodes,
                    });
                }
                // Update currentParent and currentParentCode
                currentParent = row.parent;
                currentParentCode = row.parentCode;
                // Reset childNames and childCodes arrays
                childNames = [];
                childCodes = [];
            }
            // Check if child value exists and is not empty
            if (row.child !== undefined && row.child !== '') {
                childNames.push(row.child);
                childCodes.push(row.childCode);
            }
        });

        // After loop, push the last category group if exists
        if (currentParent !== null) {
            formattedData.push({
                parent: currentParent,
                parentCode: currentParentCode,
                child: childNames,
                childCode: childCodes,
            });
        }

        // JSON으로 변환하여 클라이언트에 응답
        console.log(formattedData);
        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
