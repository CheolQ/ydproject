//유저
const prodSql = require('./prodSql')
const noticeSql = require('./noticeSql')
const mypageSql = require('./mypageSql')

//관리자

const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
module.exports = {

    
    ...adminOrder,
    ...adminMember,

    ...prodSql,
    ...noticeSql,
    ...mypageSql

}