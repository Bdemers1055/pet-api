const express = require('express');
const server = express();

// setup our port
const port = process.env.PORT || 8008;


// power ups/middleware


// routes
server.get('/pets', (req, res) => {
    res.send('getting all pet');
});

// get one special et by id
server.get('/pets/:id', (req, res) => {
    res.send(`getting ${req.params.id} pet`);
});

// create new pet
server.post('/pets', (req, res) => {
    res.send('new pet');
});

//update pet by id
server.put('/pets/:id', (req, res) => {
    res.send(`updating ${req.params.id} pet`);
});

//delete pet by id
server.delete('/pets/:id', (req, res) => {
    res.send(`deleting ${req.params.id} pet`);
});

// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 8008`); 
});