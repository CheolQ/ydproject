const express = require('express');
const router = express.Router();
const query = require('../mysql/index');

//장바구니 리스트
router.get('/', (req, res) => {
    //console.log('확인')
    query('cartList', req.session.user_no)
    .then((result) => res.send(result));
});
//장바구니 삭제
router.delete('/:no', (req, res) => {
    query('cartDelete', req.params.no)
    //console.log(req.params, '확인')
    .then((result) => res.send(result));
});
//전체 장바구니 삭제
router.delete('/', (req, res) => {
    query('cartAllDelete', req.session.user_no)
    .then((result) => res.send(result));
});
//장바구니 수량 변경
router.put('/updateCnt/', (req, res) => {
    let newPrice = req.query.price * req.query.cnt;
    query('cartCntUpdate', [req.query.cnt, newPrice, req.query.no])
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//장바구니 등록(메인/상세에서 add to cart)
router.post('/insertCart/:no', (req, res) => {
    // query("cartInsert", req.params.no)
    // .then(result => res.send(result))
    // .catch(err => console.log(err))
    let cnt = 0;
    if (isNaN(Number(req.body.cnt))) { //메인에서 상품 수량은 undefined인데 그걸 Number타입으로 바꿨을때 NaN인지? 그럼 cnt을 1로
        cnt = 1;
    } else {
        cnt = Number(req.body.cnt); //상세에서의 변경될수있는 수량값에 따라 cnt를 넣어서줌
    }
    query('cartSearch', [req.params.no, req.session.user_no])
    .then((result) => {
        if (result.length != 0) {
            cnt = Number(result[0].cnt) + cnt;
            query('cartUpdate', [cnt, req.session.user_no, req.params.no]);//메인일떄와 상세일때의 수량값에 따라 update됨
            //res.send('update')
        } else {
            query('cartInsert', [cnt, req.params.no, req.session.user_no]);
            //res.send('insert')
        }
    });
});
//관심상품에서 장바구니로 insert(담기)
router.post('/', async (req, res) => {
    let result = req.body;
    let userNo = req.session.user_no;
    let cartList = await query('cartList', userNo);
    //console.log(cartList, '장바구니');
    let count = 0;
    result.forEach(function (a) {
        //장바구니에 넣어어야할 개수만큼 반복
        let check = true; //중복체크위한 변수선언
        a.user_no = userNo;
        cartList.forEach(function (b) {
            // 내 장바구니에 있는 상품만큼 반복
            if (a.prod_no == b.prod_no) {
                //관심상품에 있는 상품(a)이랑 장바구니에 있는 상품(b)이 같을때
                check = false; //겹치는게 있는 경우에 false로 한다.
            }
        }); //겹치는게 있는지 체크를 장바구니에 있는 상품 개수만큼 for문을 돌고
        if (check) {
            //겹치는게 없는 경우 (check가 true일때) wish에서 cart로 insert되는것
            query('wishToCartInsert', [a.prod_no, a.price, a.user_no]);
            count++;
        }
    });
    res.send({
        count: count,
    }); //몇개가 insert되었는지
});

module.exports = router;
