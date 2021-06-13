const express = require('express')

const app=express();

app.get("/",(req,res)=>{
    res.send("Welcome to the start of the Project")

})


app.listen(3000,()=>console.log("Listening on : http://127.0.0.1:3000/"))