const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToshahrSchema = new Schema({
     school: {type : Schema.Types.ObjectId, ref: 'School', required:true},
     teacher: {type : Schema.Types.ObjectId, ref: 'Teacher', required:true},
     sdate:{type:String,required:true},
     fdate:{type:String,required:true},
     stime:{type:String,required:true},
     ftime:{type:String,required:true},
     sNumber:{type:Number,required:true},
     filled:{type:Boolean,default:false},
     started:{type:Boolean,default:false},
     finish:{type:Boolean,default:false},
     done:{type:Boolean,default:false}
}, {timestamps: true, toJSON: {virtuals: true}});

ToshahrSchema.virtual('sessions', {
     ref: 'TSession',
     localField: '_id',
     foreignField: 'toshahri',
});

ToshahrSchema.virtual('users', {
     ref: 'Registered',
     localField: '_id',
     foreignField: 'toshahri',
 });


module.exports = mongoose.model('Toshahri', ToshahrSchema);