const mongoes = require('mongoose')


// create a user Schema
const userSchema = new mongoes.Schema({
    firstname:{
        type:String,
        require
    },
    lastname:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    },
    password:{
        type:String,
        require
    },
    phonenumber:{
        type:Number,
        require
    }
})

//Create a Collection of DB
const User = mongoes.model('User',userSchema);

module.exports = User;