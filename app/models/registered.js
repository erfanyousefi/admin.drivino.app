const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisteredSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User',required:true,unique:true},
    school: {type: Schema.Types.ObjectId,ref: 'School',required:true},
    aiinname: {type: Schema.Types.ObjectId,ref: 'Aiinname'},
    aexam: {type: Schema.Types.ObjectId,ref: 'AExam'},
    toshahri: {type: Schema.Types.ObjectId,ref: 'Toshahri'},
    texam: {type: Schema.Types.ObjectId,ref: 'TExam'},
    name:{type:String,required:true},
    family:{type:String,required:true},
    gender:{type:String,required:true},
    phone:{type:String,required:true},
    national_id:{type:String,required:true},
    birthday:{type: Schema.Types.ObjectId,ref: 'Birthday',required:true},
    images:[{type:String,required:true}],
    address: {type:String,required:true},
    adone: {type:Boolean,default:false},
    tdone: {type:Boolean,default:false},
    payment: {type:Boolean,default:true},
    done: {type:Boolean,default:false}
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('Registered', RegisteredSchema);