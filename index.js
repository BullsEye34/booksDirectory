const express = require('express')

const app=express();

app.get("/",(req,res)=>{
    res.sendFile(process.cwd()+"/pages/index.html")

})


app.listen(3000,()=>console.log("Listening on : http://127.0.0.1:3000/"))