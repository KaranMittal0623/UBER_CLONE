const captainModel = require('../models/captain.model.js')

module.exports.createCaptain = async({
    firstname,email,password,color,plate,capacity,vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required')
    }
    const captain = await captainModel.create({
        fullname:{
            firstname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            typeVehicle:vehicleType
        }
    })
    return captain;
}