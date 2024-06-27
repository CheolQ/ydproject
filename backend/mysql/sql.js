//유저

const cartsql = require('./cartSql');
const wishsql = require('./wishSql');

const prodSql = require('./prodSql')
const noticeSql = require('./noticeSql')
const mypageSql = require('./mypageSql')

//로그인 회원가입
const userSql = require('./loginSql')

//관리자

const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
const adminProd = require('./admin/prodSql')
module.exports = {

    ...cartsql,
    ...wishsql,

    ...prodSql,
    ...noticeSql,
    ...mypageSql,

    //로그인,회원가입
    ...userSql,



    //관리자
    ...adminOrder,
    ...adminMember,

}