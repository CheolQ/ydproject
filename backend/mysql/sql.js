//유저
const prodsql = require('./prodsql')
const noticeSql = require('./noticeSql')
const mypageSql = require('./mypageSql')

//관리자

module.exports = {
    ...prodsql,
    ...noticeSql,
    ...mypageSql
}