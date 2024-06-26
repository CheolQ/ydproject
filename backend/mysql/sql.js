//유저
const prodsql = require('./prodsql')
const noticeSql = require('./noticeSql')
const mypageSql = require('./mypageSql')

//관리자

const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
module.exports = {

    
    ...adminOrder,
    ...adminMember,

    ...prodsql,
    ...noticeSql,
    ...mypageSql

}