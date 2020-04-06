const mysql = require('mysql')
const creds = require('./setting')

const SQL = async (sql) => {
    return new Promise((resolve, reject) => {
        try{
            const mysqlCred = (process.env.PRODUCTION) ? creds.mysql : creds.mysql2
            // console.log(mysqlCred)
            const mysqlConn = mysql.createConnection(mysqlCred)
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