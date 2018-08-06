const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require ('helmet');

// set up env variables
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// setup our port
const port = process.env.PORT || 8008;

//routers
const petRouter = require('./routers/pets');

// power ups/middleware
server.use(helmet());
server.use(morgan("combined")); // status logging 
server.use(bodyParser.json()); // accept json data
server.use(bodyParser.urlencoded({ extended: true })); // accept html form data

//routes
server.use(petRouter);

// 404 handler
server.use(function(req, res){
    console.log('here');
    res.status(404).json({
        msg: 'resource not found'
    });
});

// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 8008`); 
});