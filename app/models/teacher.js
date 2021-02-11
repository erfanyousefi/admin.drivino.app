const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    active:{type:Boolean,default:false},
    name: {type: String, required: true},
    family: {type:String,required:true},
    mobile: {type: String, required: true},
    gender: {type:String,requierd:true},
    birth: {type:String,requierd:true},
    NId: {type: String, required: true},
    wedlock:{type:String,required:true},
    address:{type:String,required:true},
    school: {type: Schema.Types.ObjectId, ref: 'School'},
    image: {type:String,required:true},
}, {timestamps: true, toJSON: {virtuals: true}});


TeacherSchema.virtual('car', {
    ref: 'Car',
    localField: '_id',
    foreignField: 'teacher',
});

TeacherSchema.virtual('rates', {
    ref: 'TRate',
    localField: '_id',
    foreignField: 'teacher',
});

module.exports = mongoose.model('Teacher', TeacherSchema);