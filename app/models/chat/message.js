const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
     usend:{type:Boolean,required:true},
     text:{type:String,required:true},
     chat:{type: Schema.Types.ObjectId, ref: 'Chat',required:true},
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('Message', MessageSchema);