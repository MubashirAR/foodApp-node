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
app.use(bodyParser.json())
app.listen(port);
console.log('running the server on port: ', port)

export default app;
require('./api/kitty')





