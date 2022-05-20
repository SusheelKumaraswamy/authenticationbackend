const express = require('express');

const dotenv = require('dotenv');

const app= express();

const port = (process.env.PORT|| "3000");

const db = require('./database');

const router = require('./router/router');

dotenv.config();

db.mongooseconnect();

//req.body to json format
app.use(express.json());

app.listen(port,()=>{
    console.log(`connected to ${port}`);
})

app.use('/authentication',router);

