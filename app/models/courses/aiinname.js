const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AiinSchema = new Schema({
     school: {type : Schema.Types.ObjectId, ref: 'School', required:true},
     teacher: {type : Schema.Types.ObjectId, ref: 'Teacher', required:true},
     title:{type:String,required:true},
     sdate:{type:String,required:true},
     fdate:{type:String,required:true},
     stime:{type:String,required:true},
     ftime:{type:String,required:true},
     partis: {type:Number,default:0},
     sNumber:{type:Number,required:true},
     filled:{type:Boolean,default:false},
     started:{type:Boolean,default:false},
     finish:{type:Boolean,default:false},
     done:{type:Boolean,default:false}
}, {timestamps: true, toJSON: {virtuals: true}});


AiinSchema.virtual('sessions', {
     ref: 'Asession',
     localField: '_id',
     foreignField: 'aiinname',
});

AiinSchema.virtual('users', {
     ref: 'Registered',
     localField: '_id',
     foreignField: 'aiinname',
 });

module.exports = mongoose.model('Aiinname', AiinSchema);