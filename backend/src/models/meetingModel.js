import mongoose, { Schema } from "mongoose";


const meetingSchema = new Schema({
    name:{type:String},
    meeting_id:{type:String, required:true},
    date:{type:Date, default:Date.now, required:true}
})

const meeting = mongoose.model("Meeting",meetingSchema);

export {meeting};