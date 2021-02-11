const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = new Schema({
     user:{type: Schema.Types.ObjectId, ref: 'User',required:true},
     rate:{type:Number,required:true},
     school:{type: Schema.Types.ObjectId, ref: 'School',required:true}
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('SRate', RateSchema);