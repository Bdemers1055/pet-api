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


// power ups/middleware
server.use(helmet());
server.use(morgan("combined")); // status logging 
server.use(bodyParser.json()); // accept json data
server.use(bodyParser.urlencoded({ extended: true })); // accept html form data

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
server.post('/pets/', async (req, res) => {
    const { name, owner } = req.body;
    try {
        const pet = new Pet({ name, owner });
        await pet.save();
        res.status(201).json({
            msg: 'saved pet',
            pet
        });
    } catch(err){
        res.status(500).json({
            msg: 'pet not created'
        });
    }
});

//update pet by id
server.put('/pets/:id', (req, res) => {
    res.send(`updating ${req.params.id} pet`);
});

//delete pet by id
server.delete('/pets/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        await Pet.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'yay deleted!'
        });
    }
    catch(err) {
            res.status(500).json({
                msg: 'broken'
            });
    }
});


// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 8008`); 
});