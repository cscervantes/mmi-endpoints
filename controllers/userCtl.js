const SQL = require('../helpers/sql')
const createError = require('http-errors')
const md5 = require('md5')
const Account = {}

Account.Lists = async (req, res, next) => {
    try{
        const size = parseInt(req.query.size) || 10
        const query = {
            "sql": `SELECT * FROM account LIMIT ${size}`
        }
        let result = await SQL(query)
        res.status(200).send(result)        
    }catch(e){
        next(createError(e))
    }
}

Account.Login = async (req, res, next) => {
    try{
        // console.log(req.body)
        const usr = req.body.username
        const pass = md5(req.body.password)
        const query = {
            "sql": `SELECT COUNT(*) as count_user FROM account 
            WHERE acc_username = '${usr}' AND 
            acc_password = '${pass}'`
        }
        // console.log(query)
        let result = await SQL(query)
        if(result[0].count_user > 0){
            const query2 = {
                "sql": `SELECT * FROM account 
                WHERE acc_username = '${usr}' AND 
                acc_password = '${pass}'`
            }
            let result2 = await SQL(query2)
            res.status(200).send(result2.shift())
        }else{
            res.status(200).send(result.shift())
        }
            
    }catch(e){
        console.log(e)
       next(createError(e)) 
    }
}

module.exports = Account