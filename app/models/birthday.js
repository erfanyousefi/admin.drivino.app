const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BirthSchema = new Schema({
     day:{type: Number, required: true},
     month:{type: Number, required: true},
     year:{type: Number, required: true},
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('Birthday', BirthSchema);