const userModel = require('../models/user.model');

module.exports.createUser = async({firstname,lastname,email,password})=>{
    // Check
    if(!firstname || !email || !password){
        throw new Error('Required fields are missing');
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}