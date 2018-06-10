// const mysql = require('mysql');
// const config = require('../config/defalut');

// // const pool = mysql.createPool({
// //     database : config.database.DATABASE,
// //     user : config.database.USERNAME,
// //     password : config.database.PASSWORD,
// //     port : config.database.PORT,
// //     host : config.database.HOST,
// // })

// const pool = mysql.createPool({
//     database: 'mybase',
//     user: 'root',
//     password: '492275105',
//     port: '3306',
//     host: 'localhost',
// })

// let query = function (sql, values) {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             resolve(err)
//         } else {
//             connection.query(sql, values, (err, rows) => {
//                 connection.release();
//             })
//         }
//     })
// }

// user =
//     `create table if not exists user(
//  id INT NOT NULL AUTO_INCREMENT,
//   name VARCHAR(100) NOT NULL,
//  password VARCHAR(100) NOT NULL,
//  PRIMARY KEY ( id )
// );`

// let createTable = function (sql) {
//     return query(sql, [])
// }

// //建表
// createTable(user);

// module.exports = {
//     loginUser,
//     regUser,
// }




