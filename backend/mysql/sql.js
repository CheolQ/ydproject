//유저
const prodsql = require('./prodsql')
const noticeSql = require('./noticeSql')

//관리자

const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
module.exports = {

    
    ...adminOrder,
    ...adminMember,

    ...prodsql,
    ...noticeSql,

}