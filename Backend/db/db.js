const mongoose = require('mongoose');


function connectToDb(){
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to Database");
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectToDb;