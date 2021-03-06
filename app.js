const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//PORT
const port = process.env.PORT || 8080;

//Create express app
const app = express();

//Starting server
const morgan = require('morgan'); 
app.use(morgan('tiny'));

app.listen(port, () => {
    console.log("Server started on PORT : ", port);
})

//Starting Mongo Database
require('./initDB')();

//Middleware
app.use(bodyParser.json());

//Root
app.get('/',(req, res) => {
    res.send("Welcome to my Phonebook app ");
});

//Go to Routes
const ContactsRoute = require('./routes/Contacts');
app.use('/contacts', ContactsRoute);



