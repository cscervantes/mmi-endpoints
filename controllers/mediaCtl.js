const SQL = require('../helpers/sql')
const createError = require('http-errors')

const media = {}

media.COUNT = async (req, res, next) => {
    try {
        let query = {
            sql: `SELECT COUNT(*) as total FROM media_web WHERE ?`,
            values: [req.body]
        }
        // console.log(query)
        res.status(200).send(await SQL(query))
    } catch (error) {
        next(createError(error))
    }
}

media.INSERT_TO_RAW = async (req, res, next) => {
    try {
        let query = {
            sql: `INSERT INTO media_web_raw SET ?`,
            values: req.body
        }
        // console.log(query)
        res.status(200).send(await SQL(query))
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

media.CUSTOM_QUERY = async (req, res, next) => {
    try {
        let result = await SQL(req.body)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        next(createError(error))
    }
}

module.exports = media