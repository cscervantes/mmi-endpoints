const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    fqdn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    similar_websites: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
    in_website_collection: {
        type: Boolean,
        default: false
    },
    alexa_rankings: {
        global:{
            type:Number,
            default:0
        },
        local:{
            type:Number,
            default:0
        }
    },
    country: {
        type:String,
        default: 'Unknown'
    },
    country_code: {
        type:String,
        default: 'NoC'
    },
    created_by: {
        type: String,
        default: 'System'
    },
    updated_by: {
        type: String,
        default: 'System'
    },
    date_created: {
        type:Date,
        default: Date.now
    },
    date_updated: {
        type:Date,
        default: Date.now
    }
})

schema
.index({name: 1, fqdn: 1, url:1}, {unique:true})
.index({name: 1})
.index({fqdn:1})
.index({url:1})
.index({verified:1})
.index({in_website_collection:1})
.index({country:1})
.index({country_code:1})
.index({date_created: -1})
.index({date_updated: -1})
.index({created_by: 1})
.index({updated_by: 1})

schema.plugin(require('mongoose-datatables'))

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('raw_websites', schema)