const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
     school: {type: Schema.Types.ObjectId, ref: 'School',required:true,unique:true},
     price: {type: String, required: true},
     hasd: {type:Boolean,default:false},
     discount: {type: Number,default:0},
}, {timestamps: true, toJSON: {virtuals: true}});

module.exports = mongoose.model('Price', PriceSchema);