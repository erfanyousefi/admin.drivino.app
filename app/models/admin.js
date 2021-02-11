const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueString = require('unique-string');

const AdminSchema = new Schema({
    name: {type: String, required: true},
    family: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password:{type:String,required:true},
    image: {type: String, required: true},
    mobile:{type: String, required: true},
    tele:{type: String, required: true},
    text:{type: String, default : ""},
    address:{type: String, required: true},
    socials:{type:Object, required : false},
    rememberToken: {type:String,default:null},
    confirm: {type:Boolean,default:false}
}, {timestamps: true, toJSON: {virtuals: true}});

AdminSchema.methods.comparePassword = function (password) {
    if(password == this.password){
        return true;
    }else{
        return false;
    }
};
 
AdminSchema.methods.setRememberToken = function(res){
    const token = uniqueString();
    res.cookie(
        'remember_token',
        token,
        {
            maxAge:1000*60*60*24*30,
            httpOnly:true,
            signed: true
        }
    );
    this.update({rememberToken:token},err=>{
        if(err){
            console.log(err);
        }
    });
}

module.exports = mongoose.model('Admin', AdminSchema);