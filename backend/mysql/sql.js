//카테고리
const categorysql = require('./commonSql');
//유저
const cartsql = require('./cartSql');
const wishsql = require('./wishSql');
const ordersql = require('./orderSql');


const prodSql = require('./prodSql');
const noticeSql = require('./noticeSql');
const mypageSql = require('./mypageSql');

//로그인 회원가입
const userSql = require('./loginSql');

//관리자

const adminQna = require('./admin/qnaSql')
const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
const adminProd = require('./admin/prodSql')

module.exports = {
    ...categorysql,

    ...cartsql,
    ...wishsql,
    ...ordersql,

    ...prodSql,
    ...noticeSql,
    ...mypageSql,

    //로그인,회원가입
    ...userSql,

    //관리자
    ...adminQna,
    ...adminOrder,
    ...adminMember,
    ...adminProd,


    ...prodSql,
    ...noticeSql,
    ...mypageSql


};
