const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    school : {
        type : mongoose.Types.ObjectId,
        ref : "School"
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
        ref : "ticket",
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
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        default: undefined
    }
},{
    timestamps : true,
    toJSON : {virtuals : true}
});
ticketSchema.virtual("schools", {
    ref : "School",
    localField : "_id",
    foreignField : "school"
})
ticketSchema.virtual("admin", {
    ref : "Admin",
    localField : "_id",
    foreignField : "sender"
})
const ticketModel = mongoose.model("ticket", ticketSchema);
module.exports = ticketModel;