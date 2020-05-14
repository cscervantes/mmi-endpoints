var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    queue_type : {
        type: String,
        enum: ["section_url", "article_url"],
        default: "section_url"
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sections',
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    }
})

schema
    .index({queue_type: 1})
    .index({date_created: -1})
    .index({date_updated: -1})
    .index({queue_type: 1, section: 1}, {unique: true})

schema.statics.storeQueue = async function(data){
    try {
        return this.create(data);
    } catch (error) {
        throw Error(error)
    }
}

schema.statics.deleteQueue = async function(id){
    try {
        return this.deleteOne({'_id': id});
    } catch (error) {
        throw Error(error)
    }
}

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('queues', schema)