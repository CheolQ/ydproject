const mysql = require('mysql2');
const sql = require('./sql');
require('dotenv').config({path: 'mysql/.env'});

const conn = { // mysql 접속 설정
    connectionLimit: process.env.MYSQL_LIMIT,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
};

const pool = mysql.createPool(conn);
function query(alias, values){
    return new Promise((resolve, reject) => 
        pool.query(sql[alias], values, function(err, results){
            if(err) {
                console.log(err);
                reject({err})
            }
            else resolve(results);
        }
    )) 
    
}

module.exports = query;