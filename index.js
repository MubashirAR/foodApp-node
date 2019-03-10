// Initializations and imports
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var express = require('express');
var app = express(),
port    = parseInt(process.env.PORT, 10) || 3000;

// MongoDB stuff
import { mongoURL } from "./config";
mongoose.connect(mongoURL);
console.log(__dirname)

//Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Max-Age', '86400');
    next();
})
app.use((req, res, next) => {
    res.sendResponse = (isSuccessful, data, token) => {
        console.log('success response');
        const status = isSuccessful? 'success' : 'failure';
        res.send({status: status, data, token})
    }
    next();
})
app.use(bodyParser.json())

app.listen(port);
console.log('running the server on port: ', port + '...')

export default app;
require('./api/kitty')
require('./api/users')





