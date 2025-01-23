import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    },
    priority:{
        type: Number,
        required: true,
        default: 1 // 1-top priority
    },
    status:{
        type: String,
        required: true,
        default: "pending"
    }
})

export default mongoose.model("Task", taskSchema);