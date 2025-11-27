const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model.js');
const captainModel = require('../models/captain.model.js');

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Access denied. No token provided."});
    }
    const isBlackListed = await blacklistTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({message: "Token has been blacklisted. Please login again."});
    }

    // Decode
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
        
    }
    catch(err){
        return res.status(401).json({message: "Invalid token."});
    }
}

module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    
    const isBlackListed = await blacklistTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({message: "Token has been blacklisted. Please login again."});
    }
    
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }
    catch(err){
        return res.status(401).json({message: "Invalid token. check error"});
    }
}