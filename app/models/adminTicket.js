const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminTicketSchema = new Schema({
    school : {
        type : mongoose.Types.ObjectId,
        ref : "School"
    },
    subject : {
        type: String,
        default : ""
    },
    title: {
        type: String,
        default : ""
    },
    body: {
        type: String,
        required: true
    },
    parrent : {
        type : mongoose.Types.ObjectId,
        ref : "adminTicket",
        default : null
    },
    status : {
        type : Number,
        required : true
    },
    read : {
        type : Boolean,
        required : true,
        default : false
    },
    sender : {
        type : mongoose.Types.ObjectId,
        ref : "Admin",
        default : undefined
    }
},{
    timestamps : true,
    toJSON : {virtuals : true}
});
adminTicketSchema.virtual("schools", {
    ref : "School",
    localField : "_id",
    foreignField : "school"
})
adminTicketSchema.virtual("admin", {
    ref : "Admin",
    localField : "_id",
    foreignField : "sender"
})
const adminTicketModel = mongoose.model("adminTicket", adminTicketSchema);
module.exports = adminTicketModel;