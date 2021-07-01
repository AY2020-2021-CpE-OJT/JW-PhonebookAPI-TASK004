const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    _name: {
        last: {
            type: String,
            required:true
        },
        first: {
            type: String,
            required:true
        },
    },
    phone_numbers: {
        type: [String]
    }
});

module.exports = mongoose.model('contacts', ContactsSchema);