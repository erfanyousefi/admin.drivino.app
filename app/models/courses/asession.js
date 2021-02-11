const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ASessionSchema = new Schema({
     date:{type:String,required:true},
     index:{type:Number,required:true},
     aiinname: {type : Schema.Types.ObjectId, ref: 'Aiinname', required:true},
     teacher: {type : Schema.Types.ObjectId, ref: 'Teacher', required:true},
     status: {type:Number,default:0}
}, {timestamps: true, toJSON: {virtuals: true}});



module.exports = mongoose.model('Asession', ASessionSchema);