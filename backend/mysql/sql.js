//유저

//관리자

const adminOrder = require('./admin/orderSql')
const adminMember = require('./admin/memberSql')
module.exports = {
    
    ...adminOrder,
    ...adminMember,
}