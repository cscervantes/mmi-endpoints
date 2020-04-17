var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    article_url: {
        type:String,
        required:true,
        trim: true
    },
    article_author: {
        type:String,
        trim: true
    },
    article_section: {
        type:String,
        trim: true
    },
    article_publish_date: {
        type:Date,
        default:null
    },
    article_content: {
        type: String,
        trim: true
    },
    article_images: {
        type: Array
    },
    article_videos: {
        type: Array
    },
    article_media_type: {
        type: String,
        trim: true,
        default: 'Web'
    },
    article_ad_value: {
        type: Number,
        default: '0.00',
        set: function(t){
            return parseFloat(t).toFixed(2)
        }
    },
    article_pr_value: {
        type: Number,
        default: '0.00',
        set: function(t){
            return parseFloat(t).toFixed(2)
        }
    },
    article_language: {
        type:String,
        trim: true
    },
    article_status: {
        type: String,
        enum:['Queued', 'Processing', 'Done', 'Error'],
        default: 'Queued'
    },
    article_error_status: {
        type: String
    },
    machine: {
        type: Number,
        default: null
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
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sections'
    }
})

schema
    .index({article_url: 1})
    .index({article_publish_date: -1})
    .index({article_status: 1})
    .index({article_url: 1, article_publish_date: -1, article_status: 1}, {unique: true})
    .index({date_created: -1})
    .index({date_updated: -1})
    .index({article_status: 1})
    .index({machine:1})


schema.statics.storeArticle = async function(data){
    try {
        return this.create(data);
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.updateArticle = async function(data, id){
    try {
        return this.findOneAndUpdate({'_id': id}, data, {upsert:false});
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.deleteArticle = async function(id){
    try {
        return this.deleteOne({'_id': id});
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.viewArticle = async function(id){
    try {
        return this.find({'_id': id})  
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.listArticle = async function(filter){
    try {
        return this.find(filter.query).limit(parseInt(filter.query.limit) || 10)
    } catch (error) {
        throw Error(error)
    }
}

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('articles', schema)