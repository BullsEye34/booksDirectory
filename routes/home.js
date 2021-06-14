const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.sendFile(process.cwd()+"/pages/index.html");
});

module.exports = router;