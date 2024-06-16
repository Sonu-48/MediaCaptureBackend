const mongoes = require('mongoose');


// create a file Schema
const fileShema = new mongoes.Schema({
    filename:String,
    contentType:String,
    size:Number,
    uploadDate:{type:Date,default:Date.now},
    data:Buffer,
})

// Create a collection
const File = mongoes.model('File',fileShema);

module.exports = File;