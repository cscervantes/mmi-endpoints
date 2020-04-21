var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataTables = require('mongoose-datatables')

var websiteSchema = new Schema({
    website_name: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        set: function(t) {
            return t.split(' ')
            .map(v=>v.charAt(0).toUpperCase() + v.slice(1) ).join(' ')
        }
    },
    website_icon_url: {
        type:String,
        default:null
    },
    website_url: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    fqdn:{
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    website_cost: {
        type: Number,
        default: 0
    },
    website_language: {
        type: String,
        default: null
    },
    section_filter: {
        includes: Array,
        excludes: Array
    },
    article_filter: {
        includes: Array,
        excludes: Array
    },
    main_sections: {
        type: Array,
        default: null
    },
    sub_sections: { // this field can be used for manual checking
        type: Array,
        default: null
    },
    website_category: {
        type: String,
        enum: ['News', 'Blog'],
        default: 'News'
    },
    website_type: {
        type: String,
        enum: ['LOCAL_NEWS', 'TABLOID', 'INTERNATIONAL_NEWS', 'PROVINCIAL_NEWS', 'NEWS_COMPILATION', 'LOCAL_BLOG', 'INTERNATIONAL_BLOG', 'MAGAZINE'],
        default: 'LOCAL_NEWS'
    },
    alexa_rankings: {
        global: {
            type: Number,
            default: 0
        },
        local: {
            type: Number,
            default: 0
        },
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'EXPIRED'],
        default: 'INACTIVE'
    },
    region: {
        type: String,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    country_code: {
        type: String,
        trim: true,
        default: null
    },
    needs_https:{
        type:Boolean,
        default: false
    },
    needs_endslash:{
        type:Boolean,
        default: false
    },
    has_subsection:{
        type:Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    },
    programming_language: {
        type: String, // this should be enum type but it is hard to adjust
        default: null // this should be setup manual by person
    },
    request_source: {
        type: String, // this includes request, cloudscraper etc
        default: 'request'
    },
    is_dynamic_website:{ // this will be use later
        type: Boolean,
        default: false
    },
    is_using_selectors:{ // this will be use later
        type: Boolean,
        default: false
    },
    is_using_snippets:{ // this will be use later
        type: Boolean,
        default: false
    },
    selectors:{
        title: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ],
        publish: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ],
        author: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ],
        section: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ],
        image: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ],
        video: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ],
        body: [
            {
                selector: String,
                attrib: String,
                ignore: Array,
                replace: [
                    {
                        find: String,
                        replace: String
                    }
                ]
            }
        ]
    },
    code_snippet: {
        type:String,
        default:null
    },
    created_by: {
        type:String,
        default:'System'
    },
    updated_by: {
        type:String,
        default:'System'
    },
    website_scraper_delay: {
        type: Number,
        default: 500 // this is milliseconds 500 = 0.5s
    },
    embedded_sections:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sections'
        }
    ]
});
websiteSchema
    .index({ website_name: 1 })
    .index({ website_url: 1 })
    .index({ website_category: 1})
    .index({ website_type: 1 })
    .index({ website_cost: 1})
    .index({ fqdn: 1 })
    .index({ region: 1 })
    .index({ country: 1 })
    .index({ country_code: 1})
    .index({ status: 1 })
    .index({ date_created: -1})
    .index({ date_updated: -1})
    .index({ programming_language: 1})
    .index({ request_source: 1})
    .index({ is_dynamic_website: 1 })
    .index({"website_name": 1, "fqdn": 1}, {unique: true})

websiteSchema.statics.storeWebsite = async function(data){
    try {
        return this.create(data);
    } catch (error) {
        throw Error(error)
    }
    
}

websiteSchema.statics.updateWebsite = async function(data, id){
    try {
        return this.findOneAndUpdate({'_id': id}, data, {upsert:false});
    } catch (error) {
        throw Error(error)
    }
    
}

websiteSchema.statics.deleteWebsite = async function(id){
    try {
        return this.deleteOne({'_id': id});
    } catch (error) {
        throw Error(error)
    }
    
}

websiteSchema.statics.viewWebsite = async function(id){
    try {
        return this.find({'_id': id})  
    } catch (error) {
        throw Error(error)
    }
   
}

websiteSchema.statics.listWebsite = async function(filter){

    try {
        return this.find(filter.query).limit(parseInt(filter.query.limit) || 10)
    } catch (error) {
        throw Error(error)
    }

    // let sortCol = req.body.order[0]['column']
    // let sortDir = req.body.order[0]['dir']

    // let sort = {}
    // let fields = ['name', 'fqdn', 'category', 'website_type', 'country_code', 'status', 'creation_date']

    // if(sortDir === 'desc'){
    //     sort[fields[sortCol]] = -1
    // }else{
    //     sort[fields[sortCol]] = 1
    // }

    // models.websites.dataTables({
    //     limit: req.body.length || 10,
    //     skip: req.body.start || 0,
    //     search: {
    //         value: req.body.search.value || null,
    //         fields: fields.splice(0,5)
    //     },
    //     sort: sort
    // }).then(function(table){
    //     table['recordsTotal'] = table.total
    //     table['recordsFiltered'] = table.total
    //     res.json(table)
    // }).catch(function(error){
    //     res.api.error(error)
    // })
}

websiteSchema.plugin(dataTables)

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('websites', websiteSchema)