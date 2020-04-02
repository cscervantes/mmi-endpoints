const mysql = require('mysql')
const creds = require('./setting')

const SQL = async (sql) => {
    return new Promise((resolve, reject) => {
        try{
            const mysqlConn = mysql.createConnection(creds.mysql)
            mysqlConn.connect()
            mysqlConn.query(sql, (error, result)=>{
                mysqlConn.end()
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = SQL