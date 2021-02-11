const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherRate = new Schema({
    rate: {type: Number, required: true},
    teacher: {type : Schema.Types.ObjectId, ref: 'Teacher', required:true},
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('TRate', TeacherRate);