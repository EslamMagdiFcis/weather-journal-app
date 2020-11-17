// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, lisening);

function lisening(){
    console.log(`running on localhost: ${port}`);
}

// Routing Section
app.get('/all', retrivalData);

function retrivalData(req, res){
    res.send(projectData);
}

app.post('/add', addNewData);

function addNewData(req, res){
    
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        user: req.body.user
    }
    projectData = newEntry;
}
