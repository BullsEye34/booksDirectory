const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
require('dotenv')
const {registerValidation} =require('./auth/validate')

router.get("/",(req,res)=>{
    res.send("😃Users present here😃");
});


/* router.post("/add",async (req,res)=>{
    const {name,email, password, phone, img} = req.body;
    var cipherText = CryptoJS.AES.encrypt(password, process.env.ENC_KEY).toString();
    /// Use below snippet for Decyption of Text
    /* var bytes  = CryptoJS.AES.decrypt(cipherText, process.env.ENC_KEY);
    var deCipherText = bytes.toString(CryptoJS.enc.Utf8); *

    let createdUser;
    if(img!=null){
        createdUser = new User({
            name: name,
            email:email,
            password: cipherText,
            phone:phone,
            img:img
        });
    }
    else{
        createdUser =  new User({
            name: name,
            email:email,
            password: cipherText,
            phone:phone,
        });
    }
    try{
        let savedUser = await createdUser.save();
        res.json({err:false, data:savedUser}).status(201);
    }catch(err){
        res.json({err:true, message:err}).status(400);
    }
}); */

router.post("/register",(req,res)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.json({err:true, message:error["details"]}).status(400);
    res.send("OK")
})


router.get("/get",(req,res)=>{
    User.find().exec((err, data)=>{
        if(err) return res.json({err:true, message:err}).status(400)
        res.json({err:false, data:data});
    });
});

router.delete("/delAll",async(req,res)=>{
    try{  
        let deleteText = await User.deleteMany();
        res.json({err:false, message:deleteText});
    }
    catch(err){
        res.json({err:true, message:err}).status(400);
    }
});

router.delete("/delOne/:_id",async(req,res)=>{
    try{  
        let deleteText = await User.deleteOne({_id:req.params._id});
        res.json({err:false, message:deleteText});
    }
    catch(err){
        res.json({err:true, message:err}).status(400);
    }
});

router.patch("/update/:_id",(req,res)=>{
    const {name,email, password, phone, img} = req.body;
    User.updateOne({_id:req.params._id},{$set:{name:name, email:email, phone:phone}},{upsert: true}, (err,data)=>{
        if(err) return res.json({err:true, message:err}).status(400);
        res.json({err:false, data:data});
    })
});


module.exports = router;