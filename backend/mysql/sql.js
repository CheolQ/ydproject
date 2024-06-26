//유저
const cartsql = require('./cartSql');
const wishsql = require('./wishSql');
//관리자

module.exports = {
    ...cartsql,
    ...wishsql,
}