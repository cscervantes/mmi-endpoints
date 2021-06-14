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
    captured_links: {
        type: Array,
        default:[]
    },
    fqdn: {
        type:String,
        default:null
    },
    dowload_latency: {
        type:Number,
        set: function(t){
            return parseFloat(t).toFixed(2)
        }
    },
    http_err: Number,
    dns_err: Number,
    timeout_err: Number,
    base_err: Number,
    skip_url: Number,
    // proxy: String,
    // user_agent: String,
    handle_httpstatus_list: String,
    redirect_url: String,
    redirect_reason: String,
    total_captured: Number,
    total_links: Number,
    total_duplicates: Number,
    attempts: Number,
    attempt_logs: Array,
    machines_ip: Array
})

schema
    .index({section_url: 1})
    .index({section_status: 1})
    .index({section_error_status: 1})
    .index({created_by: 1})
    .index({updated_by: 1})
    .index({date_created: -1})
    .index({date_updated: -1})
    .index({dowload_latency: 1})
    .index({http_err: 1})
    .index({dns_err: 1})
    .index({timeout_err: 1})
    .index({base_err: 1})
    .index({skip_url: 1})
    // .index({proxy: 1})
    // .index({user_agent: 1})
    .index({handle_httpstatus_list: 1})
    .index({total_captured: 1})
    .index({total_links: 1})
    .index({total_duplicates: 1})
    .index({attempts: 1})
    .index({attempt_logs: 1})
    .index({machines_ip: 1})

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('section_logs', schema)