const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
     type:{type:String,required:true},
     number:{type:String,required:true},
     model:{type:Number,required:true},
     teacher:{type: Schema.Types.ObjectId, ref: 'Teacher',required:true}
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('Car', CarSchema);