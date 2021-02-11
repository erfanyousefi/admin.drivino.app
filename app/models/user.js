const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    family:{type: String, required: true},
    mobile: {type: String, required: true, unique: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    province:{type:String,required:true},
    city:{type:String,required:true},
    done : {type:Boolean, default : false}
}, {timestamps: true, toJSON: {virtuals: true}});


UserSchema.virtual('registered', {
    ref: 'Registered',
    localField: '_id',
    foreignField: 'user',
});

module.exports = mongoose.model('User', UserSchema);