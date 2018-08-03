const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// set up env variables
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// setup our port
const port = process.env.PORT || 8008;


// power ups/middleware

// temporary

//models
const Pet = mongoose.model('Pet', { name: String, owner: String });

// routes
//get all pets
server.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({
            pets: pets
        });
    } 
    catch(err) {
        res.status(500).json({
            msg: 'broken'
        });
    }
});

// get one special et by id
server.get('/pets/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const pets = await Pet.find({ _id: id });
        res.status(200).json({
            pets: pets
        });
    }
    catch(err) {
        res.status(500).json({
            msg: 'broken'
        });
    }
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