const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AExamSchema = new Schema({
     date:{type:String,required:true},
     time:{type:String,required:true},
     teacher: {type : Schema.Types.ObjectId, ref: 'Teacher', required:true},
     school: {type : Schema.Types.ObjectId, ref: 'School', required:true},
     partis: {type:Number,default:0},
     capacity: {type:Number,required: true},
     filled: {type:Boolean,default:false},
     status: {type:Number,default:0},
     duration: {type:Number,required:true},
     active: {type:Boolean,default:false}
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('AExam', AExamSchema);