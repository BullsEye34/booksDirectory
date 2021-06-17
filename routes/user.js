const router = require('express').Router();
const User = require('../models/user');

router.get("/",(req,res)=>{
    res.send("😃Users present here😃");
});

router.get("/get",(req,res)=>{
    User.find().exec((err, data)=>{
        if(err) return res.json({err:true, message:err}).status(400)
        res.json({err:false, data:data});
    })
})


module.exports = router;