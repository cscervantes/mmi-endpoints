var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    article_title: {
        type:String,
        trim: true,
        default: null
    },
    article_url: {
        type:String,
        required:true,
        trim: true
    },
    article_source_url: {
        type: String,
        default: null
    },
    article_authors: {
        type:Array,
        default: []
    },
    article_sections: {
        type:Array,
        default: []
    },
    article_publish_date: {
        type:Date,
        default:null
    },
    article_content: {
        type: String,
        trim: true,
        default: null
    },
    article_images: {
        type: Array,
        default: []
    },
    article_videos: {
        type: Array,
        default: []
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
        trim: true,
        default:null
    },
    article_status: {
        type: String,
        enum:['Queued', 'Processing', 'Done', 'Error'],
        default: 'Queued'
    },
    article_error_status: {
        type: String,
        default: null
    },
    article_source_from: {
        type: String,
        default: 'NodeJS Static Scraper' // e.g(NodeJS Dynamic Scraper)
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
    is_in_mysql: {
        type: Boolean,
        default: false
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
    .index({article_source_url: 1})
    .index({article_publish_date: -1})
    .index({article_status: 1})
    .index({article_url: 1, article_publish_date: -1, article_status: 1}, {unique: true})
    .index({date_created: -1})
    .index({date_updated: -1})
    .index({article_status: 1})
    .index({article_source_from: 1})


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
        return this.findOne({'_id': id}).populate('website', 'website_name website_url fqdn alexa_rankings website_cost website_category website_type country').populate('section', 'section_url')  
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.listArticle = async function(req){
    try {
        let limit = req.query.limit || 10
        let filter = req.query || {}
        delete filter.limit
        return this.find(filter).populate('website', '-embedded_sections -main_sections -sub_sections').limit(parseInt(limit))
    } catch (error) {
        throw Error(error)
    }
}

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('article_stages', schema)