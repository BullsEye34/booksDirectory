const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.headers('Authentication');
    if(!token) return res.status(401).json({err:true, message:"Access Denied"});

    try{
        const verified = jwt.verify(token,process.env.JWT_KEY);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).json({err:true, message:err});
    }
}