const mysql = require('mysql');

// 将操作数据库的回调，包装成promise
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '199407',
  database: 'crawler'
});

connection.connect();

module.exports = {
  query:Promise.promisify(connection.query).bind(connection),  // 包装成promise
  end:connection.end
};

