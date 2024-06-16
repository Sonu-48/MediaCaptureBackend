
const mongoes = require('mongoose')

// create a DB connection
mongoes.connect('mongodb://localhost:27017/mediacapture')
.then(()=>{
    console.log("Connected to Mongoes DB")
})
.catch((error)=>{
    console.log(error);
})