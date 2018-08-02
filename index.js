const express = require('express');
const server = express();

// setup our port
const port = process.env.PORT || 8008;


// power ups/middleware


// routes

// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 8008`); 
});