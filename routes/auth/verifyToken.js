const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.headers('Authentication');
    if(!token) return res.json({err:true, message:"Access Denied"}).status(401);

    try{
        const verified = jwt.verify(token,process.env.JWT_KEY);
        req.user=verified;
        next();
    }catch(err){
        res.json({err:true, message:err}).status(400);
    }
}