//유저
const prodsql = require('./prodSql')
const noticeSql = require('./noticeSql')

//관리자

module.exports = {
    ...prodsql,
    ...noticeSql,
}