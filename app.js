require("dotenv").config();
const express = require("express")
const connect = require("./db/connection")
const router = require("./routes/route");

const app = express();
app.use(express.json());
app.use(express.static("./public"))
app.use("/api/v1/tasks",router);

//! create your .env file then add a specific PORT
const port = process.env.PORT;

//! create connection to the database (add MONGODB_CONNECTION_URI to your .env file)
try{
    connect(process.env.MONGODB_CONNECTION_URI);
}
catch(err){
    console.log(err);
}
// send 404 not found whenever the url is not correct
app.all("/*",(req,res)=>{
    res.status(404).send("404 - Page not found...")
})

// make sure you've already created a .env file and set your specific port...
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Listening on port ${port}...`);
})