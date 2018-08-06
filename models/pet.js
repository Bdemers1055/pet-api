const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', { name: String, owner: String });

module.exports = Pet;