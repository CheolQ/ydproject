//유저

const cartsql = require('./cartSql');
const wishsql = require('./wishSql');

const prodSql = require('./prodSql')
const noticeSql = require('./noticeSql')
const mypageSql = require('./mypageSql')


//관리자

const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
module.exports = {

    ...cartsql,
    ...wishsql,


    
    ...adminOrder,
    ...adminMember,

    ...prodSql,
    ...noticeSql,
    ...mypageSql


}