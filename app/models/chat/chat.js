const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
     title:{type:String,required:true},
     section:{type:String,required:true},
     status:{type:Boolean,default:false},
     user:{type: Schema.Types.ObjectId, ref: 'User',required:true},
     school:{type: Schema.Types.ObjectId, ref: 'School',required:true},
}, {timestamps: true, toJSON: {virtuals: true}});


ChatSchema.virtual('messages', {
     ref: 'Message',
     localField: '_id',
     foreignField: 'chat',
});

module.exports = mongoose.model('Chat', ChatSchema);