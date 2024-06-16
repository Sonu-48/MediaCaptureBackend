    const express = require('express');
    require('dotenv').config();
    require('./DB/connection');
    const router = require('./routes/routes')

    const app = express();
    const port = process.env.PORT
    app.use(express.json());
    app.use(router);
   

  


    app.listen(port,()=>{
        console.log(`server is running on http://localhost:${port}`)
    })