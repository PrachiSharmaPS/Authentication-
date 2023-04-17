const mongoose = require("mongoose")


const user = new mongoose.Schema({
    firstName: String,
    lastName:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String
},{timestamps:true})

module.exports = mongoose.model("User",user)