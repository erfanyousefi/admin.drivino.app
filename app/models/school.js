const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueString = require('unique-string');
const bcrypt = require('bcrypt');

const SchoolSchema = new Schema({
    active:{type:Boolean,default:false},
    name: {type: String, required: true},
    email: {type: String, required: false},
    password:{type:String, required:true},
    text: {type:String, required:true},
    image: {type: String, required: false},
    manager: {type:String , required: true},
    socials: {type:Object , required: false},
    tele:{type: String, required: true},
    address:{type: String, required: true},
    location: {
        type : {
            type : String,
            enum : ['Point']
        },
        coordinates : {
            type : [Number],
            index : "2dsphere"
        },
        formattedAddress : String
    },
    city:{type:String,required:true},
    province:{type:String,required:true},
    national_id : {type : String, required : false, default : ""},
    mobile : {type : String, required : true,unique: true},
    rememberToken: {type:String,default:null},
}, {timestamps: true, toJSON: {virtuals: true}});

// SchoolSchema.pre("save", function () {
//     const salt = bcrypt.genSaltSync(15);
//     const hash = bcrypt.hashSync(this.password, salt);
//     this.password = hash;
// });
SchoolSchema.methods.comparePassword = function (password) {
    if(password == this.password){
        return true;
    }else{
        return false;
    }
};

SchoolSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
SchoolSchema.methods.setRememberToken = function (res) {
    let token = uniqueString();
    res.cookie("remember_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        signed: true
    });
    this.updateOne({
        rememberToken: token
    }, (err) => {
        console.log(err);
    })
}
SchoolSchema.methods.setRememberTokenNormal = function (res) {
    let token = uniqueString();
    res.cookie("remember_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        signed: true
    });
    this.updateOne({
        rememberToken: token
    }, (err) => {
        console.log(err);
    })
}
SchoolSchema.virtual('teachers', {
    ref: 'Teacher',
    localField: '_id',
    foreignField: 'school',
});

SchoolSchema.virtual('price', {
    ref: 'Price',
    localField: '_id',
    foreignField: 'school',
    justOne : true
    
});

module.exports = mongoose.model('School', SchoolSchema);
