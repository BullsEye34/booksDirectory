const express = require('express');
const cors = require('cors');

// Define App to be an Express APp
const app=express();

// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Endpoints

// Serve Home page
app.get("/",(req,res)=>{
    res.sendFile(process.cwd()+"/pages/index.html");
});


app.listen(3000,()=>console.log("Listening on : http://127.0.0.1:3000/"));