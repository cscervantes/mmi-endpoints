var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
    section_url: {
        type: String,
        trim:true,
        unique: true
    },
    priority_number: {
        type: Number,
        default:0
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
    },
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'websites'
    }
})

schema
.index({section_url: 1})
.index({created_by: 1})
.index({updated_by: 1})
.index({date_created: -1})
.index({date_updated: -1})

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('section_links', schema)