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
    title: {
        type: String,
        trim:true
    },
    random_forest_classification: {
        type: String,
        trim:true
    },
    pipeline_classification: {
        type:String,
        trim: true
    },
    text_analysis: {
        type:String,
        trim: true
    },
    meta_analysis: {
        type:String,
        trim:true
    },
    dom_analysis: {
        type:String,
        trim:true
    },
    url_status: {
        type: String,
        trim:true
    },
    url_error_message: {
        type: String,
        trim:true
    },
    page_type: {
        type: String,
        trim:true
    },
    correct: {
        type: String,
        trim:true
    },
    nationality: {
        type: String,
        trim:true
    },
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
.index({random_forest_classification: 1})
.index({pipeline_classification: 1})
.index({url_status: 1})
.index({url_error_message: 1})
.index({page_type: 1})
.index({correct: 1})
.index({nationality: 1})
.index({date_created: -1})
.index({date_updated: -1})
.index({created_by: 1})
.index({updated_by: 1})

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('link_classifiers', schema)