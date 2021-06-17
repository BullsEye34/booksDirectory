const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
require('dotenv')

router.get("/",(req,res)=>{
    res.send("😃Users present here😃");
});

router.get("/get",(req,res)=>{
    User.find().exec((err, data)=>{
        if(err) return res.json({err:true, message:err}).status(400)
        res.json({err:false, data:data});
    });
});

router.post("/add",async (req,res)=>{
    const {name,email, password, phone, img} = req.body;
    var cipherText = CryptoJS.AES.encrypt(password, process.env.ENC_KEY).toString();
    /// Use below snippet for Decyption of Text
    /* var bytes  = CryptoJS.AES.decrypt(cipherText, process.env.ENC_KEY);
    var deCipherText = bytes.toString(CryptoJS.enc.Utf8); */

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
        res.json({err:false, data:savedUser});
    }catch(err){
        res.json({err:true, message:err}).status(400);
    }
    //res.json({pw: password, encrypted:cipherText,createdUser:createdUser});
})


module.exports = router;