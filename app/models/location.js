const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocSchema = new Schema({
    lat: {type: String, required: true},
    lng: {type: String, required: true},
}, {timestamps: true, toJSON: {virtuals: true}});


module.exports = mongoose.model('Location', LocSchema);