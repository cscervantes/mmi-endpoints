var mongoose = require('mongoose')
var Schema = mongoose.Schema
var dataTables = require('mongoose-datatables')

var schema = new Schema({
    section_url: {
        type: String,
        unique: true,
        trim:true,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    },
    section_status: {
        type: String,
        enum: ['Pending', 'Processing', 'Done', 'Error']
    },
    section_error_status: {
        type: String
    },
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'websites'
    }
})

schema
    .index({section_url: 1})
    .index({date_created: -1})
    .index({date_updated: -1})
    .index({section_status: 1})

schema.statics.storeSection = async function(data){
    try {
        return this.create(data);
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.updateSection = async function(data, id){
    try {
        return this.findOneAndUpdate({'_id': id}, data, {upsert:false});
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.deleteSection = async function(id){
    try {
        return this.deleteOne({'_id': id});
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.viewSection = async function(id){
    try {
        return this.findOne({'_id': id}).populate('website')  
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.listSection = async function(filter){
    try {
        return this.find(filter.query).limit(parseInt(filter.query.limit) || 10)
    } catch (error) {
        throw Error(error)
    }
}

schema.plugin(dataTables)

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('sections', schema)