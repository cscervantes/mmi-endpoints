var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    google_title: {
        type: String,
        trim:true
    },
    google_link: {
        type: String,
        unique:true,
        trim:true
    },
    google_date: {
        type: Date,
        default: new Date()
    },
    original_url: {
        type:String,
        trim: true
    },
    google_keyword: {
        type:String,
        trim: true
    },
    google_image: {
        type:String,
        trim:true
    },
    google_website_name: {
        type:String,
        trim:true
    },
    status: {
        type: String,
        enum:['Queued', 'Processing', 'Done', 'Error'],
        default: 'Queued'
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_updated: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type:String,
        default:'System'
    },
    updated_by: {
        type:String,
        default:'System'
    },
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'websites'
    }
})

schema
.index({google_tile: 1})
.index({google_link: 1, original_url: 1}, {unique: true})
.index({original_url: 1})
.index({google_website_name: 1})
.index({google_keyword: 1})
.index({google_date: -1})
.index({date_created: -1})
.index({date_updated: -1})
.index({status: 1})

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('global_links', schema)