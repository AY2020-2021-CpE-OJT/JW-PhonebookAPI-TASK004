const express = require('express');
const router = express.Router();
const { config } = require('dotenv'); 
const Contacts = require('../models/Contacts');

const dbName = process.env.DB_NAME || '';

config();

//Get all routes
router.get('/', async (req,res) => {
    const contacts = await Contacts.find().countDocuments(
        function(err, count) {
            console.log("Number of docs [", dbName ,"]:", count); 
            res.send('Check log for all Contacts');
        });    
});

//Create a new Contacts
router.post('/new', async (req, res) => {

    const newContacts = new Contacts(req.body);
    const savedContacts = await newContacts.save();
    res.send('a Contact has been Added');

});

//Get  specific Contacts
router.get('/get/:id', async (req,res) =>{
    const q = await Contacts.findById({_id: req.params.id});
    res.json(q);
});

//Delete Contacts 
router.delete('/delete/:id', async (req,res) => {
    const result = await Contacts.findByIdAndDelete({_id: req.params.id});
    res.json(result);
});

//Update a Contacts
router.patch('/update/:id', async (req, res) => {
    const patch = await Contacts.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(patch);
});

//Get Random Contacts
router.get('/random', async (req, res) => {
    const count = await Contacts.countDocuments();
    
    const random = Math.floor(Math.random() * count);
    const q = await Contacts.findOne().skip(random);

    res.json(q);
});

module.exports = router;