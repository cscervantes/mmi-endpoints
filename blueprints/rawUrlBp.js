var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    
    fqdn: {
        type:String,
        required:true,
        trim:true
    },

    url: {
        type:String,
        required:true,
        trim:true,
        unique: true
    },

    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mappers'
    },

    url_status: String,

    random_forest_classification: String,

    url_error_status: String,

    attempts: Number,

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
.index({fqdn: 1})
.index({url: 1})
.index({url_status: 1})
.index({random_forest_classification: 1})
.index({url_error_status: 1})
.index({attempts: 1})
.index({date_created: -1})
.index({date_updated: -1})
.index({created_by: 1})
.index({updated_by: 1})

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('raw_urls', schema)