var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({

    section_url: {
        type: String,
        trim: true,
        required: true
    },
    section_status: {
        type: String,
        default: null // Done, Error
    },
    section_error_status: {
        type: String,
        default: null // Specific Error Message
    },
    created_by: {
        type: String,
        trim: true,
        default: "System"
    },
    updated_by: {
        type: String,
        trim: true,
        default: "System"
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'websites'
    },
})

schema
    .index({section_url: 1})
    .index({section_status: 1})
    .index({section_error_status: 1})
    .index({created_by: 1})
    .index({updated_by: 1})
    .index({date_created: -1})
    .index({date_updated: -1})

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('section_logs', schema)