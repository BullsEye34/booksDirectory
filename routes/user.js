const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');


router.get("/",(req,res)=>{
    res.send("😃Users present here😃");
});

router.get("/get",(req,res)=>{
    User.find().exec((err, data)=>{
        if(err) return res.json({err:true, message:err}).status(400)
        res.json({err:false, data:data});
    });
});

router.post("/add",(req,res)=>{
    const {name,email, password, phone, img} = req.body;
    var cipherText = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
    var bytes  = CryptoJS.AES.decrypt(cipherText, 'secret key 123');
    var deCipherText = bytes.toString(CryptoJS.enc.Utf8);
    res.json({pw: password, encrypted:cipherText, decypted: deCipherText});
})


module.exports = router;