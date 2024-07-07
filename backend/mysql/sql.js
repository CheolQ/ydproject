//유저
// 메인페이지
const mainSql = require('./main/mainSql');
const headerSql = require('./main/headerSql');

// 장바구니, 위시리스트, 주문
const cartsql = require('./cartSql');
const wishsql = require('./wishSql');
const ordersql = require('./orderSql');

// 상품
const prodSql = require('./prodSql');

// 공지사항
const noticeSql = require('./noticeSql');

// 마이페이지
const mypageUserSql = require('./mypage/userSql');
const mypageOrderSql = require('./mypage/orderSql');
const mypageQnASql = require('./mypage/qnaSql');
const mypageReviewSql = require('./mypage/reviewSql');

//로그인 회원가입
const userSql = require('./loginSql');

//관리자
const adminNotice = require('./admin/noticeSql');
const adminQna = require('./admin/qnaSql');
const adminOrder = require('./admin/orderSql');
const adminMember = require('./admin/memberSql');
const adminProd = require('./admin/prodSql');
const adminMain = require('./admin/mainSql');

module.exports = {
    // 메인페이지
    ...mainSql,
    ...headerSql,

    ...cartsql,
    ...wishsql,
    ...ordersql,

    ...prodSql,
    ...noticeSql,

    // 마이페이지
    ...mypageUserSql,
    ...mypageOrderSql,
    ...mypageQnASql,
    ...mypageReviewSql,

    //로그인,회원가입
    ...userSql,

    //관리자
    ...adminQna,
    ...adminOrder,
    ...adminMember,
    ...adminProd,
    ...adminNotice,
    ...adminMain
};
