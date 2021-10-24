const mongoose = require("mongoose");

// create new schema
const getFirstCollection = new mongoose.Schema({
    taskName:{
        type:String
    }
})

// exporting this schema
module.exports = mongoose.model("Task",getFirstCollection);