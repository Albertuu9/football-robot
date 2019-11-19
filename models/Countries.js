const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// feed's schema
const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Countries', countrySchema, 'countries');