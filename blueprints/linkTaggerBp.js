var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    url: {
        type: String,
        unique:true,
        trim:true
    },
    fqdn: {
        type: String,
        trim:true
    },
    tags: Array,
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type:String,
        default:'System'
    },
    updated_by: {
        type:String,
        default:'System'
    }
})

schema
.index({url: 1})
.index({fqdn: 1})
.index({date_created: -1})
.index({date_updated: -1})
.index({created_by: 1})
.index({updated_by: 1})

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('link_taggers', schema)