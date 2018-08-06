const express = require('express');
const router = express.Router(); // tiny lego brick
const Pet = require('../models/pet');

// routes
//get all pets
router.get('/pets', async (req, res) => {
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
router.get('/pets/:id', async (req, res) => {
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
router.post('/pets/', async (req, res) => {
    const { name, owner, petType, age, createdAt } = req.body;
    try {
        const pet = new Pet({ name, owner, petType, age, createdAt });
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
router.put('/pets/:id', async (req, res) => {
    const { id } = req.params;
    const { name, owner, petType, age } = req.body;
    try {
        const updatedPet = await Pet.findByIdAndUpdate( id, { name, owner, petType, age }, { new: true });
        res.status(200).json({
            msg: 'update successful',
            pet: updatedPet
        });
    } catch (error) {
        res.status(500).json({
            msg: 'pet did not update'
        });
    }
});

//delete pet by id
router.delete('/pets/:id', async (req, res) => {
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


module.exports = router;
