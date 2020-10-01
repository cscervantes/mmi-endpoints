var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    link_url: {
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    link_status: {
        type: String,
        enum:['Queued', 'Processing', 'Done', 'Error'],
        default: 'Queued'
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
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
.index({link_url: 1})
.index({date_created: -1})
.index({date_updated: -1})
.index({link_status: 1})

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('links', schema)