// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//Require the body parser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//const port = 8080;
const port = 8000;

// start the server
const server = app.listen(port, deFunc);

//depuging function
function deFunc() {
    console.log('Server Started');
    console.log(`Port Number: ${port}`);
}

//define the /all get route and its function
app.get('/all', sDataFunc)

function sDataFunc(req, res) {
    res.send(projectData);
    //projectData = [];
}
//define the /add post route and its function
app.post('/add', addDataFunc);

function addDataFunc(req, res) {
    console.log(req.body);
    newRecord = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData = newRecord;
    // projectData.push(newRecord);
}