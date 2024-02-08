import mongoose from "mongoose";

const Urlschema = new mongoose.Schema({
    urlCode:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    originalLink:{
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    visitCount:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: String,
        default: Date.now()
    },
    updatedAt:{
        type: String,
        default: Date.now()
    },
    userId:{
        type: String,
        index: true
    }
});

export default mongoose.model("urls", Urlschema);