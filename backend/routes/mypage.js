const express = require('express');
const router = express.Router();
const query = require('../mysql/index');

// 유저 정보 조회
// router.get('/userinfo/:id', async (req, res) => {
router.get('/userinfo', async (req, res) => {
    let result = await query('userInfo', [req.session.user_id, req.session.user_id]);
    res.send(result);
});

// 주문 내역 조회
router.get('/orderinfo', async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if (!page) {
        page = 1;
    }
    if (!pageUnit) {
        pageUnit = 10;
    }
    let offset = (page - 1) * pageUnit;

    let result = await query('userOrderList', [req.session.user_id, offset, pageUnit]);
    let count = await query('countUserOrderList', [req.session.user_id]);
    res.send({ result, count });
});

// 주문상세 조회
router.get('/orderdetailinfo/:no', async (req, res) => {
    let result = await query('userOrderDetailList', [req.params.no]);
    res.send(result);
});

// 주문상세 배송정보 조회
router.get('/orderdetaildelinfo/:no', async (req, res) => {
    let result = await query('OrderDetailDeliInfo', [req.params.no]);
    res.send(result);
});

// 주문취소1
router.patch('/ordercancel/:no', async (req, res) => {
    let result = await query('applyOrderCancel1', [req.params.no]);
    res.send(result);
});
// 주문취소2
router.post('/ordercancel/:no', async (req, res) => {
    let result = await query('applyOrderCancel2', [req.params.no]);
    res.send(result);
});

// 마이페이지 qna 리스트 조회
router.get('/qnalist', async (req, res) => {
    console.log(req.params.id);
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);

    if (!page) {
        page = 1;
    }
    if (!pageUnit) {
        pageUnit = 10;
    }
    let offset = (page - 1) * pageUnit;
    let result = await query('mypageQnaList', [req.session.user_id, offset, pageUnit]);
    console.log(result);
    let count = await query('countUserOrderList', [req.session.user_id]);
    res.send({ result, count });
});

// // 마이페이지 qna 단건조회
router.get('/qnainfo/:no', async (req, res) => {
    let result = await query('userQnAInfo', req.params.no);
    console.log(result);
    res.send(result);
});

// qna 수정
router.patch('/updateqna/:no', async (req, res) => {
    console.log('수정확인')
    console.log(req.body);
    let result = await query('mypageUpdateQnA', [req.body, req.params.no]);
    res.send(result);
});

// qna 삭제
router.delete('/deleteqna/:no', async (req, res) => {
    console.log('삭제확인')
    let result = await query('mypageDeleteQnA', [req.params.no]);
    res.send(result);
});

// // 마이페이지 후기리스트
router.get('/reviewList', async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    console.log('page',page);
    console.log('page',pageUnit);

    if (!page) {
        page = 1;
    }
    if (!pageUnit) {
        pageUnit = 10;
    }
    let offset = (page - 1) * pageUnit;
    let result = await query('mypageReviewList', [req.session.user_no, offset, pageUnit]);
    console.log(result);
    let count = await query('mypageReviewCount', [req.session.user_id]);
    res.send({ result, count });
});

router.get('/reviewinfo/:no', async (req, res) => {
    // let result = await query('mypageReviewInfo', req.params.no);
    let result = await query('mypageReviewInfo', [req.params.no]);
    console.log(result);
    res.send(result);
});


module.exports = router;
