const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolTicketSchema = new Schema({
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
        ref : "schoolTicket",
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
    }
},{
    timestamps : true,
    toJSON : {virtuals : true}
});
schoolTicketSchema.virtual("schools", {
    ref : "School",
    localField : "_id",
    foreignField : "school"
})
const schoolTicketModel = mongoose.model("schoolTicket", schoolTicketSchema);
module.exports = schoolTicketModel;