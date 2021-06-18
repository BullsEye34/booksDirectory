const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
require('dotenv')
const {registerValidation, loginValidation} =require('./auth/validate')

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

router.post("/register",async (req,res)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({err:true, message:error["details"]});

    const {name,email, password, phone, img} = req.body;

    const userExists = User.findById({email:email});
    if(userExists) return res.status(400).json({err:true, message:"Email Already Exists"});

    
    var cipherText = CryptoJS.AES.encrypt(password, process.env.ENC_KEY).toString();
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
        res.status(201).json({err:false, data:savedUser});
    }catch(err){
        res.status(400).json({err:true, message:err});
    }
});

router.post("/login", (req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({err:true, message:error});
    res.send("Cool")
})


router.get("/get",(req,res)=>{
    User.find().exec((err, data)=>{
        if(err) return res.status(400).json({err:true, message:err})
        res.json({err:false, data:data});
    });
});

router.delete("/delAll",async(req,res)=>{
    try{  
        let deleteText = await User.deleteMany();
        res.json({err:false, message:deleteText});
    }
    catch(err){
        res.status(400).json({err:true, message:err});
    }
});

router.delete("/delOne/:_id",async(req,res)=>{
    try{  
        let deleteText = await User.deleteOne({_id:req.params._id});
        res.json({err:false, message:deleteText});
    }
    catch(err){
        res.status(400).json({err:true, message:err});
    }
});

router.patch("/update/:_id",(req,res)=>{
    const {name,email, password, phone, img} = req.body;
    User.updateOne({_id:req.params._id},{$set:{name:name, email:email, phone:phone}},{upsert: true}, (err,data)=>{
        if(err) return res.status(400).json({err:true, message:err});
        res.json({err:false, data:data});
    })
});


module.exports = router;