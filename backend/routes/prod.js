const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');
//상품목록
router.get('/', async (req, res) => {
    // let order = req.query.order;
    // console.log('ff',order);
    // let result = await query('prodList',order);
    // let result = await query('prodList');
    // res.send(result);
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let search = '%'+req.query.search+'%'
    console.log('r검색어',search)
    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;

    let list = await query("prodList",[search, offset,pageUnit]);
    let count = await query("prodCount", search)
    count = count[0].cnt;
    res.send({list,count})
});

//카테고리별 상품 조회 - /shop/code/A11
router.get('/code/:code', async (req, res) => {
    let result = await query('prodCategory', req.params.code);
    console.log('카테',result);
    res.send(result);
});

//카테고리별 갯수 조회 
router.get('/cnt', async (req, res) => {
    console.log('dfsdf')
    let result = await query('prodCategoryCnt');
    console.log('카테숫자',result);
    res.send(result);
});

//상품 평점 조회
router.get('/star/:no', async (req, res) => {
    let result = await query('prodRating', req.params.no);
    console.log('평점',result);
    res.send(result);
});

//리뷰조회
router.get('/review/:no', async (req, res) => {
    let result = await query('reviewList', req.params.no);
    // console.log('aaaa'+ result[0].review_no);
    res.send(result);
});

//qna조회
router.get('/qna/:no', async (req, res) => {
    let result = await query('qnaList', req.params.no);
    // console.log('aaaa'+ result[0].review_no);
    res.send(result);
});

//qna 단건조회
router.post('/qna/:no', async (req, res) => {
    console.log(req.body);
    let prodno = req.body.prodno;
    let boardno = req.body.qnano;
    let result = await query('qnaInfo', [prodno, boardno]);
    console.log(result);
    res.send(result);
});

//qna작성
router.post('/qna', async (req, res) => {
    let result = await query('qnaInsert', req.body);
    console.log('등록되니', result);
    res.send(result);
});

//qna수정
router.put("/qna/:no",	async (req ,res )	=> {
	let result = await query("qnauUpdate",	[req.body,	req.params.no]);
	res.send(result);
});

// qna user_no 값 구하기
router.get('/getuserno/:id', async (req, res) => {
    let result = await query('selectuserno', req.params.id);
    console.log(result);
    res.send(result);
});

//상품단건조회 - /shop/A11
router.get('/:no', async (req, res) => {
    let result = await query('prodInfo', req.params.no);
    console.log(result);
    res.send(result);
});

module.exports = router;
