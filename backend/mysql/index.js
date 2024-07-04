const mysql = require('mysql2');
const sql = require('./sql');
require('dotenv').config({ path: 'mysql/.env' });

const conn = {
    // mysql 접속 설정
    connectionLimit: process.env.MYSQL_LIMIT,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
};

const pool = mysql.createPool(conn);
function query(alias, values) {
    return new Promise((resolve, reject) =>
        pool.query(getOrderBy(alias, values), values, function (err, results) {
            if (err) {
                console.log(err);
                reject({ err });
            } else resolve(results);
        })
    );
}

function getOrderBy(alias, values){
    let query = sql[alias];
    if(alias == 'prodList'){
        query = sql[alias].replace('sort', values[1]);
        values.splice(1,1); // 배열 내부 어느 위치든 상관없이 삭제 
        console.log(query, values);
    }
    return query;
}

module.exports = query;
