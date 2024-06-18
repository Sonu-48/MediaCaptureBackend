const express = require('express');
require('dotenv').config();
require('./DB/connection');
const router = require('./routes/routes')
const path= require('path')

const app = express();
const port = process.env.PORT
app.use(express.json());
const staticPath = path.join(__dirname, './public/my-uploads');
console.log("Static files path:", staticPath);
app.use('/public/my-uploads', express.static(staticPath))
app.use(express.urlencoded({ extended: true }));
app.use(router);





app.listen(port,()=>{
    console.log(`server is running on http://192.168.1.106:${port}`)
})