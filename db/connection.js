const mongoose = require("mongoose");
require("dotenv").config();

// create connection o mongodb atlas
const connect = async (uri)=>{
    try{
        let conn = await mongoose.connect(uri);
        return conn
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connect;