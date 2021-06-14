const express = require('express');
const router = express.Router();

// Serve home HTML Page
router.get("/",(req,res)=>{
    res.sendFile(process.cwd()+"/pages/index.html");
});

module.exports = router;