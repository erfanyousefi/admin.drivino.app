const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noticeSchema = new Schema({
    school : {
        type : mongoose.Types.ObjectId,
        ref : "School"
    },
    title: {
        type: String,
        required : true
    },
    body: {
        type: String,
        required: true
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
noticeSchema.virtual("schools", {
    ref : "School",
    localField : "_id",
    foreignField : "school"
})

const noticeModel = mongoose.model("notice", noticeSchema);
module.exports = noticeModel;