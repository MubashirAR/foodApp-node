// Initializations and imports
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var app = express(),
port    = parseInt(process.env.PORT, 10) || 3000;
const userModule = require('./api/user');
const restaurantModule = require('./api/restaurant');

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
        // console.log('success response');
        const status = isSuccessful? 'success' : 'failure';
        res.send({status: status, data, token})
    }
    next();
})
app.use(bodyParser.json())
app.use('/user',userModule);
app.use('/restaurant',restaurantModule);

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];
  
app.all('*', (req, res) => {
    // console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
    // console.log('${__dirname}/dist/foodAppFE/index.html');
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0)
        res.sendFile(require('path').resolve(`dist/foodAppFE/${req.url}`));
    else 
        res.status(200).sendFile(__dirname + '/dist/foodAppFE/index.html');
});
app.listen(port);
console.log('running the server on port: ', port + '...')

export default app;
// require('./api/kitty')
// require('./api/users')



// const apiFolder = './api/';
// const fs = require('fs');

// fs.readdir(apiFolder, (err, files) => {
//   files.forEach(file => require('./api/' + file));
// });

