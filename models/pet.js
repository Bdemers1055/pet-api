const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema class 

const petSchema = new Schema({ // "petSchema" is variable name
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    petType: {
        type: String,
        enum: ["cat", "dog"],
        lowercase: true,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 30,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;