const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');
//상품목록
router.get('/', async (req, res) => {
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let search = '%'+req.query.search+'%'
    let sort = req.query.sort;
    if(req.query.search == undefined || req.query.search == '') {
        search = '%%';
    }
    if(req.query.sort == undefined || req.query.sort == '') {
        sort = 1;
    }
    console.log('검색어',search)
    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;
  
    //신상품 1, 베스트 2, 가격 3 
    console.log('asdfsadfsdf',sort);
    if( sort == 1 ){
        sort = 'prod_no desc'
    } else if ( sort == 2 ) {
        sort = 'prod_name'
    } else if ( sort == 3 ) {
        sort = 'prod_price desc'
    } else if ( sort == 4 ) {
        sort = 'prod_price'
    }
    list = await query("prodList",[search, sort, offset,pageUnit]);
    count = await query("prodCount", search)
    
    count = count[0].cnt;
    res.send({list,count})
});

//소카테고리별 상품 조회 - /shop/code/A11
router.get('/code/:code', async (req, res) => {
    // let result = await query('prodCategory', req.params.code);
    // console.log('카테',result);
    // res.send(result);
    console.log('req.params.code',req.params.code)
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let search = '%'+req.query.search+'%'
    let sort = req.query.sort;
    if(req.query.search == undefined || req.query.search == '') {
        search = '%%';
    }
    if(req.query.sort == undefined || req.query.sort == '') {
        sort = 1;
    }
    
    console.log('r검색어',search)
    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;

    console.log('asdfsadfsdf',sort);
    if( sort == 1 ){
        sort = 'prod_no desc'
    } else if ( sort == 2 ) {
        sort = 'prod_name'
    } else if ( sort == 3 ) {
        sort = 'prod_price desc'
    } else if ( sort == 4 ) {
        sort = 'prod_price'
    }

    let list = await query("smallCategory",[req.params.code,search, sort,offset,pageUnit]);
    let count = await query("prodCnt",[req.params.code, search])
    console.log(list,'lkist',count,'sdsa')
    count = count[0].cnt;
    res.send({list,count})
});

//대카테고리별 상품 조회 - /shop/code/A11
router.get('/bigcode/:code', async (req, res) => {
    // let result = await query('bigCategory', req.params.code);
    // console.log('req.params.code',req.params.code);
    // console.log('빅카테',result);
    // res.send(result);
    console.log('req.params.code',req.params.code)
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    let search = '%'+req.query.search+'%'
    let sort = req.query.sort;
    if(req.query.search == undefined || req.query.search == '') {
        search = '%%';
    }
    if(req.query.sort == undefined || req.query.sort == '') {
        sort = 1;
    }
    console.log('b검색어',search)
    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;

    console.log('asdfsadfsdf',sort);
    if( sort == 1 ){
        sort = 'prod_no desc'
    } else if ( sort == 2 ) {
        sort = 'prod_name'
    } else if ( sort == 3 ) {
        sort = 'prod_price desc'
    } else if ( sort == 4 ) {
        sort = 'prod_price'
    }
    
    let list = await query("bigCategory",[req.params.code,search, sort,offset,pageUnit]);
    let count = await query("bigCateCnt",[req.params.code, search])
    console.log(list,'lkist',count,'sdsa')
    count = count[0].cnt;
    res.send({list,count})
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
    // let result = await query('reviewList', req.params.no);
    // res.send(result);

    console.log('req.params.no',req.params.no)
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    
    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;

    let list = await query("reviewList",[req.params.no,offset,pageUnit]);
    let count = await query("reviewCnt",req.params.no)
    console.log(list,'lkist',count,'sdsa')
    count = count[0].cnt;
    res.send({list,count})
});

//review 단건조회
router.get('/reviewinfo/:no', async (req, res) => {
    let result = await query('reviewInfo', req.params.no);
    console.log('상세',result);
    res.send(result);
});

//review 단건이미지조회
router.get('/reviewinfoimg/:no', async (req, res) => {
    let result = await query('reviewImg', req.params.no);
    console.log('상세',result);
    res.send(result);
});

//qna조회
router.get('/qna/:no', async (req, res) => {
    // let result = await query('qnaList', req.params.no);
    // res.send(result);
    console.log('req.params.no',req.params.no)
    let page = Number(req.query.page);
    let pageUnit = Number(req.query.pageUnit);
    
    if(!page){  page = 1;   }
    if(!pageUnit){  pageUnit = 10;  }
    let offset = (page -1)*pageUnit ;

    let list = await query("qnaList",[req.params.no,offset,pageUnit]);
    let count = await query("qnaCnt",req.params.no)
    console.log(list,'lkist',count,'sdsa')
    count = count[0].cnt;
    res.send({list,count})
});

//qna 단건조회
router.get('/qnainfo/:no', async (req, res) => {
    let result = await query('qnaInfo', Number(req.params.no));
    console.log('상세',result);
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
