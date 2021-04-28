// Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter= require('./apiRouter').router;


// Instantiate server
var App = express();

// Body Parser configuration
App.use(bodyParser.urlencoded({extended: true}));
App.use(bodyParser.json());


//Configure Routes

App.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send('{"message": "Hello mon application"}')
});
App.use('/api/',apiRouter);

//Launch Server

App.listen(8081, () => {
    console.log('server en ecoute :)')
})