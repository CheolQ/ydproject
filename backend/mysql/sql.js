//유저
const prodsql = require('./prodsql')
const noticeSql = require('./noticeSql')

//관리자

module.exports = {
    ...prodsql,
    ...noticeSql,
}