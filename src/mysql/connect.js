const mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '199407',
//   database: 'crawler'
// })

// 连接
// connection.connect()

// query执行sql语句的意思，并非仅仅用来查询

/*
connection.query(`SELECT 1+1`, function(error, result) {
  console.log(error)
  console.log(result)
}) */


// 插入数据
/*
connection.query(`INSERT INTO student(id, name) VALUES(1, 'bzy')`, function(error, result) {
  console.log(error)
  console.log(result)
}) */

// 更新数据
/*
connection.query(`UPDATE student SET name = 'bzy1' WHERE id=1`, function(error, result) {
  console.log(error)
  console.log(result)
})
*/

// 删除数据路
/*
connection.query(`DELETE FROM student WHERE id=1`, (error, result) => {
  console.log(error)
  console.log(result)
})
*/

const options = {
  host: 'localhost',
  user: 'root',
  password: '199407',
  database: 'crawler'
}

function connect() {
  let connection = mysql.createConnection(options)
  connection.connect(err => {
    if (err) {
      console.log(`连接出错 ${err}`)
      // 重新连接
      setTimeout(connect, 2000)
      return
    }
    connection.on('err', (err) => {
      if (err.code == 'PROTOCAL_CONNECTION_LOST') {
        connect()
      } else {
        throw err
      }
    })
  })
}
connect()