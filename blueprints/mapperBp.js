var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    
    fqdn: {
        type:String,
        required:true,
        trim:true
    },

    website_url: {
        type:String,
        required:true,
        trim:true
    },
    website_name: String,

    global_score: Number,

    local_score: Number,

    country_code: String,

    country: String,

    section_links: Array,

    article_regex: Array,

    section_regex: Array,

    article_training_data: Array,

    section_training_data: Array,

    needs_search_params: Boolean,

    is_dynamic: Boolean,

    crawler_attempts: Number,

    website_language: String,

    website_status: String,

    website_error_status:String,

    website_icon_url: String,

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
.index({website_url: 1})
.index({website_name: 1})
.index({country_code: 1})
.index({country: 1})
.index({section_links: 1})
.index({article_regex: 1})
.index({article_training_data: 1})
.index({section_training_data: 1})
.index({needs_search_params: 1})
.index({is_dynamic: 1})
.index({crawler_attempts: 1})
.index({website_language: 1})
.index({website_status: 1})
.index({website_error_status: 1})
.index({date_created: -1})
.index({date_updated: -1})
.index({created_by: 1})
.index({updated_by: 1})

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('mappers', schema)